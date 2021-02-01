import Layout from '../components/UI/Layout';
import PropTypes from 'prop-types';
import '../styles/global.scss';
import { Provider } from 'react-redux';
import store from '../redux/store';

function App({ Component, pageProps }) {
   return (
      <Provider store={store}>
         <Layout>
            <Component {...pageProps} />
         </Layout>
      </Provider>
   );
}

App.propTypes = {
   Component: PropTypes.elementType.isRequired,
   pageProps: PropTypes.object
};

export default App;
