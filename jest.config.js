module.exports = {
  collectCoverageFrom: [
    '**/*.{js}',
    '!**/index.js',
    '!**/node_modules/**',
    '!App.js',
  ],
  coverageDirectory: 'build/coverage',
  coverageReporters: [
    'json',
    'text',
    'html',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  presets: [['env', { modules: false }]],
  env: {
    test: {
      presets: [['env']],
    },
  },
  silent: true,
  testEnvironment: 'jsdom',
};
