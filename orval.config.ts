import { defineConfig } from 'orval';
import { produce } from 'immer';

export default defineConfig({
  todoshlyop: {
    input: {
      target: './openapi.json',
      override: {
        transformer(verb) {
          return produce(verb, (draft) => {
            if (draft.paths['/auth/register'].post) {
              draft.paths['/auth/register'].post.responses['422'].content = {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/HTTPRegisterValidationError',
                  },
                },
              };
            }
            if (draft.paths['/auth/login'].post) {
              draft.paths['/auth/login'].post.responses['200'].content = {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/AuthResponse',
                  },
                },
              };
            }
            if (draft.paths['/auth/update_token'].post) {
              draft.paths['/auth/update_token'].post.responses['200'].content =
                {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/AuthResponse',
                    },
                  },
                };
            }
            if (draft.components && draft.components.schemas) {
              draft.components.schemas['AuthResponse'] = {
                properties: {
                  access_token: {
                    type: 'string',
                    title: 'access_token',
                  },
                  token_type: {
                    type: 'string',
                    title: 'token_type',
                  },
                },
                type: 'object',
                title: 'AuthResponse',
                required: ['access_token', 'token_type'],
              };
              draft.components.schemas['HTTPRegisterValidationError'] = {
                properties: {
                  detail: {
                    type: 'string',
                    title: 'detail',
                  },
                },
                type: 'object',
                title: 'HTTPRegisterValidationError',
                required: ['detail'],
              };
            }
          });
        },
      },
    },
    output: {
      target: './src/queries/api.ts',
      client: 'axios-functions',
      mode: 'tags-split',
      override: {
        mutator: {
          path: './src/queries/axios.ts',
          name: 'axiosInstance',
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'npx prettier --write',
    },
  },
});
