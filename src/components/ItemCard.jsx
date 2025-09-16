import React, { useState } from 'react';
import './ItemCard.css';

const ItemCard = ({ item, onView, onEdit, onDelete }) => {
  const [showQRModal, setShowQRModal] = useState(false);

  const generateQRCodeUrl = () => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      JSON.stringify({
        id: item.id,
        name: item.name,
        category: item.category,
        status: item.status,
        serialNumber: item.serialNumber,
        type: 'HappyFindr_Item',
      })
    )}`;
  };

  const handleViewQR = () => {
    setShowQRModal(true);
  };

  const handleDownloadQR = () => {
    const qrCodeUrl = generateQRCodeUrl();
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `${item.name
      .replace(/\s+/g, '-')
      .toLowerCase()}-qrcode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCloseQRModal = () => {
    setShowQRModal(false);
  };

  return (
    <>
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
          <button className="item-card__action" onClick={() => onView(item)}>
            👁️ View Item
          </button>
          <button className="item-card__action" onClick={handleViewQR}>
            QR Code
          </button>

          <button className="item-card__action" onClick={() => onEdit(item)}>
            ✏️ Edit
          </button>
          <button
            className="item-card__action"
            onClick={() => onDelete(item.id)}
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="qr-modal-overlay" onClick={handleCloseQRModal}>
          <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="qr-modal__header">
              <h3>QR Code - {item.name}</h3>
              <button className="qr-modal__close" onClick={handleCloseQRModal}>
                ×
              </button>
            </div>
            <div className="qr-modal__content">
              <div className="qr-modal__image">
                <img src={generateQRCodeUrl()} alt="QR Code" />
              </div>
              <p className="qr-modal__instructions">
                Scan this QR code to view item information
              </p>
              <div className="qr-modal__actions">
                <button
                  className="qr-modal__download-btn"
                  onClick={handleDownloadQR}
                >
                  ⬇️ Download QR Code
                </button>
                <button
                  className="qr-modal__close-btn"
                  onClick={handleCloseQRModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemCard;
