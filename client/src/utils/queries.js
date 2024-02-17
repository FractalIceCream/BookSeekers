import { gql } from '@apollo/client';

//troubleshooting 
export const GET_SINGLE_USER = gql`
query Query($userId: ID) {
    user(userId: $userId) {
      _id
      username
      email
      password
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
      bookCount
    }
}`;

export const GET_ME = gql`
query me {
    me {
        _id
        username
        savedBooks {
            bookId,
            authors,
            description,
            title,
            image,
            link
        }
    }
}`;