// import { useState } from 'react';
// import './RegisterItem.css';

// export default function RegisterItem() {
//   const [formData, setFormData] = useState({
//     name: '',
//     category: '',
//     description: '',
//     value: '',
//     serialNumber: '',
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Item registered:', formData);
//     // TODO: Connect to API
//     alert('Item registered successfully!');
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="register-item">
//       <div className="register-item__header">
//         <h2 className="register-item__title">Register New Item</h2>
//         <p className="register-item__subtitle">
//           Add your belongings to track them with QR codes
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="register-item__form">
//         <div className="register-item__form-group">
//           <label htmlFor="name" className="register-item__label">
//             Item Name *
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="register-item__input"
//             placeholder="e.g., MacBook Pro, Wallet, Backpack"
//             required
//           />
//         </div>

//         <div className="register-item__form-group">
//           <label htmlFor="category" className="register-item__label">
//             Category *
//           </label>
//           <select
//             id="category"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="register-item__select"
//             required
//           >
//             <option value="">Select a category</option>
//             <option value="electronics">Electronics</option>
//             <option value="clothing">Clothing</option>
//             <option value="accessories">Accessories</option>
//             <option value="documents">Documents</option>
//             <option value="jewelry">Jewelry</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         <div className="register-item__form-group">
//           <label htmlFor="description" className="register-item__label">
//             Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="register-item__textarea"
//             placeholder="Describe your item in detail (color, size, distinctive features...)"
//             rows="3"
//           />
//         </div>

//         <div className="register-item__form-group">
//           <label htmlFor="value" className="register-item__label">
//             Estimated Value ($)
//           </label>
//           <input
//             type="number"
//             id="value"
//             name="value"
//             value={formData.value}
//             onChange={handleChange}
//             className="register-item__input"
//             placeholder="0.00"
//             min="0"
//             step="0.01"
//           />
//         </div>

//         <div className="register-item__form-group">
//           <label htmlFor="serialNumber" className="register-item__label">
//             Serial Number (if applicable)
//           </label>
//           <input
//             type="text"
//             id="serialNumber"
//             name="serialNumber"
//             value={formData.serialNumber}
//             onChange={handleChange}
//             className="register-item__input"
//             placeholder="Enter serial number"
//           />
//         </div>

//         <button type="submit" className="register-item__button">
//           Generate QR Code & Register Item
//         </button>
//       </form>
//     </div>
//   );
// }

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

  const generateQRCode = async (itemData) => {
    setIsGenerating(true);
    try {
      // Create a unique identifier for this item
      const itemId = Math.random().toString(36).substr(2, 9);
      const qrData = JSON.stringify({
        id: itemId,
        name: itemData.name,
        category: itemData.category,
        serial: itemData.serialNumber,
        timestamp: new Date().toISOString(),
      });

      // Encode the data for URL
      const encodedData = encodeURIComponent(qrData);

      // Using QR Server API (free and no authentication required)
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`;

      setQrCodeUrl(qrCodeUrl);
      return itemId;
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw new Error('Failed to generate QR code');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Generate QR code first
      const itemId = await generateQRCode(formData);

      // TODO: Save item data to your database along with the itemId
      console.log('Item registered:', { ...formData, id: itemId, qrCodeUrl });

      setIsRegistered(true);
      alert('Item registered successfully! QR code generated.');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
  };

  const downloadQRCode = () => {
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
          <div className="register-item__qr-section">
            <h3>QR Code Generated Successfully!</h3>
            <div className="register-item__qr-code">
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="register-item__qr-image"
              />
            </div>
            <p className="register-item__qr-instructions">
              This QR code contains your item information. You can print it and
              attach it to your item.
            </p>
            <div className="register-item__qr-actions">
              <button
                onClick={downloadQRCode}
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
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="register-item__form">
          <div className="register-item__form-group">
            <label htmlFor="name" className="register-item__label">
              Item Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="register-item__input"
              placeholder="e.g., MacBook Pro, Wallet, Backpack"
              required
            />
          </div>

          <div className="register-item__form-group">
            <label htmlFor="category" className="register-item__label">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="register-item__select"
              required
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="accessories">Accessories</option>
              <option value="documents">Documents</option>
              <option value="jewelry">Jewelry</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="register-item__form-group">
            <label htmlFor="description" className="register-item__label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="register-item__textarea"
              placeholder="Describe your item in detail (color, size, distinctive features...)"
              rows="3"
            />
          </div>

          <div className="register-item__form-group">
            <label htmlFor="value" className="register-item__label">
              Estimated Value ($)
            </label>
            <input
              type="number"
              id="value"
              name="value"
              value={formData.value}
              onChange={handleChange}
              className="register-item__input"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>

          <div className="register-item__form-group">
            <label htmlFor="serialNumber" className="register-item__label">
              Serial Number (if applicable)
            </label>
            <input
              type="text"
              id="serialNumber"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              className="register-item__input"
              placeholder="Enter serial number"
            />
          </div>

          <button
            type="submit"
            className="register-item__button"
            disabled={isGenerating}
          >
            {isGenerating
              ? 'Generating QR Code...'
              : 'Generate QR Code & Register Item'}
          </button>
        </form>
      )}
    </div>
  );
}
