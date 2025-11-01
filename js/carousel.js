// js/carousel.js
class Carousel {
    constructor(container, options = {}) {
        this.container = container;
        this.track = container.querySelector('.carousel-track');
        this.items = Array.from(this.track.children);
        this.prevBtn = container.querySelector('.carousel-prev');
        this.nextBtn = container.querySelector('.carousel-next');
        this.indicatorsContainer = container.querySelector('.carousel-indicators');
        
        this.options = {
            autoplay: true,
            interval: 4000,
            drag: true,
            loop: true,
            itemsPerView: this.getInitialItemsPerView(),
            ...options
        };
        
        // Force LTR behavior regardless of document direction
        this.isRTL = false; // Always use LTR behavior
        
        // Initialize state
        this.currentIndex = 0;
        this.isDragging = false;
        this.startPos = 0;
        this.currentTranslate = 0;
        this.prevTranslate = 0;
        this.autoplayInterval = null;
        
        // Calculate responsive values
        this.calculateResponsiveValues();
        
        // Store instance for destruction
        this.container.carouselInstance = this;
        
        this.init();
        this.setupResizeListener();
    }
    
    getInitialItemsPerView() {
        if (this.container.classList.contains('reviews-slider')) {
            return 1;
        }
        
        // Default to 3 for desktop, will be updated on resize
        return window.innerWidth >= 1024 ? 3 : 
               window.innerWidth >= 768 ? 2 : 1;
    }
    
    calculateResponsiveValues() {
        // Update itemsPerView based on screen size
        if (this.container.classList.contains('reviews-slider')) {
            this.itemsPerView = 1;
        } else {
            this.itemsPerView = this.getInitialItemsPerView();
            // Calculate max index
            this.maxIndex = Math.max(0, this.items.length - this.itemsPerView);
            
            // Calculate item width including gap
            const containerRect = this.container.getBoundingClientRect();
            const gap = 32; // 2rem gap in pixels
            
            this.itemWidth = (containerRect.width - (gap * (this.itemsPerView - 1))) / this.itemsPerView;
            console.log('Item Width:', this.itemWidth);
            // Set item widths
            this.items.forEach(item => {
                item.style.width = `${this.itemWidth}px`;
                item.style.flexShrink = '0';
            });
            
        }
        // Set initial position
        this.setInitialPosition();
        
        // Update indicators
        this.createIndicators();
        
    }
    
    setupResizeListener() {
        this.resizeHandler = this.handleResize.bind(this);
        window.addEventListener('resize', this.resizeHandler);
    }
    
