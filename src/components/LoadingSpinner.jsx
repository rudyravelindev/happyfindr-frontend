import './LoadingSpinner.css';

export default function LoadingSpinner({ size = 'medium' }) {
  return (
    <div className={`loading-spinner loading-spinner--${size}`}>
      <div className="loading-spinner__ring"></div>
    </div>
  );
}
