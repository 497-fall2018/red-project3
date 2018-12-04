import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

import gql from "graphql-tag";


// client
//   .query({
//     query: gql`
//       query {topFoodsOverall(num: 5, isHall: true, date: "2018-11-15", timeOfDay: "Lunch") {
//         id
//         name
//         thumbsUp
//         thumbsDown
//         dining {
//             name
//         }
//     }
//   }
//     `
//   })
//   .then(result => console.log(result));

export default client;