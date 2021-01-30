import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import '../styles/global.scss';

function App({ Component, pageProps }) {
   return (
      <Layout>
         <Component {...pageProps} />
      </Layout>
   );
}

App.propTypes = {
   Component: PropTypes.elementType.isRequired,
   pageProps: PropTypes.object
};

export default App;
