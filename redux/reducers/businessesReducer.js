import {
   STORE_BUSINESSES,
   DISPLAY_BUSINESS,
   FETCHING_BUSINESS,
   BUSINESS_FETCHING_OFF,
   EXTEND_BUSINESS_INFO
} from '../types';

const initialState = {
   records: {}, // locally stored business
   activeBusiness: null,
   fetchingExtendedInfo: false
};

export default function (state = initialState, action) {
   switch (action) {
      case FETCHING_BUSINESS: {
         return {
            ...state,
            activeBusiness: null,
            fetchingExtendedInfo: true
         };
      }
      case BUSINESS_FETCHING_OFF: {
         return {
            ...state,
            fetchingExtendedInfo: false
         };
      }

      case STORE_BUSINESSES: {
         // We store businesses as a key value pair for search for businesses by id easily
         const firstTimeBusinessesObj = {};
         action.payload.forEach((business) => {
            firstTimeBusinessesObj[business.id] = { base: { ...business }, extended: null, seen: false };
         });

         return {
            ...state,
            records: { ...state.records, ...firstTimeBusinessesObj }
         };
      }

      // Store additional information fetched on business selection
      case EXTEND_BUSINESS_INFO: {
         const { businessId, extendedInfo } = action.payload;
         return {
            ...state,
            records: {
               ...state.records,
               [businessId]: {
                  base: { ...state.records[businessId].base },
                  extended: { ...extendedInfo }
               }
            }
         };
      }

      case DISPLAY_BUSINESS: {
         const selectedBusinessId = action.payload.base.id;
         return {
            ...state,
            fetchingExtendedInfo: false,
            records: {
               ...state.records,
               [selectedBusinessId]: {
                  ...state.records[selectedBusinessId],
                  seen: true
               }
            },
            activeBusiness: action.payload
         };
      }

      default:
         break;
   }
}
