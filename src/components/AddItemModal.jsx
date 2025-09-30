import { useState } from 'react';
import './AddItemModal.css';
import PropTypes from 'prop-types';

export default function AddItemModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    status: 'registered',
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
    if (!formData.name.trim()) newErrors.name = 'Item name is required';
    if (!formData.description.trim())
      newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSave({
        ...formData,
        image: formData.image, // resized Base64
      });
      onClose();
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxWidth = 200;
        const maxHeight = 200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.5);
        setFormData((prev) => ({
          ...prev,
          image: resizedDataUrl,
          imagePreview: resizedDataUrl,
          imageName: file.name,
        }));
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-item-title"
    >
      <section className="modal">
        <header className="modal__header">
          <h2 id="add-item-title">Register New Item</h2>
          <button
            type="button"
            className="modal__close"
            aria-label="Close modal"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <form onSubmit={handleSubmit} className="modal__form" noValidate>
          {errors.submit && <div className="modal__error">{errors.submit}</div>}

          <fieldset className="modal__fieldset">
            <legend className="modal__legend">Item Details</legend>

            <div className="modal__field">
              <label htmlFor="name" className="modal__label">
                Item Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`modal__input ${
                  errors.name ? 'modal__input--error' : ''
                }`}
                placeholder="Enter item name"
                required
              />
              {errors.name && (
                <span className="modal__error-text">{errors.name}</span>
              )}
            </div>

            <div className="modal__field">
              <label htmlFor="description" className="modal__label">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`modal__textarea ${
                  errors.description ? 'modal__textarea--error' : ''
                }`}
                placeholder="Describe your item in detail"
                rows="3"
                required
              />
              {errors.description && (
                <span className="modal__error-text">{errors.description}</span>
              )}
            </div>

            <div className="modal__field">
              <label htmlFor="category" className="modal__label">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`modal__select ${
                  errors.category ? 'modal__select--error' : ''
                }`}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="modal__error-text">{errors.category}</span>
              )}
            </div>

            <div className="modal__field">
              <label htmlFor="status" className="modal__label">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="modal__select"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal__field">
              <label htmlFor="image" className="modal__label">
                Item Image (Optional)
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                className="modal__file"
              />
            </div>
          </fieldset>

          <div className="modal__actions">
            <button
              type="button"
              onClick={onClose}
              className="modal__btn modal__btn--secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="modal__btn modal__btn--primary"
            >
              {loading ? 'Adding...' : 'Add Item'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
AddItemModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
