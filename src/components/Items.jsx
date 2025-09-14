import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import ItemCard from './ItemCard';
import AddItemModal from './AddItemModal';
import ItemDetailModal from './ItemDetailModal';
import './Items.css';

export default function Items() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState('view'); // 'view' or 'edit'
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchUserItems();
  }, [currentUser]);

  const fetchUserItems = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Get user items from the database
      if (currentUser) {
        const dbService = await import('./DatabaseService');
        const userItems = dbService.default.getUserItems(currentUser.id);
        setItems(userItems);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error('Error fetching user items:', error);
      setError('Failed to load your items. Please try again.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (itemData) => {
    try {
      const dbService = await import('./DatabaseService');
      const newItem = dbService.default.createItem({
        ...itemData,
        userId: currentUser.id,
      });

      setItems((prev) => [...prev, newItem]);
      setShowAddModal(false);
      return newItem;
    } catch (error) {
      console.error('Error adding item:', error);
      throw new Error('Failed to add item. Please try again.');
    }
  };

  const handleUpdateItem = async (itemId, updates) => {
    try {
      const dbService = await import('./DatabaseService');
      const updatedItem = dbService.default.updateItem(itemId, updates);

      setItems((prev) =>
        prev.map((item) => (item.id === itemId ? updatedItem : item))
      );

      setSelectedItem(updatedItem);
      return updatedItem;
    } catch (error) {
      console.error('Error updating item:', error);
      throw new Error('Failed to update item. Please try again.');
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const dbService = await import('./DatabaseService');
      const deleted = dbService.default.deleteItem(itemId);

      if (deleted) {
        setItems((prev) => prev.filter((item) => item.id !== itemId));
        setSelectedItem(null);
      }

      return deleted;
    } catch (error) {
      console.error('Error deleting item:', error);
      throw new Error('Failed to delete item. Please try again.');
    }
  };

  const handleViewItem = (item) => {
    setSelectedItem(item);
    setViewMode('view');
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setViewMode('edit');
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setViewMode('view');
  };
  const handleModeChange = (mode, item = null) => {
    setViewMode(mode);
    if (item) setSelectedItem(item);
  };

  if (loading) {
    return (
      <div className="items">
        <div className="items__header">
          <h2 className="items__title">My Items</h2>
          <p className="items__subtitle">Loading your items...</p>
        </div>
        <div className="items__grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="item-card item-card--loading">
              <div className="item-card__skeleton-image"></div>
              <div className="item-card__content">
                <div className="item-card__skeleton-title"></div>
                <div className="item-card__skeleton-text"></div>
                <div className="item-card__skeleton-tags">
                  <span className="item-card__skeleton-tag"></span>
                  <span className="item-card__skeleton-tag"></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="items">
        <div className="items__header">
          <h2 className="items__title">My Items</h2>
          <p className="items__subtitle">Manage your registered items</p>
        </div>
        <div className="items__error">
          <p>{error}</p>
          <button onClick={fetchUserItems} className="items__retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="items">
      <div className="items__header">
        <div className="items__header-top">
          <div>
            <h2 className="items__title">My Items</h2>
            <p className="items__subtitle">Manage your registered items</p>
          </div>
          <button
            className="items__add-btn"
            onClick={() => setShowAddModal(true)}
          >
            + Add Item
          </button>
        </div>
      </div>
      <div className="items__grid">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onView={handleViewItem}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="items__empty">
          <h3>No items yet</h3>
          <p>Register your first item to get started</p>
          <button
            className="items__add-btn"
            onClick={() => setShowAddModal(true)}
          >
            Register Your First Item
          </button>
        </div>
      )}
      {showAddModal && (
        <AddItemModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddItem}
        />
      )}
      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          mode={viewMode}
          onClose={handleCloseModal}
          onModeChange={handleModeChange}
          onEdit={handleEditItem}
          onUpdate={handleUpdateItem}
          onDelete={handleDeleteItem}
        />
      )}
    </div>
  );
}
