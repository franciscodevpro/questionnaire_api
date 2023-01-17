import components from './components';
import paths from './paths';
import schemas from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'research_me',
    description: "An simple survey's api",
    version: '1.0.0',
  },
  license: {
    name: 'MIT',
    url: 'https://opensource.org/licenses/MIT',
  },
  servers: [
    {
      url: '/api',
    },
  ],
  tags: [
    { name: 'Login' },
    { name: 'Me' },
    { name: 'Questionnaire' },
    { name: 'Question' },
    { name: 'Answer Option' },
    { name: 'Answer' },
    { name: 'Applier' },
    { name: 'Device' },
    { name: 'Upload' },
    { name: 'HealthCheck' },
    { name: 'Reports' },
  ],
  paths,
  schemas,
  components,
};
