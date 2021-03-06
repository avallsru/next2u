import { 
  ALL_STORES,
  STORES_TO_PRINT, 
  STORES_SELECTED, 
  STORE_TO_DETAIL, 
  PRODUCTS_TO_PRINT, 
  RESET_PRODUCTS_TO_PRINT,
  UPDATE_PRODUCTS_TO_PRINT
} from '../types';

const defaultList = {
  allStores: [],
  storesNearAddress: [],
  storesToPrint: [],
  storeToDetail: {},
  productsToPrint: [],
  ref: null
}

function storesReducer(state = defaultList, action) {
  switch(action.type) {
    case ALL_STORES: {
      return{ ...state, allStores: [...state.allStores, action.payload]}
    }
    case STORES_SELECTED: {
      return { ...state, storesNearAddress: action.payload}
    }
    case STORES_TO_PRINT: {
      return {...state, storesToPrint: action.payload}
    }
    case STORE_TO_DETAIL: {
      return {...state, storeToDetail: action.payload}
    }
    case PRODUCTS_TO_PRINT: {
      return{...state, productsToPrint:state.productsToPrint.concat(action.payload)}
    }
    case RESET_PRODUCTS_TO_PRINT: {
      return{...state, productsToPrint:[]}
    }
    case UPDATE_PRODUCTS_TO_PRINT: {
      const {idToFind, unitsSelected} = action.payload;
      const updatedList = state.productsToPrint.map((group) => {
        const groupCategory = Object.keys(group)[0]; 

        const updatedValues = group[groupCategory].products.map((product) => {
          if(product.ID===idToFind) {
            return {...product, units_selected: unitsSelected};
          }
          return product;
        });
        const newValues = {...group[groupCategory], products: updatedValues};
        return {[groupCategory]: newValues};
      })

       
      return{...state, productsToPrint: updatedList};
    }
    default: {
      return state;
    }
  }
}

export default storesReducer;