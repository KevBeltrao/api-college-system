import userDocs from './userDocs';

export default {
  swagger: '2.0',
  info: {
    description: 'college system api',
    version: '0.0.1',
    title: 'college system api',
  },
  schemes: [
    'http',
    'https',
  ],
  paths: {
    ...userDocs,
  },
  securityDefinitions: {
    token: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
};
