const graphql = require('graphql');
const Content = require('./models/content');
const User = require('./models/user');
const mongoose = require('mongoose');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLScalarType
} = graphql

const UserType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLString},
        identify: {type: GraphQLString},
        image: {type: GraphQLString}
    })
})


const HistoryType = new GraphQLObjectType({
    name: 'history',
    fields: () => ({
        date: { type: GraphQLString },
        author_id: { type: GraphQLInt },
        changed: {type: GraphQLString},
        author: {
            type: UserType, resolve: async function (currentHistory) {

                return getUser(currentHistory);
            },
        }
    })
})

const ContentType = new GraphQLObjectType({
    name: 'content',
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLString},
        route: {type: GraphQLString},
        folder: {type: GraphQLBoolean},
        content: {type: GraphQLString},
        //metadata: { type: new GraphQLSchema(MetadataType)},
        author_id: { type: GraphQLInt },
        createdDate: { type: GraphQLString },
        author: {
            type: UserType, resolve: async function (content) {

                return getUser(content);
            }
        },
        history: {
            type: new GraphQLList(HistoryType), resolve: async function (content) {

                if (content.history) {
                    for (let item of content.history) {
                        var user = await User.findById(item.author_id);
                        if (!user) {
                            throw new Error('Error!')
                        }

                        item.author=user;
                    }
                }
                return content.history;
            }
        }
    })
})

async function getUser(item) {
    if (item.author_id) {
        var user = await User.findById(item.author_id);
        if (!user) {
            throw new Error('Error!')
        }
        return user;
    }
    return [];
}

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                _id: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve(parent,args) {
                return User.findById(args._id);
            }
        },
        content: {
            type: ContentType,
            args: {
                _id: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve(parent,args) {
                return Content.findById(args._id);
            }
        },
        contents: {
            type: new GraphQLList(ContentType),
            resolve(parent, args) {
                return Content.find({});
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});