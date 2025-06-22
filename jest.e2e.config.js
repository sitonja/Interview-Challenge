module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/e2e/'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
  };