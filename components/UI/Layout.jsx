import PropTypes from 'prop-types';
import Header from './Header';
import Overlay from './Overlay';

function Layout({ children }) {
   return (
      <div>
         <Header />
         <h1>Welcome</h1>
         {children}
         <Overlay />
      </div>
   );
}

Layout.propTypes = {
   children: PropTypes.node
};

export default Layout;
