module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.js'],
    collectCoverageFrom: [
        'controllers/**/*.js',
        'models/**/*.js',
        'routes/**/*.js'
    ],
    coverageDirectory: 'coverage',
    setupFiles: ['dotenv/config']
};
