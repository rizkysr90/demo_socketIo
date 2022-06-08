let socket = io();
let formCreateUser = document.getElementById('form-create-user')
    formGetUser = document.getElementById('form-get-user')
    formUpdateUser = document.getElementById('form-update-user')
    formUpdatePassword = document.getElementById('form-update-password')
    inputAreaInFormCreateUser = document.querySelectorAll('#form-create-user .input-container')
    inputAreaInFormGetUser = document.querySelectorAll('#form-get-user .input-container')
    inputAreaInFormUpdateUser = document.querySelectorAll('#form-update-user .input-container')
    inputAreaInFormUpdatePassword = document.querySelectorAll('#form-update-password .input-container')
    errorValidation = document.getElementsByClassName('error-validation')
    sectionCreateUser = document.querySelector('.section__1')
    sectionGetUser = document.querySelector('.section__2')
    sectionUpdateUser = document.querySelector('.section__3');
    sectionUpdatePassword = document.querySelector('.section__4');



let usernameInputInCreateUser = document.getElementById('username-create-user')
    passwordInputInCreateUser = document.getElementById('password-create-user')
    emailInputInCreateUser = document.getElementById('email-create-user');

let passwordInputInGetUser = document.getElementById('password-get-user')
    emailInputInGetUser = document.getElementById('email-get-user');

let passwordInputInUpdateUser = document.getElementById('password-update-user')
    emailInputInUpdateUser = document.getElementById('email-update-user')
    usernameInputInUpdateUser = document.getElementById('username-update-user');

let passwordInputInUpdatePassword = document.getElementById('password-update-password')
    emailInputInUpdatePassword = document.getElementById('email-update-password')
    confirmInputInUpdatePassword = document.getElementById('confirm-update-password');


function validation(elm,serial,message,errors,{form : formEvent}){
    let form = ""
    let errorIn = "";
    if (formEvent === "createUser") {
        form = inputAreaInFormCreateUser;
        errorIn = document.querySelectorAll('#form-create-user .input-container .error-validation');
    } else if (formEvent === "getUser") {
        form = inputAreaInFormGetUser;
        errorIn = document.querySelectorAll('#form-get-user .input-container .error-validation');
    } else if (formEvent === "updateUser") {
        form = inputAreaInFormUpdateUser;
        errorIn = document.querySelectorAll('#form-update-user .input-container .error-validation');
    } else if (formEvent === "updatePassword") {
        form = inputAreaInFormUpdatePassword;
        errorIn = document.querySelectorAll('#form-update-password .input-container .error-validation');
    } else {
        throw new Error('Internal Server Error');
    }
   
    if (elm.value === ""){
        form[serial].classList.add("input-container--error");
        errorIn[serial].textContent = message;
        errors.total++;
    } else {
        form[serial].classList.remove("input-container--error");
        errorIn[serial].textContent = "";
    }

}

function lengthValidation(elm,serial,message,errors,{form : formEvent}) {
    let form = "";
    let errorIn = "";
    if (formEvent === "createUser") {
        form = inputAreaInFormCreateUser;
        errorIn = document.querySelectorAll('#form-create-user .input-container .error-validation');
    } else if (formEvent === "getUser") {
        form = inputAreaInFormGetUser;
        errorIn = document.querySelectorAll('#form-get-user .input-container .error-validation');
    } else if (formEvent === "updateUser") {
        form = inputAreaInFormUpdateUser;
        errorIn = document.querySelectorAll('#form-update-user .input-container .error-validation');
    } else if (formEvent === "updatePassword") {
        form = inputAreaInFormUpdatePassword;
        errorIn = document.querySelectorAll('#form-update-password .input-container .error-validation');
    } else {
        throw new Error('Internal Server Error');
    }
    const value = elm.value;
    let min = 0;
    let count = 0;
    if (elm.name === "username") {
        min = 6;
    } else if (elm.name === "password") {
        min = 8;
    }
    for (let i = 0; i < value.length; i++) {
        count++;
        if (value.length > 50) {
            i = value.length;
        }
    }
    if (!errorIn[serial].textContent) {
        if (count < min) {
            form[serial].classList.add("input-container--error");
            errorIn[serial].textContent = message;
            errors.total++;
        } else {
            form[serial].classList.remove("input-container--error");
            errorIn[serial].textContent = "";
        }
    }
   
}


