import testRoutes from './testRoutes';

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
    ...testRoutes,
  },
  securityDefinitions: {
    token: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
};
