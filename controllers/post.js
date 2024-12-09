import postModel from "../models/postModel.js";

// GET /posts
function getPosts(req, res) {
    res.json({
        message: "This is GET posts route.",
    })
}

// POST /posts/new -> creates new article
async function postNewPost(req, res) {
    // data for new post
    const newPost = req.body;

    try {
        // insert into DB
        await postModel.createPost(newPost);

        res.status(200).json({ newPost });        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

export default {
    getPosts,
    postNewPost,
}

/* 
post = {
    title
    content
    created (date)
    published (bool)
    authorId
}
*/