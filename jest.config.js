module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.js'],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    "<rootDir>/public/",
    "<rootDir>/node_modules/",
    "<rootDir>/src/components/Notifications.ts"
  ]
};
