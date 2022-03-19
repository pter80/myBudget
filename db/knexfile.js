// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : 'localhost',
      //port : 3306,
      user : 'pter',
      password : 'U4i6yci8@',
      database : 'my_budget'
    },
    debug: true
  },

  staging: {
   
  },

  production: {
  }

};
