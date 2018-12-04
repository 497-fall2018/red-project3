/* Schema for the NU Dining server */

typeDefs = `
    type Dining {
        id: ID!
        name: String!
        rating: Int!
        hours: String!
        isHall: Boolean!
        menus: [Menu!]!
        foods: [Food!]!
    }
    type Menu {
        id: ID!
        date: String!
        timeOfDay: String!
        dining: Dining!
        foods: [Food!]!
        topFoods(num: Int!): [Food!]!
    }
    type Food {
        id: ID
        name: String!
        thumbsUp: Int!
        thumbsDown: Int!
        diet: String
        preferences: [String!]!
        dining: Dining!
    }
    type User {
        id: ID!
        name: String!
        diet: String
        preferences: [String!]!
        faveFoods: [Food!]!
        
    }
    type Query {
        dinings: [Dining!]!
        diningHalls: [Dining!]!
        nonDiningHalls: [Dining!]!
        findDining(id: ID!): Dining
        dining(id: ID!): Dining!
        diningByName(name: String!): Dining

        menus: [Menu!]!
        menu(id: ID!): Menu
        menuByDiningDateTimeOfDay(diningId: ID!, date: String!, timeOfDay: String): Menu

        foods: [Food!]!
        food(id: ID!): Food
        foodByNameAndDining(name: String!, diningId: ID!): Food
        topFoodsOverall(num: Int!, isHall: Boolean!, date: String!, timeOfDay: String!): [Food!]!

        users: [User!]!
        user(id: ID!): User
        userByName(name: String!): User

    }
    type Mutation {
        createDining(name: String!, hours: String!, isHall: Boolean!): Dining!
        updateDining(id: ID!, rating: Int, hours: Int): Dining
        removeDining(id: ID!): Boolean!

        createMenu(diningId: ID!, timeOfDay: String!, date: String!): Menu!
        addFoodToMenu(menuId: ID!, foodId: ID!): Menu
        removeFoodFromMenu(menuId: ID!, foodID: ID!): Menu
        removeMenu(id: ID!): Boolean!

        createFood(name: String!, description: String, diet: String, category: String, diningId: ID!): Food
        updateFood(id: ID!, thumbsUp: Int, thumbsDown: Int): Food
        thumbsUp(id: ID!): Food
        thumbsDown(id: ID!): Food
        removeFood(id: ID!): Boolean!

        createUser(name: String!, diet: String, preferences: [String!]): User!
        updateUser(id: ID!, name: String, diet: String, preferences: [String!]): User
        addFaveFood(userId: ID!, foodId: ID!): User
        removeFaveFood(userId: ID!, foodId: ID!): User
        removeUser(id: ID!): Boolean!
    }
`

module.exports = typeDefs;