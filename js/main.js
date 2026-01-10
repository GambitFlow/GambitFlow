// Main Application Entry Point
$(document).ready(function() {
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
    });
    
    // Close mobile menu on link click
    $('.nav-link').on('click', function() {
        $('#navLinks').removeClass('active');
    });
    
    // Start status monitoring
    StatusMonitor.startMonitoring(60000);
    
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
    
    console.log('GambitFlow initialized successfully');
});