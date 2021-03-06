'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    // console.log(window.scrollY);
    // console.log(navbarHeight);
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
})

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    // console.log(event.target.dataset.link);
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }
    // console.log(event.target.dataset.link);
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
});


// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});

// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    home.style.opacity = (homeHeight - window.scrollY) / homeHeight;
    // console.log((homeHeight - window.scrollY) / homeHeight);
});


// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if (window.scrollY > homeHeight / 2) {
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible');
    }
});

// // Handle click on "arrow up" button
const arrowupBtn = document.querySelector('.arrow-up');
arrowupBtn.addEventListener('click', () => {
    scrollIntoView('#home');
});


// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (event) => {
    const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;
    if (filter == null) {
        return;
    }

    // Remove selection from the previous item and select the new one
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = event.target.nodeName === 'BUTTON' ?
        event.target : event.target.parentNode;
    target.classList.add('selected');

    projectContainer.classList.add('anim-out');

    setTimeout(() => {
        projects.forEach((project) => {
            // console.log(project.dataset.type);
            if (filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        });

        projectContainer.classList.remove('anim-out');

    }, 300);
});

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({
        behavior: 'smooth'
    });
}



// for popup layer
$('.pop__btn').click(function () {
    let $href = $(this).attr('href');
    layer_popup($href);
});

let toggle = false;

function layer_popup(element) {

    let $el = $(element); //???????????? id??? $element ????????? ??????

    if (toggle == false) {
        toggle = true;
        $el.fadeIn();
    } else {
        toggle = false;
        $el.fadeOut();
    }

    $el.find('a.layerClose__btn').click(function () {
        toggle = false;
        $el.fadeOut(); // ?????? ????????? ???????????? ???????????? ?????????.
        return false;
    });

}

$('.chatSend__btn').click(function () {
    console.log("hi!");
    let inputText = $('div.input-div textarea').val();
    $('#searchImg').hide();
    $('#searchVd').hide();
    $('.noData').hide();
    if (inputText === "rabbit") {
        $('#searchImg').attr('src', 'imgs/popups/rabbit.jpeg');
        $('#searchImg').show();
    } else if (inputText === "dog") {
        $('#searchImg').attr('src', 'imgs/popups/dog.jpg');
        $('#searchImg').show();
    } else if (inputText === "cat") {
        $('#searchImg').attr('src', 'imgs/popups/cat.jpeg');
        $('#searchImg').show();
    } else if (inputText === "video") {
        $('#searchVd').attr('src', 'videos/testVideo.mp4');
        $('#searchVd').show();
    } else {
        $('.noData').show();
    }

    $('div.input-div textarea').val('');
});