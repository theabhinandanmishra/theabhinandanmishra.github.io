const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("sticky", window.scrollY > 0);
});

// Mobile Menu
let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
  menu.classList.toggle('bx-x');
  navlist.classList.toggle('active');
};

window.onscroll = () => {
  menu.classList.remove('bx-x');
  navlist.classList.remove('active');
};

// Scroll Reveal Animations
const sr = ScrollReveal({
  distance: '50px',
  duration: 1200,
  reset: false
});

// Home Section
sr.reveal('.home-text', { 
  delay: 200, 
  origin: 'left' 
});

sr.reveal('.home-img', { 
  delay: 300, 
  origin: 'right' 
});

// About, Skills, Portfolio, Contact
sr.reveal('.about, .portfolio, .service, .contact', {
  delay: 200,
  origin: 'bottom'
});

// 🔥 Experience Animated Entry
sr.reveal('.experience-card', {
  delay: 200,
  origin: 'bottom',
  distance: '40px',
  duration: 1200,
  interval: 200   // Cards appear one by one
});
// ⭐ Star Cursor Effect
const canvas = document.getElementById("cursor-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener("mousemove", (e) => {
  stars.push({
    x: e.clientX,
    y: e.clientY,
    size: Math.random() * 3 + 1,
    alpha: 1
  });
});

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];

    ctx.beginPath();
    ctx.fillRect(star.x, star.y, 2, 2);
    ctx.fillStyle = `rgba(0, 234, 255, ${star.alpha})`;
    ctx.fill();

    star.alpha -= 0.02;
    star.y -= 0.5;

    if (star.alpha <= 0) {
      stars.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(drawStars);
}

drawStars();
