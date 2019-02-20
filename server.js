const chalk = require('chalk');
const log = console.log;
const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const { schema, queries } = require('./schemas/schema-sdl');
const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/graph-books', {useNewUrlParser: true} ,(err) => {
    if (err) {
        log(chalk.red('failed to connect to the database'));
    } else {
        log(chalk.green('Connection to Database successful'));
    }
});

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: queries,
    formatError: error => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split('\n') : [],
    })
}));

app.listen(8000, () => {
    log(chalk.yellow('Server started running at 8000'));
});