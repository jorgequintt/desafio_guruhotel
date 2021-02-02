import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deselectBusiness } from '../redux/actions/businessesActions';
import LoadingBox from './Common/LoadingBox';
import Button from './Common/Button';
import Image from './Common/Image';
import militarTimeToStandard from '../util/militarTimeToStandard';
import BusinessReview from './BusinessReview';

export class BusinessDetails extends Component {
   constructor(props) {
      super(props);

      this.handleClickDeselectBusiness = this.handleClickDeselectBusiness.bind(this);
   }

   handleClickDeselectBusiness(e) {
      this.props.deselectBusiness();
   }

   render() {
      const { activeBusiness, fetchingExtendedInfo } = this.props;

      const daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

      let businessState = { state: 'Unknown', color: 'gray' };
      if (activeBusiness) {
         if (activeBusiness.extended.is_closed) businessState = { state: 'Permanently closed', color: 'red' };
         else if (activeBusiness.extended.hours?.[0]?.is_open_now)
            businessState = { state: 'Open', color: 'green' };
         else businessState = { state: 'Closed', color: 'gray' };
      }

      return (
         <div className="business-details">
            <div className="business-details-go-back">
               <Button
                  text="Go back to results"
                  fontAwesomeClasses="fas fa-chevron-left"
                  onClick={this.handleClickDeselectBusiness}
                  fullWidth={true}
               />
            </div>
            {fetchingExtendedInfo ? (
               <LoadingBox iconSize={4} />
            ) : activeBusiness ? (
               <div className="details-wrapper">
                  <h1 className="business-title">{activeBusiness.base.name}</h1>
                  <div className="image-section">
                     <Image className="business-details-image" src={activeBusiness.base.photos[0]} />
                  </div>
                  <div className="details-section">
                     <div>
                        <i className="business-info-icon fas fa-store"></i>
                        <span style={{ color: businessState.color }}>{businessState.state}</span>
                     </div>
                     <div>
                        <i className="business-info-icon fas fa-globe"></i>
                        <strong>Country</strong>: {activeBusiness.base.location.country}
                     </div>
                     <div>
                        <i className="business-info-icon fas fa-map-marker-alt"></i>
                        <strong>Address</strong>: {activeBusiness.base.location.formatted_address}
                     </div>
                     <div>
                        <i className="business-info-icon fas fa-phone"></i>
                        <strong>Phone</strong>: {activeBusiness.base.display_phone}
                     </div>
                     <div>
                        <i className="business-info-icon fas fa-star"></i>
                        <strong>Rating</strong>:{' '}
                        {`${activeBusiness.base.rating}/5 (${activeBusiness.base.review_count} ${
                           activeBusiness.base.review_count === 1 ? 'review' : 'reviews'
                        })`}
                     </div>
                     <div>
                        <i className="business-info-icon far fa-money-bill-alt"></i>
                        <strong>Prices</strong>:{' '}
                        <span style={{ color: 'green', fontWeight: 'bold' }}>
                           {activeBusiness.extended.price}
                        </span>
                     </div>
                     <br />
                     {activeBusiness.extended.hours?.[0]?.open && (
                        <div>
                           <i className="business-info-icon far fa-clock"></i>
                           <strong>Hours</strong>:{' '}
                           <ul>
                              {activeBusiness.extended.hours[0].open.map((hour, index) => {
                                 return (
                                    <li key={index}>
                                       <strong>{daysOfTheWeek[index]}</strong>:{' '}
                                       {militarTimeToStandard(hour.start)} - {militarTimeToStandard(hour.end)}
                                    </li>
                                 );
                              })}
                           </ul>
                        </div>
                     )}
                  </div>
                  {activeBusiness.extended.reviews?.length > 0 && (
                     <div className="reviews-section">
                        <h3>Reviews made by customers</h3>
                        {activeBusiness.extended.reviews.map((review) => {
                           return (
                              <BusinessReview
                                 key={review.user.name}
                                 text={review.text}
                                 rating={review.rating}
                                 userName={review.user.name}
                              />
                           );
                        })}
                     </div>
                  )}
               </div>
            ) : (
               ''
            )}
         </div>
      );
   }
}

BusinessDetails.propTypes = {
   activeBusiness: PropTypes.object,
   fetchingExtendedInfo: PropTypes.bool,
   // actions
   deselectBusiness: PropTypes.func
};

const mapStateToProps = (state) => ({
   activeBusiness: state.businesses.activeBusiness,
   fetchingExtendedInfo: state.businesses.fetchingExtendedInfo
});

const mapActionsToProps = {
   deselectBusiness
};

export default connect(mapStateToProps, mapActionsToProps)(BusinessDetails);