    handleResize() {
        // Debounce resize events
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            const oldItemsPerView = this.itemsPerView;
            this.calculateResponsiveValues();
            
            // If items per view changed, reset to first slide
            if (oldItemsPerView !== this.itemsPerView) {
                this.currentIndex = 0;
                this.updateCarousel();
            }
        }, 250);
    }
    
    setInitialPosition() {
        this.currentIndex = 0;
        this.currentTranslate = this.calculateTranslate(this.currentIndex);
        this.prevTranslate = this.currentTranslate;
        this.setSliderPosition();
    }
    
    calculateTranslate(index) {
        // Always use negative translation for movement (consistent LTR behavior)
        const gap = 32; // 2rem gap in pixels
        return -index * (this.itemWidth + gap);
    }
    
    init() {
        this.createIndicators();
        this.setupEventListeners();
        this.updateCarousel();
        
        if (this.options.autoplay && this.container.classList.contains('reviews-slider') === false) {
            this.startAutoplay();
        }
    }
    
    createIndicators() {
        if (!this.indicatorsContainer) return;
        
        this.indicatorsContainer.innerHTML = '';
        const indicatorCount = Math.max(1, this.maxIndex + 1);
        
        for (let i = 0; i < indicatorCount; i++) {
            const indicator = document.createElement('div');
            indicator.className = `carousel-indicator ${i === this.currentIndex ? 'active' : ''}`;
            indicator.addEventListener('click', () => this.goToSlide(i));
            this.indicatorsContainer.appendChild(indicator);
        }
    }
    
    setupEventListeners() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prev();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.next();
            });
        }
        
        // Mouse drag events
        if (this.options.drag) {
            this.track.addEventListener('mousedown', this.dragStart.bind(this));
            this.track.addEventListener('touchstart', this.dragStart.bind(this), { passive: false });
            
            this.track.addEventListener('mousemove', this.drag.bind(this));
            this.track.addEventListener('touchmove', this.drag.bind(this), { passive: false });
            
            this.track.addEventListener('mouseup', this.dragEnd.bind(this));
            this.track.addEventListener('touchend', this.dragEnd.bind(this));
            this.track.addEventListener('mouseleave', this.dragEnd.bind(this));
        }
        
        // Pause autoplay on hover
        if (this.options.autoplay) {
            this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
            this.container.addEventListener('mouseleave', () => this.resumeAutoplay());
        }
    }
    
    dragStart(e) {
        e.preventDefault();
        if (this.options.autoplay) {
            this.pauseAutoplay();
        }
        
        this.isDragging = true;
        this.startPos = this.getPositionX(e);
        this.track.style.cursor = 'grabbing';
        this.track.style.transition = 'none';
        this.prevTranslate = this.currentTranslate;
    }
    
    drag(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        
        const currentPosition = this.getPositionX(e);
        const diff = currentPosition - this.startPos;
        
        // Use diff directly for consistent LTR behavior
        this.currentTranslate = this.prevTranslate + diff;
        this.setSliderPosition();
    }
    
    dragEnd() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.track.style.cursor = 'grab';
        this.track.style.transition = 'transform 0.5s ease';
        
        const movedBy = this.currentTranslate - this.prevTranslate;
        const threshold = this.itemWidth * 0.2;
        
        // Determine slide change based on drag distance
        if (Math.abs(movedBy) > threshold) {
            if (movedBy > 0) {
                this.prev();
            } else {
                this.next();
            }
        } else {
            this.updateCarousel();
        }
        
        if (this.options.autoplay) {
            this.resumeAutoplay();
        }
    }
    
    getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }
    
    setSliderPosition() {
        this.track.style.transform = `translateX(${this.currentTranslate}px)`;
    }
    
    next() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
        } else if (this.options.loop) {
            this.currentIndex = 0;
        }
        this.updateCarousel();
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else if (this.options.loop) {
            this.currentIndex = this.maxIndex;
        }
        this.updateCarousel();
    }
    
    goToSlide(index) {
        if (index >= 0 && index <= this.maxIndex) {
            this.currentIndex = index;
            this.updateCarousel();
        }
    }
    
    updateCarousel() {
        // Calculate translation
        this.currentTranslate = this.calculateTranslate(this.currentIndex);
        this.prevTranslate = this.currentTranslate;
        
        this.setSliderPosition();
        
        // Update indicators
        if (this.indicatorsContainer) {
            const indicators = this.indicatorsContainer.querySelectorAll('.carousel-indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentIndex);
            });
        }
        
        // Update button states
        if (this.prevBtn) {
            this.prevBtn.disabled = !this.options.loop && this.currentIndex <= 0;
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = !this.options.loop && this.currentIndex >= this.maxIndex;
        }
    }
    
    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            if (this.currentIndex < this.maxIndex) {
                this.next();
            } else if (this.options.loop) {
                this.currentIndex = 0;
                this.updateCarousel();
            }
        }, this.options.interval);
    }
    
    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    resumeAutoplay() {
        if (this.options.autoplay && !this.autoplayInterval) {
            this.startAutoplay();
        }
    }
    
    destroy() {
        this.pauseAutoplay();
        
        // Remove event listeners
        if (this.prevBtn) {
            this.prevBtn.replaceWith(this.prevBtn.cloneNode(true));
        }
        if (this.nextBtn) {
            this.nextBtn.replaceWith(this.nextBtn.cloneNode(true));
        }
        
        // Remove resize listener
        window.removeEventListener('resize', this.resizeHandler);
        
        // Remove all other event listeners
        const events = ['mousedown', 'touchstart', 'mousemove', 'touchmove', 'mouseup', 'touchend', 'mouseleave'];
        events.forEach(event => {
            this.track.removeEventListener(event, this[`drag${event.charAt(0).toUpperCase() + event.slice(1)}`]);
        });
        
        this.container.removeEventListener('mouseenter', this.pauseAutoplay);
        this.container.removeEventListener('mouseleave', this.resumeAutoplay);
        
        // Reset transform
        this.track.style.transform = 'translateX(0)';
        
        delete this.container.carouselInstance;
    }
}

// Initialize carousels
function initializeCarousels() {
    // Hospitals and Doctors carousels - responsive items per view
    const standardCarousels = document.querySelectorAll('.hospitals-carousel, .doctors-carousel');
    
    standardCarousels.forEach(container => {
        if (container.carouselInstance) {
            container.carouselInstance.destroy();
        }
        
        new Carousel(container, {
            autoplay: true,
            interval: 4000,
            drag: true,
            loop: true,
            itemsPerView: window.innerWidth >= 1024 ? 3 : 
                         window.innerWidth >= 768 ? 2 : 1
        });
    });
    
    // Reviews as slider (single item, no autoplay)
    const reviewSlider = document.querySelector('.reviews-slider');
    if (reviewSlider) {
        if (reviewSlider.carouselInstance) {
            reviewSlider.carouselInstance.destroy();
        }
        
        new Carousel(reviewSlider, {
            autoplay: false,
            drag: true,
            loop: false,
            itemsPerView: 1
        });
    }
}
