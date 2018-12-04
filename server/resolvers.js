/* Resolvers for the NU Dining server */

const Dining = require('./models/dining');
const Menu = require('./models/menu');
const Food = require('./models/food');
const User = require('./models/user');

function compareRatings(food1, food2) {
    return (food2.thumbsUp - food2.thumbsDown) - (food1.thumbsUp - food1.thumbsDown);
    // if food1 is better, result is < 0, and food1 will have a lower index
    // sorts the array of foods in descending order
}
function sortFoods(foodArray, num) {
    let sortedFoods = foodArray.sort(compareRatings);
    return sortedFoods.slice(0, num);
}

resolvers = {
    Dining: {
        menus: (parent) => parent.menuIds.map(
            (id) => Menu.findById(id)
        ),
        foods: (parent) => parent.foodIds.map(
            (id) => Food.findById(id)
        )
    },
    Menu: {
        dining: (parent) => Dining.findById(parent.diningId),
        foods: (parent) => parent.foodIds.map(
            (id) => Food.findById(id)
        ),

        topFoods: async (parent, { num }) => {
            const foods = await Promise.all(parent.foodIds.map(
                (id) => Food.findById(id)
            ));
            return sortFoods(foods, num);
        }
    },
    Food: {
        dining: (parent) => Dining.findById(parent.diningId)
    },
    User: {
        faveFoods: (parent) => parent.faveFoodIds.map(
            (id) => Food.findById(id)
        )
    },
    Query: {
        //DINING
        dinings: () => Dining.find(),
        dining: (_, { id }) => Dining.findById(id),

        diningByName: (_, { name }) => Dining.findOne({name: name}),
        diningHalls: () => Dining.find({ isHall: true }),
        nonDiningHalls: () => Dining.find({ isHall: false }),

        //MENU
        menus: () => Menu.find(),
        menu: (_, { id }) => Menu.findById(id),
        menuByDiningDateTimeOfDay: (_, { diningId, date, timeOfDay }) => Menu.findOne({ 
            diningId: diningId,
            date: date,
            timeOfDay: timeOfDay
        }),


        //FOOD
        foods: () => Food.find(),
        food: (_, { id }) => Food.findById(id),

        foodByNameAndDining: (_, { name, diningId }) => Food.findOne({ name: name, diningId: diningId }),
        topFoodsOverall: async (_, { num, isHall, date, timeOfDay}) => {
            let dining_Ids = await Dining.find({ isHall: isHall }).select({ "_id": 1 });
            let diningIds = dining_Ids.map(_ => _.id);

            let menu_foodIds = await Menu.find({
                diningId: { $in: diningIds },
                date: date,
                timeOfDay: timeOfDay
            }).select({ foodIds: 1 });
            let foodIds = (menu_foodIds.map(_ => _.foodIds));
            foodIds = foodIds.reduce((acc, val) => acc.concat(val), []);

            let foods = await Promise.all(foodIds.map(
                (id) => Food.findById(id)
            ));
            return sortFoods(foods, num);
        },

        //USER
        users: () => User.find(),
        user: (_, { id }) => User.findById(id),

        userByName: (_, { name }) => User.findOne({ name: name })
    },

    Mutation: {
        //DINING
        createDining: async (_, { name, hours, isHall }) => {
            const dining = new Dining({
                name: name,
                rating: 0,
                hours: hours,
                isHall: isHall,
                menuIds: [],
                foodIds: []
            });
            await dining.save();
            return dining;
        },
        updateDining: (_, { id, rating, hours }) => 
            Dining.findByIdAndUpdate(id, {
                rating: rating,
                hours: hours
            }, { new: true}),

        removeDining: async (_, { id }) => {
            const dining = await Dining.findById(id);
            await Promise.all(dining.foodIds.map(
                (id) => Food.findByIdAndRemove(id)
            ));
            await Promise.all(dining.menuIds.map(
                (id) => Menu.findByIdAndRemove(id)
            ));
            await Dining.findByIdAndRemove(id);
            return true;
        },

        //MENU
        createMenu: async (_, { diningId, timeOfDay, date }) => {
            let menu = new Menu({
                date: date,
                timeOfDay: timeOfDay,
                diningId: diningId
            });
            await menu.save();
            await Dining.findByIdAndUpdate(diningId, {
                $push: { menuIds: menu._id }
            });
            return menu;
        },
        addFoodToMenu: (_, { menuId, foodId }) => 
            Menu.findByIdAndUpdate(menuId, {
                $push: { foodIds: foodId }
            }, { new: true}),

        removeFoodFromMenu: async (_, { menuId, foodId }) => 
            Menu.findByIdAndUpdate(id, {
                $pull: { foodIds: foodId }
            }, { new: true}),

        removeMenu: async (_, { id }) => {
            const menu = await Menu.findById(id);
            await Dining.findByIdAndUpdate(menu.diningId, {
                $pull: {menuIds: id}
            });
            await Menu.findByIdAndRemove(id);
            return true;
        },

        //FOOD
        createFood: async (_, { name, description, diet, category, diningId }) => {
            let foundFood = await Food.findOne({ name: name, diningId: diningId });
            if (foundFood == null) {
                let food = new Food({
                    name: name,
                    description: description,
                    thumbsUp: 0,
                    thumbsDown: 0,
                    diet: diet,
                    category: category,
                    preferences: [], // use food name and description to match with preferences
                    diningId: diningId
                });
                await food.save();
                await Dining.findByIdAndUpdate(diningId, {
                    $push: { foodIds: food._id }
                });
                return food;
            }
            else {
                return foundFood;
            }
        },
        updateFood: (_, { id, thumbsUp, thumbsDown }) => 
            Food.findByIdAndUpdate(id, {
                thumbsUp: thumbsUp,
                thumbsDown: thumbsDown
            }, { new: true}),

        thumbsUp: (_, {id}) => 
            Food.findByIdAndUpdate(id, {
                $inc: { thumbsUp: 1 }
            }, { new: true}),

        thumbsDown: (_, {id}) => 
            Food.findByIdAndUpdate(id, {
                $inc: { thumbsDown: 1 }
            }, { new: true}),

        removeFood: async (_, {id}) => {
            let food = await Food.findById(id);
            await Dining.findByIdAndUpdate(food.diningId, {
                $pull: { foodIds: id }
            });
            await Menu.updateMany({
                $pull: { foodIds: id }
            });
            await User.updateMany({
                $pull: { faveFoodIds: id }
            })
            await Food.findByIdAndRemove(id);
            return true;
        },

        //USER
        createUser: async (_, { name, diet, preferences = [] }) => {
            const user = new User({
                name: name,
                diet: diet,
                preferences: preferences,
                faveFoodIds: []
            });
            await user.save();
            return user;
        },
        updateUser: async (_, { id, name, diet, preferences }) =>
            User.findByIdAndUpdate(id, {
                name: name,
                diet: diet,
                preferences: preferences
            }, { new: true}),

        addFaveFood: async (_, { userId, foodId }) =>
            User.findByIdAndUpdate(userId, {
                $push: { faveFoodIds: foodId }
            }, { new: true}),

        removeFaveFood: async (_, { userId, foodId }) =>
            User.findByIdAndUpdate(userId, {
                $pull: { faveFoodIds: foodId }
            }, { new: true}),
            
        removeUser: async (_, {id}) => {
            await User.findByIdAndRemove(id);
            return true;
        }
    }
}

module.exports = resolvers;