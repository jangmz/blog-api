import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// create post
async function createPost(post) {
    try {
        const newPost = await prisma.post.create({
            data: {
                title: post.title,
                content: post.content,
                created: new Date(),
                published: post.published,
                authorId: post.authorId
            }
        })

        console.log("New post created: ", newPost);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create a post:", error);
    }
}

// update post
async function updatePost(post) {
    try {
        const updatedPost = await prisma.post.update({
            where: {
                id: post.id
            },
            data: {
                title: post.title,
                content: post.content,
                updated: new Date(),
                published: post.published,
            }
        })

        console.log("Post updated: ", updatedPost);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create a post:", error);
    }
}

// delete post by ID
async function deletePost(postId) {
    try {
        const deletedPost = await prisma.post.delete({
            where: {
                id: postId
            },
            include: {
                comments
            }
        })

        console.log(`Post (id: ${deletedPost.id}) deleted.`);
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to delete post with ID ${postId}. Error: ${error}`);
    }
}

// return all posts (published and unpublished)
async function getAllPosts() {
    try {
        const allPosts = await prisma.post.findMany();

        return allPosts;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to get all posts. Error: ${error}`);
    }
}

// return all published posts
async function getPublishedPosts() {
    try {
        const publishedPosts = await prisma.post.findMany({
            where: {
                published: true
            }
        });

        return publishedPosts;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to get published posts. Error: ${error}`);
    }
}

// return all unpublished posts
async function getUnpublishedPosts() {
    try {
        const unpublishedPosts = await prisma.post.findMany({
            where: {
                published: false
            }
        });

        return unpublishedPosts;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to get unpublished posts. Error: ${error}`);
    }
}

export default {
    createPost,
    updatePost,
    deletePost,
    getAllPosts,
    getPublishedPosts,
    getUnpublishedPosts,
}