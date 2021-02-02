import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectBusiness } from '../redux/actions/businessesActions';
import Image from './Common/Image';
import Button from './Common/Button';

class BusinessListItem extends Component {
   constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
   }

   handleClick(e) {
      this.props.selectBusiness(this.props.business.id);
   }

   render() {
      const {
         photos,
         name,
         location,
         review_count: reviewCount,
         rating,
         display_phone: phone,
         seen
      } = this.props.business;
      return (
         <div className="business-list-item">
            <div className="columns-wrapper">
               <div className="column-1">
                  <Image src={photos[0]} className="business-list-image" onClick={this.handleClick} />
               </div>
               <div className="column-2">
                  <h3 className={`business-list-item-title ${seen ? 'seen' : ''}`} onClick={this.handleClick}>
                     {seen && <i className="fas fa-eye"></i>} {name}
                  </h3>
                  <div style={{ flex: 1, padding: '1rem 0' }}>
                     <div>
                        <i className="business-info-icon fas fa-globe"></i>
                        {location.country}
                     </div>
                     <div>
                        <i className="business-info-icon fas fa-map-marker-alt"></i>
                        {location.formatted_address}
                     </div>
                     <div>
                        <i className="business-info-icon fas fa-star"></i>
                        {`${rating} (${reviewCount} ${reviewCount === 1 ? 'review' : 'reviews'})`}
                     </div>
                     <div>
                        <i className="business-info-icon fas fa-phone"></i>
                        {phone}
                     </div>
                  </div>
                  <Button
                     text="Check it"
                     fontAwesomeClasses="fas fa-chevron-right"
                     onClick={this.handleClick}
                     rightIcon={true}
                  />
               </div>
            </div>
         </div>
      );
   }
}

BusinessListItem.propTypes = {
   business: PropTypes.object.isRequired,
   // actions
   selectBusiness: PropTypes.func
};

const mapActionsToProps = {
   selectBusiness
};

export default connect(null, mapActionsToProps)(BusinessListItem);
