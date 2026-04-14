const dots = document.querySelectorAll('.review-dot');
const reviewCards = document.querySelectorAll('.review-card');
let currentIndex = 0;

function showReview(index) {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  reviewCards.forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    showReview(currentIndex);
  });
});

// Auto-rotate every 2000ms
setInterval(() => {
  currentIndex = (currentIndex + 1) % dots.length;
  showReview(currentIndex);
}, 5000);
