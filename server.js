const chalk = require('chalk');
const log = console.log;
const { ApolloServer } = require('apollo-server');
const { schema, queries } = require('./schemas/schema-sdl');
const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/graph-books', {useNewUrlParser: true} ,(err) => {
    if (err) {
        log(chalk.red('failed to connect to the database'));
    } else {
        log(chalk.green('Connection to Database successful'));
    }
});

 const server = new ApolloServer({
    schema: schema,
    rootValue: queries,
    formatError: error => {
        return new Error('Internal server error');
    },
});

server.listen().then(({ url }) => {
    chalk.green(log(`🚀  Server ready at ${url}`));
});
