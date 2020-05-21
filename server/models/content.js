const mongo = require('mongoose');
const Schema = mongo.Schema;

const contentSchema = new Schema({

    _id: Number,
    name: String,
    route: String,
    folder: Boolean,
    content: String,
    author_id: { type: Number, ref: 'user' },
  //  lastUpdateDate: { type: Date, default: Date.now },
    createdDate: { type: String, default: Date.now },
//    lastEditor: { type: Schema.Types.ObjectId, ref: 'user' },
    history: [{
        date: { type: String, default: Date.now },
        author_id: { type: Number, ref: 'user' },
        changed: String
    }]
})

module.exports = mongo.model('content', contentSchema);