const { GraphQLServer } = require('graphql-yoga');
// graphql-yoga uses express under the hood
// graphql-playground is also set up
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/NUdining', { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new GraphQLServer({ typeDefs, resolvers });
mongoose.connection.once('open', function() {
    server.start(() => console.log('Server is running on localhost:4000'));
});
