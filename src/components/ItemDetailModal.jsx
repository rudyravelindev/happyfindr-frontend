import { useState } from 'react';
import PropTypes from 'prop-types';
import './ItemDetailModal.css';

export default function ItemDetailModal({
  item,
  mode,
  onClose,
  onEdit,
  onUpdate,
  onDelete,
  onModeChange,
}) {
  const [formData, setFormData] = useState({
    name: item.name,
    description: item.description,
    category: item.category,
    status: item.status,
    image: item.image,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const categories = [
    'Electronics',
    'Clothing',
    'Accessories',
    'Documents',
    'Jewelry',
    'Sports Equipment',
    'Other',
  ];

  const statusOptions = [
    { value: 'registered', label: 'Registered' },
    { value: 'lost', label: 'Lost' },
    { value: 'found', label: 'Found' },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await onUpdate(item.id, formData);
      // Switch back to view mode after successful update
      if (mode === 'edit') {
        onEdit();
      }
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete(item.id);
      setShowDeleteConfirm(false);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal modal--large">
        <div className="modal__header">
          <h2>{mode === 'view' ? 'Item Details' : 'Edit Item'}</h2>
          <button className="modal__close" onClick={onClose}>
            ×
          </button>
        </div>

        {mode === 'view' ? (
          <div className="item-detail">
            {item.image && (
              <div className="item-detail__image">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}

            <div className="item-detail__content">
              <div className="item-detail__field">
                <label>Name</label>
                <p>{item.name}</p>
              </div>

              <div className="item-detail__field">
                <label>Description</label>
                <p>{item.description}</p>
              </div>

              <div className="item-detail__field">
                <label>Category</label>
                <p>{item.category}</p>
              </div>

              <div className="item-detail__field">
                <label>Status</label>
                <span className={`status-badge status-badge--${item.status}`}>
                  {item.status}
                </span>
              </div>

              {item.createdAt && (
                <div className="item-detail__field">
                  <label>Registered On</label>
                  <p>{formatDate(item.createdAt)}</p>
                </div>
              )}

              {item.updatedAt && item.updatedAt !== item.createdAt && (
                <div className="item-detail__field">
                  <label>Last Updated</label>
                  <p>{formatDate(item.updatedAt)}</p>
                </div>
              )}
            </div>

            <div className="item-detail__actions">
              <button
                className="item-card__action btn btn--primary"
                onClick={() => onEdit(item)}
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="btn btn--danger"
              >
                Delete Item
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal__form">
            {errors.submit && (
              <div className="modal__error">{errors.submit}</div>
            )}

            <div className="form-group">
              <label htmlFor="name">Item Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Enter item name"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={errors.description ? 'error' : ''}
                placeholder="Describe your item in detail"
                rows="3"
              />
              {errors.description && (
                <span className="error-text">{errors.description}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={errors.category ? 'error' : ''}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="error-text">{errors.category}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="image">Item Image (Optional)</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>

            <div className="modal__actions">
              <button
                type="button"
                onClick={() => onModeChange()}
                className="btn btn--secondary"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn--primary"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}

        {showDeleteConfirm && (
          <div className="delete-confirm-overlay">
            <div className="delete-confirm">
              <h3>Delete Item</h3>
              <p>
                Are you sure you want to delete &quot;{item.name}&quot;? This
                action cannot be undone.
              </p>
              <div className="delete-confirm__actions">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="btn btn--secondary"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="btn btn--danger"
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

ItemDetailModal.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    category: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    image: PropTypes.string,
    serialNumber: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
  mode: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onModeChange: PropTypes.func.isRequired,
};
