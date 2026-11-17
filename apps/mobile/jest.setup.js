const { jest } = require('@jest/globals');

// Metro processes this stylesheet in the app; Jest only tests rendering and behavior.
jest.mock('./global.css', () => ({}));
