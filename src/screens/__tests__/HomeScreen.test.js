import React from 'react';
import { render, waitFor, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';  // Updated import
import rootReducer from '../../store/reducers';  // Adjust the import path
import HomeScreen from '../HomeScreen';

// Test case 1: Home screen should display a list of items
test('Home screen should display a list of items', async () => {
  // Create a mock store with sample data
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      items: {
        data: [{ id: 1, title: 'Item 1' }, { id: 2, title: 'Item 2' }],
        loading: false,
        error: null,
      },
    },
  });

  render(
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );

  // Wait for the asynchronous content to render
  await waitFor(() => {
    // Dynamically check if all items from the mock data are rendered
    const items = [{ id: 1, title: 'Item 1' }, { id: 2, title: 'Item 2' }];
    
    items.forEach(item => {
      expect(screen.getByText(item.title)).toBeTruthy();  // Dynamically check for each title
    });
  });
});

// Test case 2: Home screen should display a loading indicator while fetching items
test('Home screen should display a loading indicator while fetching items', () => {
  // Simulate loading state
  const storeWithLoadingState = configureStore({
    reducer: rootReducer,
    preloadedState: {
      items: {
        data: [],
        loading: true, // Simulating loading state
        error: null,
      },
    },
  });

  render(
    <Provider store={storeWithLoadingState}>
      <HomeScreen />
    </Provider>
  );

  // Assuming your component displays 'Loading...' when loading
  expect(screen.getByText('Loading...')).toBeTruthy();
});

// Test case 3: Home screen should handle empty state when no items are available
test('Home screen should handle empty state when no items are available', async () => {
  const storeWithEmptyState = configureStore({
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
    <Provider store={storeWithEmptyState}>
      <HomeScreen />
    </Provider>
  );

  // Verifying that no items are displayed when there are no items in the state
  expect(screen.queryByText('Item 1')).toBeNull();
  expect(screen.queryByText('Item 2')).toBeNull();

  // Optionally, check if a "No items available" message is displayed
  expect(screen.getByText('No items available')).toBeTruthy(); // Adjust this as per your implementation
});
