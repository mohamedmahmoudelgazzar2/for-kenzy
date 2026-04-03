AOS.init();

console.log("Script.js loaded! Starting initialization...");

// Questionnaire Data
const questionsData = [
  {
    question: "🎂 How old were you when we first met?",
    options: ["I don't remember", "You were much younger", "Same age as now", "You were wiser 😊"]
  },
  {
    question: "🌙 What time of day do you like being with me the most?",
    options: ["Morning - coffee talks", "Afternoon adventures", "Evening walks", "Late night conversations"]
  },
  {
    question: "🍕 What's your favorite food to share with me?",
    options: ["Pizza 🍕", "Ice cream 🍦", "Homemade meals", "Whatever you cook"]
  },
  {
    question: "📸 What's our best memory together?",
    options: ["Our first kiss", "Our first trip", "A random Tuesday", "Every moment with you"]
  },
  {
    question: "💕 What do you love most about me?",
    options: ["Your kindness", "Your humor", "Your eyes", "Your whole essence"]
  },
  {
    question: "🌟 Where do you see us in one year?",
    options: ["Still together, stronger", "Living together", "Married", "Forever by your side"]
  },
  {
    question: "💭 How many times a day do you think of me?",
    options: ["All the time", "Many times", "A few times", "More than I can count"]
  }
];

let currentQuestion = 0;
let answers = [];
let musicStarted = false;

// Auto-play music on first interaction
function initAutoMusic() {
  if (musicStarted) return;
  musicStarted = true;
  const music = document.getElementById("bg-music");
  music.volume = 0.3;
  music.play().catch(() => {
    // Auto-play was blocked, user will start it manually
  });
}

// Listen for first interaction
document.addEventListener('click', initAutoMusic, { once: true });
document.addEventListener('touchstart', initAutoMusic, { once: true });
document.addEventListener('scroll', initAutoMusic, { once: true });

// Show Love Function
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

// Questionnaire Functions
function openQuestionnaire() {
  console.log("openQuestionnaire called");
  const modal = document.getElementById("questionnaire-modal");
  console.log("modal element:", modal);
  if (modal) {
    modal.classList.add("active");
    console.log("active class added, modal classes:", modal.className);
  } else {
    console.error("Modal element not found!");
  }
  initAutoMusic();
}

function closeQuestionnaire() {
  const modal = document.getElementById("questionnaire-modal");
  modal.classList.remove("active");
  currentQuestion = 0;
  answers = [];
}

function startQuestionnaire() {
  document.getElementById("questionnaire-intro").style.display = "none";
  document.getElementById("questionnaire-questions").style.display = "block";
  displayQuestion();
}

function displayQuestion() {
  const questionsContainer = document.getElementById("questions-container");
  questionsContainer.innerHTML = "";
  
  if (currentQuestion < questionsData.length) {
    const data = questionsData[currentQuestion];
    const questionDiv = document.createElement("div");
    questionDiv.className = "questionnaire-question";
    
    questionDiv.innerHTML = `
      <h3>${data.question}</h3>
      <div class="questionnaire-options">
        ${data.options.map((option, index) => `
          <div class="questionnaire-option" onclick="selectAnswer(${index}, this)">
            ${option}
          </div>
        `).join("")}
      </div>
    `;
    
    questionsContainer.appendChild(questionDiv);
    
    // Update progress bar
    const progress = ((currentQuestion + 1) / questionsData.length) * 100;
    document.getElementById("progress-fill").style.width = progress + "%";
  }
}

function selectAnswer(index, element) {
  // Remove previous selection
  document.querySelectorAll(".questionnaire-option").forEach(opt => {
    opt.classList.remove("selected");
  });
  
  // Add selection to clicked option
  element.classList.add("selected");
  
  // Store answer
  answers[currentQuestion] = {
    question: questionsData[currentQuestion].question,
    answer: questionsData[currentQuestion].options[index]
  };
  
  // Move to next question after short delay
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questionsData.length) {
      displayQuestion();
    }
  }, 300);
}

function submitAnswers() {
  if (answers.length === questionsData.length) {
    showResults();
  } else {
    Swal.fire({
      title: "Hold on!",
      text: "Please answer all questions first 💕",
      icon: "warning",
      confirmButtonText: "Got it!"
    });
  }
}

function showResults() {
  document.getElementById("questionnaire-questions").style.display = "none";
  document.getElementById("questionnaire-results").style.display = "block";
  
  const resultsContainer = document.getElementById("results-container");
  resultsContainer.innerHTML = "";
  
  answers.forEach(answer => {
    const resultItem = document.createElement("div");
    resultItem.className = "result-item";
    resultItem.innerHTML = `
      <strong>${answer.question}</strong>
      <span>${answer.answer}</span>
    `;
    resultsContainer.appendChild(resultItem);
  });
}

function playMusic() {
  const music = document.getElementById("bg-music");
  music.play();
}

// Original Particles.js configuration
particlesJS("particles-js", {
  particles: {
    number: { value: 60 },
    size: { value: 3 },
    move: { speed: 1 },
    line_linked: { enable: false }
  }
});

// Typing effect
const text = "I didn't just make a website… I made this for you 💌";
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
  // Open questionnaire immediately without delay
  openQuestionnaire();
});

// Slider logic
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
// autoplay after first interaction
document.addEventListener("click", () => {
  const music = document.getElementById("bg-music");
  music.play().catch(() => {});
}, { once: true });

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
