import React from 'react';
import './ItemCard.css';

const ItemCard = ({ item, onEdit, onDelete }) => {
  const handleDownloadQR = () => {
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      JSON.stringify(item)
    )}`;

    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `${item.name || 'item'}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="item-card">
      <div className="item-card__header">
        <div className="item-card__image">
          {item.image ? (
            <img src={item.image} alt={item.name} />
          ) : (
            <div className="item-card__placeholder">📦</div>
          )}
        </div>
      </div>

      <div className="item-card__body">
        <h3 className="item-card__name">{item.name}</h3>
        <p className="item-card__description">{item.description}</p>
        <div className="item-card__meta">
          <span className="item-card__category">{item.category}</span>
          <span
            className={`item-card__status item-card__status--${item.status}`}
          >
            {item.status}
          </span>
        </div>
      </div>

      <div className="item-card__footer">
        <button onClick={() => onView(item)}>View</button>
        <button className="item-card__action" onClick={() => onEdit(item)}>
          ✏️ <span>Edit</span>
        </button>
        <button className="item-card__action" onClick={() => onDelete(item.id)}>
          🗑 <span>Delete</span>
        </button>
        <button className="item-card__action" onClick={handleDownloadQR}>
          <span>Download QR</span>
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
