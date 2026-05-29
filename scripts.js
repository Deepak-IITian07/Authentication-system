const form  = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');

// Regular expression for validating email format
const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const passwordRegex =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@]{8,}$/;

form.addEventListener('submit', function (event){
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if(email === '' || password === ''){
        errorMessage.textContent = 'Fields cannot be empty!'; return;
    }

    else if(!emailRegex.test(email)){
        errorMessage.textContent = 'Invalid email format!'; 
        errorMessage.classList.remove('hidden');
        return;
    }
    else if(!passwordRegex.test(password)){
        errorMessage.textContent = 'Password must be at least 8 characters long and contain both letters and numbers!'; 
        errorMessage.classList.remove('hidden');
        return;
    }
    else if(email.length > 50 || password.length > 20){
        errorMessage.textContent = 'Email and password must be at most 50 characters long!';
        errorMessage.classList.remove('hidden');
        return;
    }
    
    else{
        errorMessage.textContent = '';
        alert('Login successful!');
        errorMessage.classList.add('hidden');
        form.reset();
    }
})

form.addEventListener('input', function(){
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');
});