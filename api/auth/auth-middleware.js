

function restricted (req, res, next) {
    console.log('restricting access to authed users only!!')
    next()

}
module.exports = {
    restricted, 
}