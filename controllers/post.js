import postModel from "../models/postModel.js";

// GET /posts -> get all posts
async function getPosts(req, res) {
    try {
        const allPosts = await postModel.getAllPosts();

        res.status(200).json({ allPosts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error })
    }
}

// GET /posts/:postId -> gets a single article with comments
async function getPost(req, res) {
    const postId = parseInt(req.params.postId);

    try {
        // get post data with the comments
        const postData = await postModel.getPostById(postId);

        res.status(200).json({ postData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

// POST /posts -> creates new article
async function postNewPost(req, res) {
    // data for new post
    const newPost = req.body;
    newPost.created = new Date();
    newPost.authorId = 2; // change when JWT is implemented

    try {
        // insert into DB
        await postModel.createPost(newPost);

        res.status(200).json({ newPost });        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

// DELETE /posts/:postId -> deletes the post by ID
async function deletePost(req, res) {
    const postId = parseInt(req.params.postId);

    try {
        await postModel.deletePost(postId);

        res.status(200).json({ message: `Post with ID ${postId} successfully deleted.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

// PUT /posts/:postID -> updates existing post by ID
async function updatePost(req, res) {
    const editedPost = req.body;
    editedPost.id = parseInt(req.params.postId);

    try {
        // update
        await postModel.updatePost(editedPost);

        // get new post data
        const updatedPost = await postModel.getPostById(editedPost.id);

        res.status(200).json({ 
            message: "Post updated.",
            updatedPost,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

// PUT /posts/publish/:postId
async function publishPost(req, res) {
    const postId = parseInt(req.params.postId);

    try {
        const post = await postModel.publishPost(postId);

        res.status(200).json({ 
            message: "Post published.",
            post
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

// PUT /posts/unpublish/:postId
async function unpublishPost(req, res) {
    const postId = parseInt(req.params.postId);

    try {
        const post = await postModel.unpublishPost(postId);

        res.status(200).json({ 
            message: "Post unpublished.",
            post
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

export default {
    getPosts,
    getPost,
    postNewPost,
    deletePost,
    updatePost,
    publishPost,
    unpublishPost,
}

/* 
post = {
    title
    content
    created (date)
    published (bool)
    authorId
    comments[]
    updated
}
*/