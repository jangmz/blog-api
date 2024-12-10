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
        throw new Error(`Failed to update a post with ID ${post.id}.`);
    }
}

// publish post
async function publishPost(postId) {
    try {
        const post = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                published: true
            }
        })

        console.log(`Post ID ${postId} published!`);
        return post;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to publish post ID ${postId}: ${error.message}`);
    }
}

// unpublish post
async function unpublishPost(postId) {
    try {
        const post = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                published: false
            }
        })
        console.log(`Post ID ${postId} unpublished.`);
        return post;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to publish post ID ${postId}: ${error.message}`);
    }
}

// delete post by ID
async function deletePost(postId) {
    try {
        const deletedPost = await prisma.post.delete({
            where: {
                id: postId
            }
        })

        console.log(`Post deleted (id: ${deletedPost.id}).`);
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to delete post with ID ${postId}. Error: ${error}`);
    }
}

// return a post by ID
async function getPostById(postId) {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                comments: true
            }
        });

        return post;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed retrieving post with ID ${postId}.`);
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
    publishPost,
    unpublishPost,
    deletePost,
    getPostById,
    getAllPosts,
    getPublishedPosts,
    getUnpublishedPosts,
}