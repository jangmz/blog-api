// GET /users
function getUsers(req, res) {
    res.json({
        message: "This is GET users route.",
    })
}

export default {
    getUsers,
}