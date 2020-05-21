const express = require('express');
const consola = require('consola');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  let { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  mongoose.connect('mongodb://localhost:27017/hatraa', {useNewUrlParser: true});
  mongoose.connection.once('open', () => {
    console.log('connected to database');
  })

  app.use('/graphiql', graphqlHTTP({ schema: schema, graphiql: true}));
  // Give nuxt middleware to express
  app.use(nuxt.render)
port = 3002;
  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
