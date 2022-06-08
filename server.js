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
        const findUser = await User.findOne({where : {email}});
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
    socket.on('getUser', async (userInput) => {
        const {email,password} = userInput;
        const findUser = await User.findOne({where : {email}});
        if (!findUser) {
            io.emit('failedToGetUser',`Error : User account is not found`);
            return;
        }
        const verifyPassword = await compareWithBcrypt(password,findUser.password);
        if (!verifyPassword) {
            io.emit('failedToGetUser',`Error : Email or password are wrong`);
            return;
        }
        const userData = {
            id : findUser.id,
            email : findUser.email,
            username : findUser.username
        }
        io.emit('getUser',userData);
        console.log('Logging : ' + 'Get User');
    });
    socket.on('updateUser',async (userInput) => {
        const {email,password,username} = userInput;
        const findUser = await User.findOne({where : {email}});
        if (!findUser) {
            io.emit('failedToUpdateUser',`Error : User account is not found`);
            return;
        }
        const verifyPassword = await compareWithBcrypt(password,findUser.password);
        if (!verifyPassword) {
            io.emit('failedToUpdateUser',`Error : Email or password are wrong`);
            return;
        }
        const updateUser = await User.update({username},{where : {email}});
        if (updateUser[0] === 0) {
            // if update failed
            io.emit('failedToUpdateUser',`Error : Internal Server Error`);
            return;
        }

        io.emit('updateUser',`Success : Username with id user ${findUser.id} was updated`)
        console.log('Logging : ' + 'Update User');
    })
    socket.on('updatePassword',async (userInput) => {
        const {email,password,newPassword} = userInput;
        const findUser = await User.findOne({where : {email}});
        if (!findUser) {
            io.emit('failedToUpdatePassword',`Error : User account is not found`);
            return;
        }
        const verifyPassword = await compareWithBcrypt(password,findUser.password);
        if (!verifyPassword) {
            io.emit('failedToUpdatePassword',`Error : Email or password are wrong`);
            return;
        }
        const hashedNewPassword = await encryptWithBcrypt(newPassword);
        const updateUser = await User.update({password : hashedNewPassword},{where : {email}});
        if (updateUser[0] === 0) {
            // if update failed
            io.emit('failedToUpdatePassword',`Error : Internal Server Error`);
            return;
        }
        io.emit('updatePassword',`Success : Password with id user ${findUser.id} was updated`)
        console.log('Logging : ' + 'Update Password');
    })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});