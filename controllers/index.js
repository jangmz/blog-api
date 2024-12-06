// GET / 
function getHome(req, res) {
    res.json({
        message: "This is GET home page",
    })
}

export default {
    getHome,
}