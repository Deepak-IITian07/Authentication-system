const form  = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');
const logoutBtn = document.getElementById('logout-btn');

function checkLoginStatus(){
    const loginStatus =localStorage.getItem('isLoggedIn');
    const heading = document.querySelector('h2');
    const subtitle = document.querySelector('.subtitle');
    const loginContainer = document.querySelector('.login-container');

    console.log("Checking login status: " + loginStatus);

    if(loginStatus === 'true'){
        const savedEmail =localStorage.getItem('userEmail');
        console.log("User email from localStorage: " + savedEmail);

        heading.textContent = `User Profile`;

        form.classList.add('hidden');
        if (subtitle) subtitle.classList.add('hidden');

        //inject structured email message
        if (!document.getElementById('email-display')) {
            const emailDisplay = document.createElement('p');
            emailDisplay.id = "email-display";
            emailDisplay.textContent = savedEmail;
            heading.insertAdjacentElement('afterend', emailDisplay);
        }

        logoutBtn.classList.remove('hidden');
    }
}

logoutBtn.addEventListener('click', function(){
    console.log('Logout button clicked');

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.reload();
});

// Regular expression for validating email format
const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const passwordRegex =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@]{8,}$/;

// form submission event listener
form.addEventListener('submit', function (event){
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if(email === '' || password === ''){
        errorMessage.textContent = 'Fields cannot be empty!'; return;
        console.log('Fields cannot be empty!');
        errorMessage.classList.remove('hidden');
        return;
    }

    else if(!emailRegex.test(email)){
        errorMessage.textContent = 'Invalid email format!'; 
        console.log('Invalid email format!');
        errorMessage.classList.remove('hidden');
        return;
    }
    else if(!passwordRegex.test(password)){
        errorMessage.textContent = 'Password must be at least 8 characters long and contain both letters and numbers!'; 
        console.log('Invalid password format!');
        errorMessage.classList.remove('hidden');
        return;
    }
    else if(email.length > 50 || password.length > 20){
        errorMessage.textContent = 'Email and password must be at most 50 characters long!';
        console.log('Email or password too long!');

        errorMessage.classList.remove('hidden');
        return;
    }
    
    else{
        errorMessage.textContent = '';
        errorMessage.classList.add('hidden');

        console.log('Login successful!');
        const data = {
            email: email,
            password: password
        };
        
        console.log('Sending data to server:', data);

        console.log("login status: " + localStorage.getItem('isLoggedIn'));

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        logoutBtn.style.display = 'block';

        console.log("localStorage :" + localStorage.getItem('isLoggedIn') + ", " + localStorage.getItem('userEmail'));

        alert('Login successful!');

        window.location.reload();
    }
})

form.addEventListener('input', function(){
    errorMessage.textContent = '';
    console.log('Input changed, clearing error message');
    errorMessage.classList.add('hidden');
});


checkLoginStatus();

