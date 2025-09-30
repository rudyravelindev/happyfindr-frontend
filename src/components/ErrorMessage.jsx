import './ErrorMessage.css';
import PropTypes from 'prop-types';

export default function ErrorMessage({ message, type = 'error' }) {
  return (
    <div className={`error-message error-message--${type}`} role="alert">
      <span className="error-message__icon">⚠️</span>
      <span className="error-message__text">{message}</span>
    </div>
  );
}
ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['error', 'warning', 'success']),
};
