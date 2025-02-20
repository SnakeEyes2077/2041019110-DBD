const { Schema, model } = require('mongoose')

const postSchema = new Schema({
    title: { type: String, required: true },
    category: {
        type: String, enum: [
            'Art',
            'Agriculture',
            'Business',
            'Education',
            'Healthcare',
            'Entertainment',
            'Investment',
            'Technology',
            'Weather',
            'Uncategorized',
        ],
        message: "{Value is not supported}"
    },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true }
)

module.exports = model('Post', postSchema)