formUpdatePassword.addEventListener('submit',(e) => {
    let errors = {
        total : 0
    };

    validation(emailInputInUpdatePassword,0,"Email cannot be empty",errors,{form : "updatePassword"});
    validation(passwordInputInUpdatePassword,1,"Password cannot be empty",errors,{form : "updatePassword"});
    validation(confirmInputInUpdatePassword,2,"New Password cannot be empty",errors,{form : "updatePassword"});
    lengthValidation(confirmInputInUpdatePassword,2,"Minimum length of password is 8 words",errors,{form : "updatePassword"});
    if (errors.total === 0) {
        const finalInputUser = {
            email : emailInputInUpdatePassword.value,
            password : passwordInputInUpdatePassword.value,
            newPassword : confirmInputInUpdatePassword.value
        }
        socket.emit('updatePassword',finalInputUser);
    }
    
    emailInputInUpdatePassword.value = "";
    passwordInputInUpdatePassword.value = "";
    confirmInputInUpdatePassword.value = "";
    e.preventDefault();
})
formUpdateUser.addEventListener('submit',(e) => {
    let errors = {
        total : 0
    };

    validation(emailInputInUpdateUser,0,"Email cannot be empty",errors,{form : "updateUser"});
    validation(passwordInputInUpdateUser,1,"Password cannot be empty",errors,{form : "updateUser"});
    validation(usernameInputInUpdateUser,2,"Username cannot be empty",errors,{form : "updateUser"});
    lengthValidation(usernameInputInUpdateUser,2,"Minimum length of username is 6 words",errors,{form : "updateUser"});
    
    if (errors.total === 0) {
        const finalInputUser = {
            email : emailInputInUpdateUser.value,
            password : passwordInputInUpdateUser.value,
            username : usernameInputInUpdateUser.value
        }
        socket.emit('updateUser',finalInputUser);
    }
    
    emailInputInUpdateUser.value = "";
    passwordInputInUpdateUser.value = "";
    usernameInputInUpdateUser.value = "";
    e.preventDefault();
})
formGetUser.addEventListener('submit',(e) => {
    let errors = {
        total : 0
    };
    validation(emailInputInGetUser,0,"Email cannot be empty",errors,{form : "getUser"});
    validation(passwordInputInGetUser,1,"Password cannot be empty",errors,{form : "getUser"});
    
    if (errors.total === 0) {
        const finalInputUser = {
            email : emailInputInGetUser.value,
            password : passwordInputInGetUser.value
        }
        socket.emit('getUser',finalInputUser);
    }
    
    emailInputInGetUser.value = "";
    passwordInputInGetUser.value = "";
    e.preventDefault();
})
formCreateUser.addEventListener('submit', (e) => {
    let errors = {
        total : 0
    };

    validation(usernameInputInCreateUser,0,"Username cannot be empty",errors,{form : "createUser"})
    validation(emailInputInCreateUser,1,"Email cannot be empty",errors,{form : "createUser"})
    validation(passwordInputInCreateUser,2,"Password cannot be empty",errors,{form : "createUser"})
    lengthValidation(usernameInputInCreateUser,0,"Minimum length of username is 6 words",errors,{form : "createUser"})
    lengthValidation(passwordInputInCreateUser,0,"Minimum length of password is 8 words",errors,{form : "createUser"})

    if (errors.total === 0){
        const finalInputUser = {
            username : usernameInputInCreateUser.value,
            email : emailInputInCreateUser.value,
            password : passwordInputInCreateUser.value,
        }
        socket.emit('createUser',finalInputUser);
    }
    errors.total = 0
    emailInputInCreateUser.value = "";
    passwordInputInCreateUser.value = "";
    usernameInputInCreateUser.value = "";
    e.preventDefault();
})
socket.on('updatePassword',function(message){
    var para = document.createElement('p');
    para.textContent = message;
    
    para.classList.add('success-text')
    sectionUpdatePassword.appendChild(para);
    setTimeout(() => {
        let successSign = document.querySelector('.section__4 .success-text');
        if (successSign) {
            successSign.remove();
        }
        // DELAY FOR 5 SECOND
      }, "5000")
})
socket.on('failedToUpdatePassword',function(message){
    var para = document.createElement('p');
    para.textContent = message;
    para.classList.add('error-text')
    sectionUpdatePassword.appendChild(para);
    setTimeout(() => {
        let errorSign = document.querySelector('.section__4 .error-text');
        if (errorSign) {
            errorSign.remove();
        }
        // DELAY FOR 5 SECOND
      }, "5000")
})
socket.on('failedToCreateUser', function(message) {
    var para = document.createElement('p');
    para.textContent = message;
    para.classList.add('error-text')
    sectionCreateUser.appendChild(para);
    setTimeout(() => {
        let errorSign = document.querySelector('.section__1 .error-text');
        if (errorSign) {
            errorSign.remove();
        }
        // DELAY FOR 5 SECOND
      }, "5000")
      
});
socket.on('failedToUpdateUser', function(message) {
    var para = document.createElement('p');
    para.textContent = message;
    para.classList.add('error-text')
    sectionUpdateUser.appendChild(para);
    setTimeout(() => {
        let errorSign = document.querySelector('.section__3 .error-text');
        if (errorSign) {
            errorSign.remove();
        }
        // DELAY FOR 5 SECOND
      }, "5000")
      
});
socket.on('updateUser', function(message){
    var para = document.createElement('p');
    para.textContent = message;
    
    para.classList.add('success-text')
    sectionUpdateUser.appendChild(para);
    setTimeout(() => {
        let successSign = document.querySelector('.section__3 .success-text');
        if (successSign) {
            successSign.remove();
        }
        // DELAY FOR 5 SECOND
      }, "5000")
})
socket.on('createUser', function(message){
    var para = document.createElement('p');
    para.textContent = message;
    
    para.classList.add('success-text')
    sectionCreateUser.appendChild(para);
    setTimeout(() => {
        let successSign = document.querySelector('.section__1 .success-text');
        if (successSign) {
            successSign.remove();
        }
        // DELAY FOR 5 SECOND
      }, "5000")
})
socket.on('getUser',function(message){
    const {id,email,username} = message;
    let div = document.createElement('div');
    let innerDiv = document.createElement('div');
    let para1 = document.createElement('p');
    let para2 = document.createElement('p');
    let para3 = document.createElement('p');

    para1.textContent = "ID : " + id;
    para2.textContent = "Username : " + username;
    para3.textContent = "Email : " + email;
    innerDiv.textContent = "Your account";

    div.classList.add('card-userData');
    innerDiv.classList.add('card-userData__sign');
    div.append(innerDiv,para1,para2,para3);
    
    

    
    sectionGetUser.appendChild(div);
    setTimeout(() => {
        div.remove()
        // DELAY FOR 5 SECOND
      }, "5000")
})
socket.on('failedToGetUser',function(message){
    var para = document.createElement('p');
    para.textContent = message;
    para.classList.add('error-text')
    sectionGetUser.appendChild(para);
    setTimeout(() => {
        let errorSign = document.querySelector('.section__2 .error-text');
        if (errorSign) {
            errorSign.remove();
        }
        // DELAY FOR 5 SECOND
      }, "5000")
})