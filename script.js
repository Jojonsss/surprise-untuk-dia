const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openBtn");
const surpriseContent = document.getElementById("surpriseContent");
const bgMusic = document.getElementById("bgMusic");

let isOpen = false;

function openSurprise() {
  if (isOpen) return;
  isOpen = true;

  envelope.classList.add("open");
  openBtn.textContent = "Surprise Dibuka 💖";

  setTimeout(() => {
    surpriseContent.classList.remove("hidden");
    try {
      bgMusic.play();
    } catch (e) {}
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  }, 950);
}

openBtn.addEventListener("click", openSurprise);
envelope.addEventListener("click", openSurprise);

// slider
const slides = document.getElementById("slides");
const images = slides.querySelectorAll("img");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsWrap = document.getElementById("dots");

let currentIndex = 0;
let autoSlide;

images.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.className = "dot" + (index === 0 ? " active" : "");
  dot.addEventListener("click", () => goToSlide(index));
  dotsWrap.appendChild(dot);
});

function updateSlider() {
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = index;
  updateSlider();
  resetAutoSlide();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateSlider();
}

nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoSlide();
});

function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 3500);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

startAutoSlide();

// floating hearts
const heartsContainer = document.getElementById("hearts");

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.5 ? "❤" : "♡";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 16 + Math.random() * 24 + "px";
  heart.style.animationDuration = 5 + Math.random() * 6 + "s";
  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 11000);
}

setInterval(createHeart, 420);
