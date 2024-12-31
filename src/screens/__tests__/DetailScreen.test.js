// src/screens/__tests__/DetailScreen.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import DetailScreen from '../DetailScreen';  // Adjust the path
import { useRoute } from '@react-navigation/native';  // Import useRoute to mock it
import rootReducer from '../../store/reducers';  // Adjust the path

// Mock useRoute to return a specific route
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: jest.fn(),
}));

describe('<DetailScreen />', () => {
  beforeEach(() => {
    // Reset mocks before each test
    useRoute.mockReset();
  });

  test('should render correctly', () => {
    // Mock the route params
    const route = { params: { itemId: 1 } };
    useRoute.mockReturnValue(route);

    // Mock the Redux store with some initial state
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        items: {
          data: [{ id: 1, name: 'Item 1', description: 'Item 1 details' }],
          loading: false,
          error: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <DetailScreen />
      </Provider>
    );

    // Test assertions based on the initial state
    expect(screen.getByText('Item 1')).toBeTruthy();
    expect(screen.getByText('Item 1 details')).toBeTruthy();
  });

  test('should display loading indicator while fetching data', () => {
    // Mock the route params
    const route = { params: { itemId: 1 } };
    useRoute.mockReturnValue(route);

    // Mock the Redux store with loading state
    const storeWithLoadingState = configureStore({
      reducer: rootReducer,
      preloadedState: {
        items: {
          data: [],
          loading: true,
          error: null,
        },
      },
    });

    render(
      <Provider store={storeWithLoadingState}>
        <DetailScreen />
      </Provider>
    );

    // Test that the loading indicator is displayed
    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  test('should display error message when API call fails', async () => {
    // Mock the route params
    const route = { params: { itemId: 1 } };
    useRoute.mockReturnValue(route);

    // Mock the Redux store with error state
    const storeWithErrorState = configureStore({
      reducer: rootReducer,
      preloadedState: {
        items: {
          data: [],
          loading: false,
          error: 'Failed to fetch item',
        },
      },
    });

    render(
      <Provider store={storeWithErrorState}>
        <DetailScreen />
      </Provider>
    );

    // Test that the error message is displayed
    await waitFor(() => expect(screen.getByText('Failed to fetch item')).toBeTruthy());
  });

  test('should display "Item not found" when no item is found', async () => {
    // Mock the route params
    const route = { params: { itemId: 999 } }; // An item ID that doesn't exist
    useRoute.mockReturnValue(route);

    // Mock the Redux store with no item data
    const storeWithNoItemState = configureStore({
      reducer: rootReducer,
      preloadedState: {
        items: {
          data: [],
          loading: false,
          error: null,
        },
      },
    });

    render(
      <Provider store={storeWithNoItemState}>
        <DetailScreen />
      </Provider>
    );

    // Test that "Item not found" is displayed
    await waitFor(() => expect(screen.getByText('Item not found')).toBeTruthy());
  });
});
