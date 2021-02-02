import React from 'react';
import PropTypes from 'prop-types';

function BusinessReview({ text, rating, userName }) {
   return (
      <div>
         <div>
            From <strong>{userName}</strong>
         </div>
         <div>
            <i className="business-info-icon fas fa-star"></i> {rating} out of 5 stars
         </div>
         <div style={{ padding: '0.5rem 0 2rem 0', fontStyle: 'italic' }}>{text}</div>
      </div>
   );
}

BusinessReview.propTypes = {
   text: PropTypes.string,
   rating: PropTypes.number,
   userName: PropTypes.string
};

export default BusinessReview;
