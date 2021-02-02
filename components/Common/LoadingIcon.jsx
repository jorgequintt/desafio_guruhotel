import PropTypes from 'prop-types';

function LoadingIcon({ size }) {
   return (
      <div>
         <i className="fas fa-circle-notch fa-spin loading-icon" style={{ fontSize: `${size}rem` }}></i>
      </div>
   );
}

LoadingIcon.propTypes = {
   size: PropTypes.number
};

export default LoadingIcon;
