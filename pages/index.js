import SearchApp from '../components/SearchApp';
import { Provider } from 'react-redux';
import store from '../redux/store';

export default function Home() {
   return (
      <Provider store={store}>
         <SearchApp />
      </Provider>
   );
}
