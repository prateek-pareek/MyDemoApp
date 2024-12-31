// src/store/reducers/itemReducer.js
import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILURE,
} from '../actions/itemActions';

const initialState = {
  data: [],           // To store the list of items
  item: null,         // To store a single item's details
  loading: false,     // To track loading state for both list and item
  error: null,        // To store any errors
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    // Actions related to fetching a list of items
    case FETCH_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,  // Reset error state when a new request starts
      };
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,  // Populate data with the fetched list
        error: null,  // Clear any previous error
      };
    case FETCH_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,  // Populate error with the error message
      };

    // Actions related to fetching a single item's details
    case FETCH_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,  // Reset error state for the single item request
      };
    case FETCH_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.payload,  // Store the fetched item details
        error: null,  // Clear any previous error
      };
    case FETCH_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,  // Store error for item detail fetch failure
      };

    default:
      return state;
  }
};

export default itemReducer;
