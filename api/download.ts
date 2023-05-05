module.exports = (request, response) => {
    response.setHeader('content-type','text/plain');
    console.error("there has been an error, this is just a test")
    response.send('hello world, this is download endpoint')
}