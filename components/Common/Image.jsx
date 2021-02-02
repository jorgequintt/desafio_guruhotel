import { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingBox from './LoadingBox';

class Image extends Component {
   constructor(props) {
      super(props);

      this.state = {
         imageLoaded: false,
         imageError: false
      };
   }

   componentDidMount() {
      const image = new Image();
      image.onload = () => {
         console.log('loaded');
         this.setState({ imageLoaded: true });
      };
      image.src = this.props.src;
   }

   render() {
      const { width, height, src } = this.props;
      const { imageLoaded, imageError } = this.state;

      return (
         <div className="image-holder" style={{ width, height }}>
            {imageError ? (
               <i className="far fa-eye-slash" style={{ fontSize: '2rem', color: '#999999' }}></i>
            ) : (
               <img
                  src={src}
                  style={{
                     opacity: imageLoaded ? 1 : 0
                  }}
                  onLoad={() => this.setState({ imageLoaded: true })}
                  onError={() => this.setState({ imageLoaded: true, imageError: true })}
                  className="image"
               />
            )}
            {!imageLoaded && <LoadingBox iconSize={2} />}
         </div>
      );
   }
}

Image.propTypes = {
   src: PropTypes.string.isRequired,
   width: PropTypes.number,
   height: PropTypes.number
};

export default Image;
