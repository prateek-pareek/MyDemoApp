// src/store/actions/itemActions.js
import axios from 'axios';

// Action Types for fetching a list of items
export const FETCH_ITEMS_REQUEST = 'FETCH_ITEMS_REQUEST';
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_FAILURE = 'FETCH_ITEMS_FAILURE';

// Action Types for fetching a single item detail
export const FETCH_ITEM_REQUEST = 'FETCH_ITEM_REQUEST';
export const FETCH_ITEM_SUCCESS = 'FETCH_ITEM_SUCCESS';
export const FETCH_ITEM_FAILURE = 'FETCH_ITEM_FAILURE';

// Action creators for fetching a list of items
export const fetchItemsRequest = () => ({
  type: FETCH_ITEMS_REQUEST,
});

export const fetchItemsSuccess = (items) => ({
  type: FETCH_ITEMS_SUCCESS,
  payload: items,
});

export const fetchItemsFailure = (error) => ({
  type: FETCH_ITEMS_FAILURE,
  payload: error,
});

// Thunk Action to fetch list of items
export const fetchItems = () => async (dispatch) => {
  dispatch(fetchItemsRequest()); // Dispatch loading state

  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    dispatch(fetchItemsSuccess(response.data)); // Dispatch success with data
  } catch (error) {
    dispatch(fetchItemsFailure(error.message)); // Dispatch failure with error message
  }
};

// Action creators for fetching a single item detail
export const fetchItemRequest = () => ({
  type: FETCH_ITEM_REQUEST,
});

export const fetchItemSuccess = (item) => ({
  type: FETCH_ITEM_SUCCESS,
  payload: item,
});

export const fetchItemFailure = (error) => ({
  type: FETCH_ITEM_FAILURE,
  payload: error,
});

// Thunk Action to fetch a single item detail
export const fetchItemDetail = (itemId) => async (dispatch) => {
  dispatch(fetchItemRequest()); // Dispatch loading state for item detail

  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${itemId}`);
    dispatch(fetchItemSuccess(response.data)); // Dispatch success with data
  } catch (error) {
    dispatch(fetchItemFailure(error.message)); // Dispatch failure with error message
  }
};
