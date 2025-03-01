const app = require('../app');
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    content: { type: String, default: '' },
    
}, { timestamps: { createdAt: 'createdAt' } });

const Post = app.db.model('Post', PostSchema);
module.exports = Post;