const openBtn = document.getElementById("openBtn");
const envelope = document.getElementById("envelope");
const surpriseContent = document.getElementById("surpriseContent");
const bgMusic = document.getElementById("bgMusic");

const slides = document.getElementById("slides");
const dotsContainer = document.getElementById("dots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const slider = document.getElementById("slider");

const slideImages = ["foto1.jpeg", "foto2.jpeg", "foto3.jpeg"];

let currentIndex = 0;
let sliderInterval = null;
let surpriseOpened = false;

function createHearts() {
  const heartsContainer = document.getElementById("hearts");

  setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 18 + 16 + "px";
    heart.style.animationDuration = Math.random() * 4 + 4 + "s";
    heartsContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 8000);
  }, 500);
}

function renderDots() {
  dotsContainer.innerHTML = "";

  slideImages.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");

    if (index === currentIndex) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      currentIndex = index;
      updateSlider();
      restartAutoSlide();
    });

    dotsContainer.appendChild(dot);
  });
}

function updateSlider() {
  const sliderWidth = slider.offsetWidth;
  slides.style.transform = `translateX(-${currentIndex * sliderWidth}px)`;

  const allDots = document.querySelectorAll(".dot");
  allDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slideImages.length;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slideImages.length) % slideImages.length;
  updateSlider();
}

function startAutoSlide() {
  sliderInterval = setInterval(nextSlide, 3000);
}

function restartAutoSlide() {
  clearInterval(sliderInterval);
  startAutoSlide();
}

function openSurprise() {
  if (surpriseOpened) return;

  surpriseOpened = true;
  envelope.classList.add("opened");

  setTimeout(() => {
    surpriseContent.classList.remove("hidden");
    renderDots();
    updateSlider();
    startAutoSlide();

    bgMusic.play().catch(() => {
      console.log("Autoplay diblok browser, user bisa klik play manual.");
    });

    openBtn.textContent = "Surat Sudah Dibuka 🤍";
    openBtn.disabled = true;
  }, 850);
}

openBtn.addEventListener("click", openSurprise);

nextBtn.addEventListener("click", () => {
  nextSlide();
  restartAutoSlide();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  restartAutoSlide();
});

window.addEventListener("resize", updateSlider);

createHearts();
