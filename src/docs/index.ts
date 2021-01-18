import userDocs from './userDocs';
import disciplineDocs from './disciplineDocs';
import userDisciplineDocs from './userDisciplineDocs';

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
    ...disciplineDocs,
    ...userDisciplineDocs,
  },
  securityDefinitions: {
    token: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
};
