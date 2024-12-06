import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// create comment
async function createComment(comment) {
    try {
        const newComment = await prisma.comment.create({
            data: {
                content: comment.content,
                created: new Date(),
                postId: comment.postId,
                userId: comment.userId,
            }
        })

        console.log("New comment added.");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create a comment:", error);
    }
}

// delete comment
async function deleteComment(commentId) {
    try {
        const deletedComment = await prisma.comment.delete({
            where: {
                id: commentId
            }
        })

        console.log(`Successfully deleted comment: ${deletedComment.content}`);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete a comment:", error);
    }
}

export default {
    createComment,
    deleteComment,
}