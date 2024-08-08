const { defineConfig } = require('cypress');
const { Pool } = require('pg');

module.exports = defineConfig({
  e2e: {
    video: false, // disabled by default can be overriden by running npx cypress run --video=true
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const pool = new Pool({
        host: 'isabelle.db.elephantsql.com',
        user: 'fgvwvvkj',
        password: 'FQmcj5PEXs2crlc71hnCHnd9RkxKZfBg',
        database: 'fgvwvvkj',
        port: 5432,
      });

      on('task', {
        removeUser(email) {
          return new Promise(function (resolve) {
            pool.query(
              'DELETE FROM public.users WHERE email = $1',
              [email],
              function (error, result) {
                if (error) {
                  throw error;
                }
                resolve({ success: result });
              }
            );
          });
        },
        findToken(email) {
          return new Promise(function (resolve) {
            pool.query(
              'SELECT B.token FROM ' +
                'public.users A ' +
                'INNER JOIN public.user_tokens B ' +
                'ON A.id = B.user_id ' +
                'WHERE A.email = $1 ' +
                'ORDER BY B.created_at',
              [email],
              function (error, result) {
                if (error) {
                  throw error;
                }
                resolve({ token: result.rows[0].token });
              }
            );
          });
        },
      });
    },
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1440,
    viewportHeight: 900,
  },
  env: {
    apiServer: 'http://localhost:3333',
  },
});
