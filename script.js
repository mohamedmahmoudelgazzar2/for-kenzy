AOS.init();

function showLove() {
  const secret = document.getElementById("secret");
  secret.classList.remove("hidden");

  Swal.fire({
    title: "For you ❤️",
    text: "You make my life so much better 💕",
    icon: "success",
    confirmButtonText: "Aww 🥺"
  });
}
function playMusic() {
  const music = document.getElementById("bg-music");
  music.play();
}

particlesJS("particles-js", {
  particles: {
    number: { value: 60 },
    size: { value: 3 },
    move: { speed: 1 },
    line_linked: { enable: false }
  }
});

const text = "I didn’t just make a website… I made this for you 💌";
const typedEl = document.getElementById("typed");
let textIndex = 0;

function typeText() {
  if (textIndex < text.length) {
    typedEl.textContent += text.charAt(textIndex);
    textIndex++;
    setTimeout(typeText, 55);
  }
}

window.addEventListener("load", () => {
  typeText();
});

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;
let startX = 0;
let endX = 0;

function updateSlider() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentSlide);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlider();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

const slider = document.getElementById("slider");

slider.addEventListener("touchstart", (e) => {
  startX = e.changedTouches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

slider.addEventListener("mousedown", (e) => {
  startX = e.clientX;
});

slider.addEventListener("mouseup", (e) => {
  endX = e.clientX;
  handleSwipe();
});

function handleSwipe() {
  const diff = startX - endX;

  if (diff > 50) {
    nextSlide();
  } else if (diff < -50) {
    prevSlide();
  }
}

document.addEventListener("click", (e) => {
  createHeart(e.clientX, e.clientY);
});

function createHeart(x, y) {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = ["💖", "💕", "💗", "💘", "❤️"][Math.floor(Math.random() * 5)];

  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  document.getElementById("heart-container").appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1400);
}
