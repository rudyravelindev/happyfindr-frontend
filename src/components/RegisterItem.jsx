import { useState } from 'react';
import './RegisterItem.css';

export default function RegisterItem() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    value: '',
    serialNumber: '',
  });
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showModal, setShowModal] = useState(false); // new state

  const generateQRCode = async (itemData) => {
    setIsGenerating(true);
    try {
      const itemId = Math.random().toString(36).substr(2, 9);
      const qrData = JSON.stringify({
        id: itemId,
        name: itemData.name,
        category: itemData.category,
        serial: itemData.serialNumber,
        timestamp: new Date().toISOString(),
      });
      const encodedData = encodeURIComponent(qrData);
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`;
      setQrCodeUrl(qrCodeUrl);
      return itemId;
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const itemId = await generateQRCode(formData);
      setIsRegistered(true);
      alert('Item registered successfully! QR code generated.');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData({
      name: '',
      category: '',
      description: '',
      value: '',
      serialNumber: '',
    });
    setQrCodeUrl('');
    setIsRegistered(false);
    setShowModal(false);
  };

  const handleViewItem = () => {
    setShowModal(true); // open the modal instead of window.open
  };

  const handleDownloadQR = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qrcode-${formData.name
      .replace(/\s+/g, '-')
      .toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="register-item">
      <div className="register-item__header">
        <h2 className="register-item__title">Register New Item</h2>
        <p className="register-item__subtitle">
          Add your belongings to track them with QR codes
        </p>
      </div>

      {isRegistered ? (
        <div className="register-item__success">
          <h3>QR Code Generated Successfully!</h3>
          <p>You can view your item or download the QR code below.</p>
          <div className="register-item__qr-actions">
            <button
              onClick={handleViewItem}
              className="register-item__view-btn"
            >
              View Item
            </button>
            <button
              onClick={handleDownloadQR}
              className="register-item__download-btn"
            >
              Download QR Code
            </button>
            <button
              onClick={handleReset}
              className="register-item__new-item-btn"
            >
              Register Another Item
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="register-item__form">
          {/* form fields here */}
          <div className="register-item__form-group">
            <label htmlFor="name">Item Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          {/* ...other fields */}
          <button type="submit" disabled={isGenerating}>
            {isGenerating ? 'Generating QR...' : 'Register Item'}
          </button>
        </form>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{formData.name}</h3>
            <p>
              <strong>Category:</strong> {formData.category}
            </p>
            <p>
              <strong>Description:</strong> {formData.description}
            </p>
            <p>
              <strong>Value:</strong> ${formData.value}
            </p>
            <p>
              <strong>Serial Number:</strong> {formData.serialNumber}
            </p>
            <img src={qrCodeUrl} alt="QR Code" />
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
