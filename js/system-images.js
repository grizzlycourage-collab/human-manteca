window.HM_SYSTEM_IMAGES = {
  'anatomia-tiena': 'images/anatomia-tiena.png',
  'emocny-kompas': 'images/emocny-kompas.png',
  'vztahovy-kompas': 'images/vztahovy-kompas.png',
  'integrita-navigacia': 'images/integrita-navigacia.png',
  'live-core-moon': 'images/live-core-moon.png',
  'nebesky-kompas': 'images/nebesky-kompas.png',
  'zrkadlo-bytia': 'images/zrkadlo-bytia.png'
};

window.HM_ASSIGN_SYSTEM_IMAGES = function () {
  const cards = document.querySelectorAll('.hm-card[data-system-key]');
  cards.forEach((card) => {
    const key = card.dataset.systemKey;
    const img = card.querySelector('img');
    const fallback = card.querySelector('.hm-fallback-icon');
    if (!img || !key) return;

    const src = window.HM_SYSTEM_IMAGES[key] || '';
    img.src = src;

    if (!src) {
      if (fallback) fallback.style.display = 'flex';
      return;
    }

    img.onerror = function () {
      img.style.display = 'none';
      if (fallback) fallback.style.display = 'flex';
    };
    img.onload = function () {
      img.style.display = 'block';
      if (fallback) fallback.style.display = 'none';
    };
  });
};

function assignHmSystemImages() {
  if (typeof window.HM_ASSIGN_SYSTEM_IMAGES === 'function') {
    window.HM_ASSIGN_SYSTEM_IMAGES();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', assignHmSystemImages, { once: true });
} else {
  assignHmSystemImages();
}

window.addEventListener('load', assignHmSystemImages, { once: true });
