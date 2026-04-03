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
