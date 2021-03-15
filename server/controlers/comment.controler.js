const Comment = require('../models/comment.model');
const Post = require('../models/post.model');

module.exports.create = async (req, res) => {
    try {
        const {name, text, postId} = req.body.payload
        
        const comment = new Comment({name, text, postId})
        const post = await Post.findById(postId)

        post.comments.push(comment._id)

        await comment.save()
        await post.save()
        
        res.status(201).json(comment)
    } catch (error) {
        res.status(500).json(error)
    }
}