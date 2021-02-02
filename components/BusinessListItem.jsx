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
         id,
         photos,
         name,
         location,
         review_count: reviewCount,
         rating,
         display_phone: phone,
         seen
      } = this.props.business;
      return (
         <div>
            <ul>
               {seen && <li>SEEN</li>}
               <Image src={photos[0]} height={100} width={100} />
               <li>{id}</li>
               <li>{name}</li>
               <li>{location.city}</li>
               <li>{reviewCount}</li>
               <li>{rating}</li>
               <li>{phone}</li>
               <Button
                  text="See business"
                  fontAwesomeClasses="fas fa-chevron-right"
                  onClick={this.handleClick}
                  rightIcon={true}
               />
            </ul>
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
