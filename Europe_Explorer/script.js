const loginModal = document.getElementById('loginModal');
const mainContent = document.getElementById('mainContent');
const authForm = document.getElementById('authForm');
const formTitle = document.getElementById('formTitle');
const nameGroup = document.getElementById('nameGroup');
const submitBtn = document.getElementById('submitBtn');
const toggleForm = document.getElementById('toggleForm');
const logoutBtn = document.getElementById('logoutBtn');

let isLogin = true;

function showToast() {
    const toast = document.getElementById('toast');

    if (!toast) return;

    toast.classList.remove('toast-hidden');
    toast.classList.add('toast-visible');

    setTimeout(() => {
        toast.classList.remove('toast-visible');
        toast.classList.add('toast-hidden');
    }, 4000);
}

function completeLogin() {
    loginModal.style.display = 'none';
    mainContent.classList.remove('hidden-content');
    showToast();
}

function updateAuthForm() {
    if (isLogin) {
        formTitle.textContent = 'Login Required';
        nameGroup.style.display = 'none';
        submitBtn.textContent = 'Login';
        toggleForm.textContent = 'Sign Up';
        toggleForm.parentElement.childNodes[0].nodeValue = "Don't have an account? ";
    } else {
        formTitle.textContent = 'Sign Up';
        nameGroup.style.display = 'block';
        submitBtn.textContent = 'Create Account';
        toggleForm.textContent = 'Login';
        toggleForm.parentElement.childNodes[0].nodeValue = "Already have an account? ";
    }
}

/* Only run login-page code if these elements exist */
if (loginModal && mainContent && authForm) {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        loginModal.style.display = 'none';
        mainContent.classList.remove('hidden-content');
    } else {
        loginModal.style.display = 'flex';
        mainContent.classList.add('hidden-content');
    }

    toggleForm.addEventListener('click', function (e) {
        e.preventDefault();
        isLogin = !isLogin;
        updateAuthForm();
    });

    authForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!isLogin && document.getElementById('name').value.trim() === '') {
            alert('Please enter your name.');
            return;
        }

        sessionStorage.setItem('isLoggedIn', 'true');
        completeLogin();
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            sessionStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });
    }
}

/* Protect country/about pages from direct access without login */
const currentPage = window.location.pathname.split('/').pop();

if (
    currentPage !== '' &&
    currentPage !== 'index.html' &&
    sessionStorage.getItem('isLoggedIn') !== 'true'
) {
    window.location.href = 'index.html';
}

/* Smooth scrolling */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const target = document.querySelector(targetId);

        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
