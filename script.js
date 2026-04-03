document.addEventListener("DOMContentLoaded", () => {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true
    });
  }

  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: { value: 60 },
        size: { value: 3 },
        move: { speed: 1 },
        line_linked: { enable: false }
      }
    });
  }

  typeText();
  updateSlider();
});

const questionsData = [
  { question: "📍 فاكرة أول مرة اتقابلنا كانت فين؟" },
  { question: "🫶 امتى حسيتي أول مرة إنك حبيتيني؟" },
  { question: "😊 إيه أكتر ذكرى بينا بتضحكك لحد دلوقتي؟" },
  { question: "💭 لما تفتكري أيامنا القديمة... إيه أول حاجة بتيجي في بالك؟" },
  { question: "✨ بتحبي محمد القديم ولا محمد دلوقتي أكتر؟" },
  { question: "🌙 إيه أكتر وقت حسيتِ فيه إننا قريبين من بعض بجد؟" },
  { question: "💖 إيه أكتر حاجة كانت بتخليكي مبسوطة معايا؟" },
  { question: "🤍 لو نرجع لوقت من اللي فات... تختاري إمتى؟" }
];

let currentQuestion = 0;
let answers = [];
let musicStarted = false;

function displayQuestion() {
  const questionsContainer = document.getElementById("questions-container");
  questionsContainer.innerHTML = "";

  if (currentQuestion < questionsData.length) {
    const data = questionsData[currentQuestion];
    const questionDiv = document.createElement("div");
    questionDiv.className = "questionnaire-question";

    questionDiv.innerHTML = `
      <h3>${data.question}</h3>
      <textarea class="questionnaire-textarea" id="answer-input" placeholder="اكتبي إجابتك هنا..." onkeydown="handleAnswerInput(event)"></textarea>
    `;

    questionsContainer.appendChild(questionDiv);
    document.getElementById("answer-input").focus();

    const progress = ((currentQuestion + 1) / questionsData.length) * 100;
    document.getElementById("progress-fill").style.width = progress + "%";

    // Show/hide buttons based on current question
    const isLastQuestion = currentQuestion === questionsData.length - 1;
    const nextBtn = document.getElementById("next-btn");
    const submitBtn = document.getElementById("submit-btn");
    
    if (nextBtn) nextBtn.style.display = isLastQuestion ? "none" : "block";
    if (submitBtn) submitBtn.style.display = isLastQuestion ? "block" : "none";
  }
}

function handleAnswerInput(event) {
  if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
    moveToNextQuestion();
  }

  const input = document.getElementById("answer-input");
  if (input && input.value.trim()) {
    answers[currentQuestion] = {
      question: questionsData[currentQuestion].question,
      answer: input.value.trim()
    };
  }
}

function moveToNextQuestion() {
  const input = document.getElementById("answer-input");
  if (input && input.value.trim()) {
    answers[currentQuestion] = {
      question: questionsData[currentQuestion].question,
      answer: input.value.trim()
    };
    currentQuestion++;
    if (currentQuestion < questionsData.length) {
      displayQuestion();
    }
  }
}


function submitAnswers() {
  const input = document.getElementById("answer-input");
  if (input && input.value.trim()) {
    answers[currentQuestion] = {
      question: questionsData[currentQuestion].question,
      answer: input.value.trim()
    };
  }

  if (answers.length === questionsData.length) {
    saveResponsesToFile();
    showThankYou();
  } else {
    Swal.fire({
      title: "Hold on!",
      text: "Please answer all questions first 💕",
      icon: "warning",
      confirmButtonText: "Got it!"
    });
  }
}

function saveResponsesToFile() {
  const timestamp = new Date().toISOString();
  const fileData = {
    timestamp: timestamp,
    responses: answers
  };

  const jsonString = JSON.stringify(fileData, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `questionnaire_responses_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function showThankYou() {
  document.getElementById("questionnaire-questions").style.display = "none";
  document.getElementById("questionnaire-results").style.display = "block";
}

function playMusic() {
  const music = document.getElementById("bg-music");
  if (music) music.play().catch(() => {});
}

const text = "I didn't just make a website… I made this for you 💌";
const typedEl = document.getElementById("typed");
let textIndex = 0;

function typeText() {
  if (!typedEl) return;

  if (textIndex < text.length) {
    typedEl.textContent += text.charAt(textIndex);
    textIndex++;
    setTimeout(typeText, 55);
  }
}

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentSlideIndex = 0;
let startX = 0;
let endX = 0;
function openQuestionnaire() {
  const modal = document.getElementById("questionnaire-modal");
  if (modal) {
    modal.classList.add("active");
  }
  playMusic();
}

function closeQuestionnaire() {
  const modal = document.getElementById("questionnaire-modal");
  if (modal) {
    modal.classList.remove("active");
  }

  currentQuestion = 0;
  answers = [];

  document.getElementById("questionnaire-intro").style.display = "block";
  document.getElementById("questionnaire-questions").style.display = "none";
  document.getElementById("questionnaire-results").style.display = "none";
}

function startQuestionnaire() {
  document.getElementById("questionnaire-intro").style.display = "none";
  document.getElementById("questionnaire-questions").style.display = "block";
  document.getElementById("questionnaire-results").style.display = "none";
  currentQuestion = 0;
  answers = [];
  displayQuestion();
}

function updateSlider() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentSlideIndex);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlideIndex);
  });
}

function nextSlide() {
  if (!slides.length) return;
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  updateSlider();
}

function prevSlide() {
  if (!slides.length) return;
  currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
  updateSlider();
}

function goToSlide(index) {
  currentSlideIndex = index;
  updateSlider();
}

const slider = document.getElementById("slider");

if (slider) {
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
}

function handleSwipe() {
  const diff = startX - endX;

  if (diff > 50) nextSlide();
  else if (diff < -50) prevSlide();
}

document.addEventListener("click", (e) => {
  createHeart(e.clientX, e.clientY);
});

function createHeart(x, y) {
  const container = document.getElementById("heart-container");
  if (!container) return;

  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = ["💖", "💕", "💗", "💘", "❤️"][Math.floor(Math.random() * 5)];

  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  container.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1400);
}