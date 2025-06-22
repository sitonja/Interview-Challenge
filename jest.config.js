module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};