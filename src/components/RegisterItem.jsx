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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Item registered:', formData);
    // TODO: Connect to API
    alert('Item registered successfully!');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="register-item">
      <div className="register-item__header">
        <h2 className="register-item__title">Register New Item</h2>
        <p className="register-item__subtitle">
          Add your belongings to track them with QR codes
        </p>
      </div>

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

        <button type="submit" className="register-item__button">
          Generate QR Code & Register Item
        </button>
      </form>
    </div>
  );
}
