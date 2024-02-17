// // route to get logged in user's info (needs the token)
// export const getMe = (token) => {
//     return fetch('/api/users/me', {
//       headers: {
//         'Content-Type': 'application/json',
//         authorization: `Bearer ${token}`,
//       },
//     });
//   };

import { gql } from '@apollo/client';

export const GET_ME = gql`
query me {
    me {
        _id
        username
        savedBooks
    }
}
`;