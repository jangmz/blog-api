// GET /comments
function getComments(req, res) {
    res.json({
        message: "This is GET comments route.",
    })
}

export default {
    getComments,
}