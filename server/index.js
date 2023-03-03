const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.PORT || 3001;

io.on('connection', (socket) => {
    socket.on("join",(roomNumber)=>{
        socket.join(roomNumber);
        io.to(roomNumber).emit('joined','hello')
    })
 
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    });