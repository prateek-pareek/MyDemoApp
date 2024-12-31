import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import LoginScreen from '../LoginScreen';
import rootReducer from '../../store/reducers';  // Adjust the path to your reducers
import { Alert } from 'react-native';

// Mocking Alert globally
jest.mock('react-native', () => {
  const actualReactNative = jest.requireActual('react-native');
  return {
    ...actualReactNative,
    Alert: {
      alert: jest.fn(), // Mock the alert function
    },
  };
});

const mockNavigate = jest.fn();  // Mock the navigate function

// Create a mock Redux store using configureStore
const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    items: {
      data: [],
      loading: false,
      error: null,
    },
  },
});

describe('<LoginScreen />', () => {
  // Test if Login screen renders correctly
  test('renders Login screen correctly', () => {
    render(
      <Provider store={store}>
        <LoginScreen navigation={{ navigate: mockNavigate }} />
      </Provider>
    );

    // Check if the "Login" button and input fields are present
    expect(screen.getByPlaceholderText('Username')).toBeTruthy();
    expect(screen.getByPlaceholderText('Password')).toBeTruthy();
    expect(screen.getByText('Login')).toBeTruthy();
  });

  // Test if navigation happens after successful login
  test('navigates to Home when credentials are entered correctly', async () => {
    render(
      <Provider store={store}>
        <LoginScreen navigation={{ navigate: mockNavigate }} />
      </Provider>
    );

    // Simulate entering text in the fields
    fireEvent.changeText(screen.getByPlaceholderText('Username'), 'testuser');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password123');

    // Simulate pressing the Login button
    fireEvent.press(screen.getByText('Login'));

    // Wait for the navigation to be called
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Home');
    });
  });

  // Test if alert is shown when fields are empty
  test('shows alert if fields are empty and login is attempted', async () => {
    render(
      <Provider store={store}>
        <LoginScreen navigation={{ navigate: mockNavigate }} />
      </Provider>
    );

    // Simulate pressing the login button without entering any text
    fireEvent.press(screen.getByText('Login'));

    // Check if the alert is triggered (i.e., an error message)
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please fill in both fields.');
    });

    // Ensure that navigation did not happen
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
