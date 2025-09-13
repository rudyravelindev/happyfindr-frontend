import { AiOutlineQrcode, AiOutlineEye, AiOutlineEdit } from 'react-icons/ai';
import './ItemCard.css';

export default function ItemCard({ item, onView, onEdit }) {
  const handleViewClick = (e) => {
    e.stopPropagation();
    onView(item);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(item);
  };

  const handleCardClick = () => {
    onView(item);
  };

  return (
    <div className="item-card" onClick={handleCardClick}>
      <div className="item-card__header">
        <div className="item-card__image">
          {item.image ? (
            <img src={item.image} alt={item.name} />
          ) : (
            <div className="item-card__placeholder">
              <AiOutlineQrcode />
            </div>
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
        <button className="item-card__action" onClick={handleViewClick}>
          <AiOutlineEye />
          <span>View</span>
        </button>
        <button className="item-card__action" onClick={handleEditClick}>
          <AiOutlineEdit />
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
}
