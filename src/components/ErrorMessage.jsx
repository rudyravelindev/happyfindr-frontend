import './ErrorMessage.css';

export default function ErrorMessage({ message, type = 'error' }) {
  return (
    <div className={`error-message error-message--${type}`} role="alert">
      <span className="error-message__icon">⚠️</span>
      <span className="error-message__text">{message}</span>
    </div>
  );
}
