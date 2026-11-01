/* PAGE NAVIGATION */

function showPage(pageId, clickedLink) {

    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    document.getElementById(pageId).classList.add('active');

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });

    if (clickedLink) {
        clickedLink.classList.add('active');
    } else {
        const matchingLink = [...document.querySelectorAll('.nav-links a')]
            .find(link => link.textContent.trim().toLowerCase() === pageId);

        if (matchingLink) {
            matchingLink.classList.add('active');
        }
    }

    document.getElementById('navLinks').classList.remove('show');

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    revealElements();
}

/* MOBILE MENU */

function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('show');
}

/* SCROLL REVEAL */

function revealElements() {

    const elements = document.querySelectorAll('.page.active .reveal');

    elements.forEach(element => {
        const position = element.getBoundingClientRect().top;

        if (position < window.innerHeight - 80) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);

/* CONTACT FORM */

function sendMessage(event) {

    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const businessEmail = "hello@doorstudio.in";

    const body =
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + message;

    const mailtoLink =
        "mailto:" + businessEmail +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

    window.location.href = mailtoLink;
}

/* FOOTER YEAR */

document.getElementById('year').textContent = new Date().getFullYear();

