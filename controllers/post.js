// GET /posts
function getPosts(req, res) {
    res.json({
        message: "This is GET posts route.",
    })
}

export default {
    getPosts,
}