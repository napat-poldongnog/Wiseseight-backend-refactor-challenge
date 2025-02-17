/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

export {}

module.exports = {
  verbose: false,
  preset: 'ts-jest',
  collectCoverageFrom: ['<rootDir>/src/application/useCase/**/*.{ts}', '!**/node_modules/**'],
  coverageThreshold: {
    // This threshold for development only
    global: {
      statements: 0.1,
      branches: 0.1,
      functions: 0.1,
      lines: 0.1,
    },
  },
  testTimeout: 60 * 1000, // Milliseconds
}
