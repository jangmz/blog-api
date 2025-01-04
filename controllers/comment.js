import commentModel from "../models/commentModel.js";

// POST /comments
async function postNewComment(req, res) {
    const comment = req.body;
    comment.postId = parseInt(comment.postId);
    comment.userId = parseInt(req.user.id);
    
    try {
        const newComment = await commentModel.createComment(comment);

        res.status(200).json({ 
            message: "New comment added.",
            comment: newComment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

// DELETE /comments/:commentId
async function deleteComment(req, res) {
    const commentId = parseInt(req.params.commentId);

    try {
        await commentModel.deleteComment(commentId);

        res.status(200).json({ 
            message: `Comment with ID ${commentId} has been removed.`,
        })
    } catch (error) {
        
    }
}

export default {
    postNewComment,
    deleteComment,
}