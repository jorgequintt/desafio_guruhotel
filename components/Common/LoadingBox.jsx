import LoadingIcon from './LoadingIcon';
import PropTypes from 'prop-types';

export default function LoadingBox({ iconSize }) {
   return (
      <div
         style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
            // position: 'absolute'
         }}
      >
         <LoadingIcon size={iconSize} />
      </div>
   );
}

LoadingBox.propTypes = {
   iconSize: PropTypes.number
};
