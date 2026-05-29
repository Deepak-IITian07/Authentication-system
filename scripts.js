const form  = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');
const logoutBtn = document.getElementById('logout-btn');

// --- 2. LIVE TYPING EFFECT ---
function runTypewriterEffect() {
    const heading = document.querySelector('h2');
    const textToType = "Welcome Back";
    heading.textContent = ""; // Clear placeholder
    let index = 0;

    function typeCharacter() {
        if (index < textToType.length) {
            heading.textContent += textToType.charAt(index);
            index++;
            setTimeout(typeCharacter, 120); // Smooth typing pace
        }
    }
    typeCharacter();
}

// --- 3. ANTIGRAVITY STAR PHYSICS ENGINE ---
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let starsArray = [];
const mouse = { x: null, y: null, radius: 120 };

window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });
window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });
window.addEventListener('resize', () => { initStars(); });

class Star {
    constructor(x, y, dx, dy, size, color) {
        this.x = x; this.y = y;
        this.dx = dx; this.dy = dy;
        this.size = size; this.color = color;
        this.baseX = x; this.baseY = y;
        this.density = (Math.random() * 20) + 1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        this.x += this.dx * 0.3;
        this.y += this.dy * 0.3;
        this.baseX += this.dx * 0.3;
        this.baseY += this.dy * 0.3;

        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

        let mdx = mouse.x - this.x;
        let mdy = mouse.y - this.y;
        let distance = Math.sqrt(mdx * mdx + mdy * mdy);
        
        if (distance < mouse.radius) {
            let forceX = mdx / distance;
            let forceY = mdy / distance;
            let push = (mouse.radius - distance) / mouse.radius;
            this.x -= forceX * push * this.density;
            this.y -= forceY * push * this.density;
        } else {
            if (this.x !== this.baseX) this.x -= (this.x - this.baseX) * 0.05;
            if (this.y !== this.baseY) this.y -= (this.y - this.baseY) * 0.05;
        }
    }
}

function initStars() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    starsArray = [];
    let densityCount = (canvas.width * canvas.height) / 8000;
    for (let i = 0; i < densityCount; i++) {
        let size = (Math.random() * 2) + 0.8;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let dx = (Math.random() * 2) - 1;
        let dy = (Math.random() * 2) - 1;
        let color = `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.4})`;
        starsArray.push(new Star(x, y, dx, dy, size, color));
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    starsArray.forEach(star => { star.update(); star.draw(); });
    requestAnimationFrame(animateStars);
}

// --- 4. LOGIN SESSION LOGIC ---
function checkLoginStatus() {
    const loginStatus = localStorage.getItem('isLoggedIn');
    const heading = document.querySelector('h2');
    const loginContainer = document.querySelector('.login-container');
    const subtitle = document.querySelector('.subtitle');

    if (loginStatus === 'true') {
        const savedEmail = localStorage.getItem('userEmail');
        heading.textContent = `User Profile`;
        form.classList.add('hidden');
        if (subtitle) subtitle.classList.add('hidden');
        loginContainer.classList.add('profile-mode');

        if (!document.getElementById('email-display')) {
            const emailDisplay = document.createElement('p');
            emailDisplay.id = "email-display";
            emailDisplay.textContent = savedEmail;
            heading.insertAdjacentElement('afterend', emailDisplay);
        }
        logoutBtn.classList.remove('hidden');
    } else {
        runTypewriterEffect(); // 🌟 Task 2: Trigger typing only when logged out!
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

// --- 5. INITIALIZE EVERYTHING ---
initStars();       // 🌟 Task 3: Starts the engine calculations
animateStars();    // Starts rendering the animation loop
checkLoginStatus();