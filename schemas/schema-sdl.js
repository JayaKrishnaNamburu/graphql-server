const { makeExecutableSchema } = require('graphql-tools');
const Author = require('../models/author');
const Book = require('../models/book');

const typeDefs = `
    type Author {
        id: String!
        """
            Just describing 
        """
        name: String!
        age: Int
        books: [Book]
    }

    input IncomingAuthorsList {
        name: String!
        age: Int!
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
        author(id: String!): Author
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
        ): Book,
        deleteAuthor(
            id: String!
        ): Author,
        addMultipleAuthors(
            authors:    [IncomingAuthorsList]
        ): [Author],
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
    // resolvers are related ot stuff defined in typedefs
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
        },
        deleteAuthor: (_, payload) => {
            return Author.findByIdAndDelete(payload.id);
        },
        addMultipleAuthors: async (_, payload) => {
            function insertDocs() {
                return Author.insertMany(payload.authors);
            }
            try {
                const result = await insertDocs();
                return result;
            } catch(err) {
                
            }
        }
    }
}

schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

module.exports = { schema, queries };