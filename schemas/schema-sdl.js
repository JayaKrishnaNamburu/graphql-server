const { makeExecutableSchema } = require('graphql-tools');
const Author = require('../models/author');
const Book = require('../models/book');

const typeDefs = `
    type Author {
        id: String!
        name: String!
        age: Int
        books: [Book]
    }

    type Book {
        id: String!
        name: String,
        genre: String,
        author: Author!
    }

    type Query {
        authors: [Author]
        books: [Book],
        book(id: String!): Book,
        author(id: String!): Author,
    }

    type Mutation {
        addAuthor(
            name: String!,
            age: Int
        ): Author,
        addBook(
            name: String!,
            genre: String,
            author_id: String!,
        ): Book
    }
`;

const queries = {
    authors: () => {
        return Author.find({});
    },
    books: () => {
        return Book.find({});
    },
    book: (payload) => {
        return Book.findById(payload.id);
    },
    author: (payload) => {
        return Author.findById(payload.id);
    }
}


const resolvers = {
    Author: {
        books: (author) => {
            return Book.find({ author_id: author.id });
        }
    },
    Book: {
        author: (book) => {
            return Author.findById(book.author_id);
        }
    },
    Mutation: {
        addAuthor: (_, payload) => {
            return Author.create(payload);
        },
        addBook: (_, payload) => {
            return Book.create(payload);
        }
    }
}

schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

module.exports = { schema, queries };