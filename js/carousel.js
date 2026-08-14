(function() {
    'use strict';

    // ===== KONFIGURÁCIA KARUSELU =====
    const CAROUSEL_CONFIG = {
        itemsPerViewDesktop: 7,   // pre 7 systémov na desktopi vidieť všetky naraz
        itemsPerViewTablet: 3,    // na tablete 3 karty
        itemsPerViewMobile: 1,    // na mobile 1 karta
        transitionDuration: 500,
        swipeThreshold: 30,
        autoplayInterval: 8000
    };

    let carousel = document.querySelector('[data-hm-carousel]');
    if (!carousel) return;

    let track = carousel.querySelector('.hm-track');
    let prevBtn = carousel.querySelector('.hm-prev');
    let nextBtn = carousel.querySelector('.hm-next');
    let dotsContainer = carousel.querySelector('.hm-dots');

    if (!track) return;

    let currentIndex = 0;
    let items = [];
    let itemsPerView = 4;
    let totalSlides = 0;
    let isAnimating = false;
    let autoplayTimer = null;

    function init() {
        items = Array.from(track.querySelectorAll('.hm-card'));
        if (items.length === 0) return;
        updateItemsPerView();
        renderDots();
        updateCarousel(false);
        setupAutoplay();
    }

    function updateItemsPerView() {
        const width = window.innerWidth;
        if (width <= 768) {
            itemsPerView = CAROUSEL_CONFIG.itemsPerViewMobile;
        } else if (width <= 1024) {
            itemsPerView = CAROUSEL_CONFIG.itemsPerViewTablet;
        } else {
            itemsPerView = CAROUSEL_CONFIG.itemsPerViewDesktop;
        }
        totalSlides = Math.ceil(items.length / itemsPerView);
        if (currentIndex >= totalSlides) {
            currentIndex = Math.max(0, totalSlides - 1);
        }
    }

    function renderDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'hm-dot' + (i === currentIndex ? ' active' : '');
            dot.setAttribute('aria-label', 'Prejsť na systém ' + (i + 1));
            dot.addEventListener('click', function(e) {
                e.stopPropagation();
                goToSlide(i);
                resetAutoplay();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateCarousel(animate = true) {
        if (!animate) {
            track.style.transition = 'none';
        } else {
            track.style.transition = 'transform ' + CAROUSEL_CONFIG.transitionDuration + 'ms cubic-bezier(0.34, 1.4, 0.64, 1)';
        }

        const slideWidth = 100 / itemsPerView;
        const offset = -currentIndex * slideWidth;
        track.style.transform = 'translateX(' + offset + '%)';

        if (!animate) {
            void track.offsetHeight;
            track.style.transition = 'transform ' + CAROUSEL_CONFIG.transitionDuration + 'ms cubic-bezier(0.34, 1.4, 0.64, 1)';
        }

        updateDots();
        updateArrows();
    }

    function updateDots() {
        if (!dotsContainer) return;
        const dots = dotsContainer.querySelectorAll('.hm-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function updateArrows() {
        if (prevBtn) {
            prevBtn.style.opacity = '1';
            prevBtn.style.pointerEvents = 'auto';
        }
        if (nextBtn) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
        }
    }

    function goToSlide(index) {
        if (isAnimating) return;
        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;
        if (index === currentIndex) return;

        isAnimating = true;
        currentIndex = index;
        updateCarousel(true);

        setTimeout(function() {
            isAnimating = false;
        }, CAROUSEL_CONFIG.transitionDuration + 50);
    }

    function nextSlide() {
        if (isAnimating) return;
        if (currentIndex >= totalSlides - 1) return;
        goToSlide(currentIndex + 1);
        resetAutoplay();
    }

    function prevSlide() {
        if (isAnimating) return;
        if (currentIndex <= 0) return;
        goToSlide(currentIndex - 1);
        resetAutoplay();
    }

    function setupAutoplay() {
        if (CAROUSEL_CONFIG.autoplayInterval > 0 && totalSlides > 1) {
            clearInterval(autoplayTimer);
            autoplayTimer = setInterval(function() {
                nextSlide();
            }, CAROUSEL_CONFIG.autoplayInterval);
        }
    }

    function resetAutoplay() {
        if (CAROUSEL_CONFIG.autoplayInterval > 0) {
            clearInterval(autoplayTimer);
            setupAutoplay();
        }
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', function(e) { e.stopPropagation(); nextSlide(); });
    if (prevBtn) prevBtn.addEventListener('click', function(e) { e.stopPropagation(); prevSlide(); });

    // Keyboard support
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            nextSlide();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            prevSlide();
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;

    carousel.addEventListener('touchstart', function(e) {
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        isSwiping = true;
    }, { passive: true });

    carousel.addEventListener('touchmove', function(e) {
        if (!isSwiping) return;
        const touch = e.touches[0];
        const diffX = touch.clientX - touchStartX;
        const diffY = touch.clientY - touchStartY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > CAROUSEL_CONFIG.swipeThreshold) {
            e.preventDefault();
            if (diffX < 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            isSwiping = false;
        }
    }, { passive: false });

    carousel.addEventListener('touchend', function() {
        isSwiping = false;
    }, { passive: true });

    // Resize handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            const oldPerView = itemsPerView;
            updateItemsPerView();
            if (oldPerView !== itemsPerView) {
                renderDots();
                updateCarousel(false);
                setupAutoplay();
            }
        }, 200);
    });

    // Refresh metóda
    function refresh() {
        items = Array.from(track.querySelectorAll('.hm-card'));
        if (items.length === 0) return;
        updateItemsPerView();
        renderDots();
        updateCarousel(false);
        setupAutoplay();
    }

    init();

    window.__hmCarousel = {
        goToSlide: goToSlide,
        next: nextSlide,
        prev: prevSlide,
        currentIndex: function() { return currentIndex; },
        totalSlides: function() { return totalSlides; },
        refresh: refresh,
        config: CAROUSEL_CONFIG
    };

    document.addEventListener('hm-carousel-update', function() {
        refresh();
    });

})();
