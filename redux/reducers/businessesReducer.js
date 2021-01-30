import { STORE_BUSINESSES, SELECT_BUSINESS } from '../types';

const initialState = {
   records: {}, // locally stored business
   activeBusiness: null
};

export default function (state = initialState, action) {
   switch (action) {
      case STORE_BUSINESSES: {
         return {
            ...state,
            records: { ...state.records, ...action.payload }
         };
      }

      case SELECT_BUSINESS: {
         const selectedBusinessId = action.payload.id;
         return {
            ...state,
            records: state.records.map((business) => {
               if (business.id === selectedBusinessId) {
                  return { ...business, seen: true };
               } else return business;
            })
         };
      }

      default:
         break;
   }
}
