module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@react-navigation/native$': require.resolve('@react-navigation/native'),
    '^@react-navigation/stack$': require.resolve('@react-navigation/stack'),
    '^react-native$': require.resolve('react-native'),
    '^axios$': require.resolve('axios'),
  },
  testEnvironment: 'node',
};
