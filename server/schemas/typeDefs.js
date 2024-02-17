const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
        bookCount: Int
    },

    type Book {
        bookId: String!
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    },

    input BookInput {
        bookId: String!
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Query {
        users: [User]!
        user(userId: ID): User
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

        saveBook(userId: ID, book: BookInput!): User
        #removeUser(userId: ID!): User
        removeBook(userId: ID, bookId: String!): User
    }
`;

module.exports = typeDefs;

// {
//     bookId: 'jaM7DwAAQBAJ', 
//     authors: Array(1), 
//     title: "Ender's Game", 
//     description: '"The classic of modern science fiction"--Front cover.', 
//     image: 'http://books.google.com/books/content?id=jaM7DwAAQ…=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
// }