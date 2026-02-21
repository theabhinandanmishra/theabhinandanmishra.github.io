import * as components from './components.js';

const renderApp = () => {
  const root = document.getElementById('root');
  if (!root) return;

  root.innerHTML = `
    ${components.renderBackground()}
    ${components.renderHeader()}
    <main>
      ${components.renderHome()}
      ${components.renderAbout()}
      ${components.renderExperience()}
      ${components.renderProjects()}
      ${components.renderSkills()}
      ${components.renderContact()}
    </main>
    ${components.renderFooter()}
  `;
};

const initApp = () => {
  const header = document.querySelector("header");
  const menu = document.querySelector('#menu-icon');
  const navlist = document.querySelector('.navlist');

  // Sticky Header
  window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 0);
  });

  // Mobile Menu
  if (menu && navlist) {
    menu.onclick = () => {
      menu.classList.toggle('bx-x');
      navlist.classList.toggle('active');
    };
  }

  window.onscroll = () => {
    if (menu && navlist) {
      menu.classList.remove('bx-x');
      navlist.classList.remove('active');
    }
  };

  // Scroll Reveal Animations
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      distance: '50px',
      duration: 1200,
      reset: false
    });

    sr.reveal('.home-text', { delay: 200, origin: 'left' });
    sr.reveal('.home-img', { delay: 300, origin: 'right' });
    sr.reveal('.about, .projects, .skills, .contact', { delay: 200, origin: 'bottom' });
    sr.reveal('.experience-card', {
      delay: 200,
      origin: 'bottom',
      distance: '40px',
      duration: 1200,
      interval: 200
    });
  }

  // 3D Profile Image Effect
  const card = document.querySelector(".image-3d");
  if (card) {
    const img = card.querySelector("img");
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = -(y - centerY) / 18;
      const rotateY = (x - centerX) / 18;
      img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    });

    card.addEventListener("mouseleave", () => {
      img.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    });
  }

  // Star Cursor Effect (only if canvas exists)
  const canvas = document.getElementById("cursor-canvas");
  if (canvas) {
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
  }

  // Visitor Counter (if element exists)
  const counterElement = document.getElementById("visitorCount");
  if (counterElement) {
    let visitCount = localStorage.getItem("visitCount") || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem("visitCount", visitCount);

    let current = 0;
    const target = visitCount;
    const updateCounter = () => {
      if (current < target) {
        current++;
        counterElement.innerText = current.toString().padStart(5, "0");
        setTimeout(updateCounter, 20);
      }
    };
    updateCounter();
  }
};

renderApp();
initApp();
