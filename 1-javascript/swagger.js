const { userSchema } = require('./validations/user.schema');
const joiToSwagger = require('joi-to-swagger');

const { swagger: userSwagger } = joiToSwagger(userSchema);

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'User API',
    version: '1.0.0',
    description: 'API para creación de usuarios'
  },
  paths: {
    '/api/users': {
      post: {
        summary: 'Crear usuario',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: userSwagger
            }
          }
        },
        responses: {
          201: {
            description: 'Usuario creado exitosamente'
          },
          400: {
            description: 'Error de validación'
          },
          500:{
            description:'Server error'
          }
        }
      }
    }
  }
};

module.exports = swaggerDocument;
