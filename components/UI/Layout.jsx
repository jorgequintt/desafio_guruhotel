import PropTypes from 'prop-types';
import Header from './Header';
import Overlay from './Overlay';

function Layout({ children }) {
   return (
      <div className="container">
         <Header />
         {children}
         <Overlay />
      </div>
   );
}

Layout.propTypes = {
   children: PropTypes.node
};

export default Layout;
