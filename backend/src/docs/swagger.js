const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TaskFlow API',
      version: '1.0.0',
      description: 'REST API with JWT Auth, RBAC, and Task CRUD',
    },
    servers: [{ url: '/api/v1', description: 'v1' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/modules/**/*.routes.js'], // scan all route files for JSDoc
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
