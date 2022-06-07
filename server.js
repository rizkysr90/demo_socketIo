require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');
const {User} = require('./models/index');
const {compareWithBcrypt,encryptWithBcrypt} = require('./utils/bcrypt');

app.use('/static', express.static(path.join(__dirname, 'public')))
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.status(200).render('homepage');
});
io.on('connection', (socket) => {
    socket.on('createUser', async (userInput) => {
        const {username,email,password} = userInput;
        const findUser = await User.findOne({where : {email}})
        // const findUser = true; 
        if (findUser) {
            io.emit('failedToCreateUser',`Error : Email ${email} was used by others`)
            return
        }
        const hashedPassword = await encryptWithBcrypt(password)
        userInput.password = hashedPassword;
        const createUser = await User.create(userInput)
        if (!createUser) {
            io.emit('failedToCreateUser','Error : Internal Server Error')
            return
        }
        io.emit('createUser',`Success : User with id ${createUser.id} was created`)
        console.log('Logging : ' + 'Create User');
    });
    
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});