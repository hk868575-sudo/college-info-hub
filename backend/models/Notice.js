const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        publishDate: {
            type: Date,
            required: true
        },

        eventDate: {
            type: Date
        },

        isImportant: {
            type: Boolean,
            default: false
        },
        expiryDate: {
            type: Date
        },
        isArchived: {
            type: Boolean,
            default: false
        },
        attachment: 
        {
            name: {
                type: String
            },
            url: {
                type: String
            },
            type: {
                type: String
            }
        }
    },
    {
        timestamps: true
    }
);

const Notice = mongoose.model("Notice", noticeSchema);

module.exports = Notice;