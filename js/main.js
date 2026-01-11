// Main Application Entry Point
$(document).ready(function() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // Initialize marked.js options
    if (typeof marked !== 'undefined') {
        marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: true,
            highlight: function(code, lang) {
                return code;
            }
        });
    }
    
    // Initialize routing
    const initRoute = window.location.hash.substring(1) || 'home';
    Router.navigate(initRoute);
    
    // Handle hash changes (browser back/forward)
    $(window).on('hashchange', function() {
        const page = window.location.hash.substring(1) || 'home';
        Router.navigate(page);
    });
    
    // Handle navigation clicks
    $('.nav-link').on('click', function(e) {
        e.preventDefault();
        const page = $(this).data('page');
        Router.navigate(page);
    });
    
    // Mobile menu toggle
    $('#mobileMenuBtn').on('click', function() {
        $('#navLinks').toggleClass('active');
        $(this).toggleClass('active');
    });
    
    // Close mobile menu on link click
    $('.nav-link').on('click', function() {
        $('#navLinks').removeClass('active');
        $('#mobileMenuBtn').removeClass('active');
    });
    
    // Close mobile menu on outside click
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.navbar').length) {
            $('#navLinks').removeClass('active');
            $('#mobileMenuBtn').removeClass('active');
        }
    });
    
    // Start status monitoring (check every 2 minutes)
    StatusMonitor.startMonitoring(120000);
    
    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 600);
        }
    });
    
    // Add scroll effect to navbar
    let lastScroll = 0;
    $(window).on('scroll', function() {
        const currentScroll = $(this).scrollTop();
        
        if (currentScroll > 100) {
            $('.navbar').css({
                'background': 'rgba(10, 10, 15, 0.98)',
                'box-shadow': '0 4px 30px rgba(0, 0, 0, 0.5)'
            });
        } else {
            $('.navbar').css({
                'background': 'rgba(10, 10, 15, 0.95)',
                'box-shadow': '0 4px 20px rgba(0, 0, 0, 0.3)'
            });
        }
        
        lastScroll = currentScroll;
    });
    
    // Keyboard shortcuts
    $(document).on('keydown', function(e) {
        // Ctrl/Cmd + K: Focus search (if implemented)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            // Focus search functionality
        }
        
        // ESC: Close modals
        if (e.key === 'Escape') {
            $('.color-selection-modal').removeClass('active');
        }
    });
    
    // Add ripple effect to buttons
    $(document).on('click', '.btn', function(e) {
        const btn = $(this);
        const ripple = $('<span class="ripple"></span>');
        
        const diameter = Math.max(btn.width(), btn.height());
        const radius = diameter / 2;
        
        ripple.css({
            width: diameter,
            height: diameter,
            left: e.pageX - btn.offset().left - radius,
            top: e.pageY - btn.offset().top - radius
        });
        
        btn.append(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
    
    // Performance monitoring
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', function() {
            const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                           window.performance.timing.navigationStart;
            console.log(`⚡ Page loaded in ${loadTime}ms`);
        });
    }
    
    // Service Worker registration (if available)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // Uncomment to enable service worker
            // navigator.serviceWorker.register('/sw.js');
        });
    }
    
    // Add custom cursor effects on cards
    $(document).on('mouseenter', '.card', function(e) {
        $(this).css('--mouse-x', e.pageX - $(this).offset().left);
        $(this).css('--mouse-y', e.pageY - $(this).offset().top);
    });
    
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Add animation classes on scroll
    const animateOnScroll = () => {
        $('.feature-card, .model-card, .status-card').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
    };
    
    $(window).on('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
    
    // Console welcome message
    console.log('%cGambitFlow Chess AI', 'font-size: 24px; font-weight: bold; color: #3b82f6;');
    console.log('%cPowered by Deep Learning Neural Networks', 'font-size: 14px; color: #06b6d4;');
    console.log('%c\nDeveloped with ❤️ for chess enthusiasts', 'font-size: 12px; color: #10b981;');
    console.log('\n🚀 System initialized successfully');
    
    // Error handling
    window.addEventListener('error', function(e) {
        console.error('Global error:', e.error);
    });
    
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
    });
    
    // Initialize GSAP animations if available
    if (typeof gsap !== 'undefined') {
        // Wait for DOM to be fully loaded
        setTimeout(() => {
            if ($('.hero-title').length) {
                gsap.from('.hero-title', {
                    duration: 1,
                    y: 50,
                    opacity: 0,
                    ease: 'power3.out'
                });
            }
            
            if ($('.hero-description').length) {
                gsap.from('.hero-description', {
                    duration: 1,
                    y: 30,
                    opacity: 0,
                    delay: 0.2,
                    ease: 'power3.out'
                });
            }
            
            if ($('.hero-actions').length) {
                gsap.from('.hero-actions', {
                    duration: 1,
                    y: 30,
                    opacity: 0,
                    delay: 0.4,
                    ease: 'power3.out'
                });
            }
        }, 100);
    }
    
    console.log('✅ GambitFlow initialized successfully');
});
