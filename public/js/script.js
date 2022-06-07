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
    sectionCreateUser = document.querySelector('.section__1');

let usernameInputInCreateUser = document.getElementById('username-create-user')
    passwordInputInCreateUser = document.getElementById('password-create-user')
    emailInputInCreateUser = document.getElementById('email-create-user');

let passwordInputInGetUser = document.getElementById('password-get-user')
    emailInputInGetUser = document.getElementById('email-get-user');



function validation(elm,serial,message,errors,{form : formEvent}){
    let form = ""
    if (formEvent === "createUser") {
        form = inputAreaInFormCreateUser;
    } else if (formEvent === "getUser") {
        form = inputAreaInFormGetUser;
    } else if (formEvent === "updateUser") {
        form = inputAreaInFormUpdateUser;
    } else if (formEvent === "updatePassword") {
        form = inputAreaInFormUpdatePassword;
    } else {
        throw new Error('Internal Server Error');
    }
    if (elm.value === ""){
        form[serial].classList.add("input-container--error");
        errorValidation[serial].textContent = message;
        errors.total++;
    } else {
        form[serial].classList.remove("input-container--error");
        errorValidation[serial].textContent = "";
    }

}

function lengthValidation(elm,serial,message,errors,{form : formEvent}) {
    let form = "";
    if (formEvent === "createUser") {
        form = inputAreaInFormCreateUser;
    } else if (formEvent === "getUser") {
        form = inputAreaInFormGetUser;
    } else if (formEvent === "updateUser") {
        form = inputAreaInFormUpdateUser;
    } else if (formEvent === "updatePassword") {
        form = inputAreaInFormUpdatePassword;
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
    if (count < min) {
        form[serial].classList.add("input-container--error");
        errorValidation[serial].textContent = message;
        errors.total++;
    } else {
        form[serial].classList.remove("input-container--error");
        errorValidation[serial].textContent = "";
    }
}
formGetUser.addEventListener('submit',(e) => {
    let errors = {
        total : 0
    };
    validation(emailInputInGetUser,1,"Email cannot be empty",errors,{form : "getUser"});
    validation(passwordInputInGetUser,2,"Password cannot be empty",errors,{form : "getUser"});
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
socket.on('createUser', function(message){
    var para = document.createElement('p');
    para.textContent = message;
    
    let errorSign = document.querySelector('.section__1 .error-text');
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
