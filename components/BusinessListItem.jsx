import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectBusiness } from '../redux/actions/businessesActions';

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
               <li>{id}</li>
               <li>{name}</li>
               <li>{photos[0]}</li>
               <li>{location.city}</li>
               <li>{reviewCount}</li>
               <li>{rating}</li>
               <li>{phone}</li>
               <li>
                  <div onClick={this.handleClick}>See business</div>
               </li>
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
