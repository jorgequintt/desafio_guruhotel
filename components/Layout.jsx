import PropTypes from 'prop-types';

function Layout({ children }) {
   return (
      <div>
         <h1>Welcome</h1>
         {children}
      </div>
   );
}

Layout.propTypes = {
   children: PropTypes.node
};

export default Layout;
