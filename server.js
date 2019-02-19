const chalk = require('chalk');
const log = console.log;
const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schemas/schema');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/graph-books', {useNewUrlParser: true} ,(err) => {
    if (err) {
        log(chalk.red('failed to connect to the database'));
    } else {
        log(chalk.green('Connection to Database successful'));
    }
});

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}));

app.listen(8000, () => {
    log(chalk.yellow('Server started running at 8000'));
});