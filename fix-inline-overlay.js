const fs = require('fs');

let content = fs.readFileSync('fix-scrolling.html', 'utf8');

// Replace the overlay div with one that has inline styles for the gradient and z-index
content = content.replace(
    /class="pu-tours-voices-card-img-overlay p-3 p-md-4 position-absolute bottom-0 start-0 w-100 text-white"/g,
    'class="pu-tours-voices-card-img-overlay p-3 p-md-4 position-absolute bottom-0 start-0 w-100 text-white" style="background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 100%); z-index: 2; padding-top: 80px;"'
);

// Replace the h5 to force white color
content = content.replace(
    /<h5 class="fw-bold mb-0 text-white">/g,
    '<h5 class="fw-bold mb-0 text-white" style="color: #ffffff !important;">'
);

// Replace the small text to force white color with some opacity
content = content.replace(
    /<small class="text-white-50 d-block">/g,
    '<small class="text-white-50 d-block" style="color: rgba(255, 255, 255, 0.75) !important;">'
);

// Also do it for the mobile card just in case
content = content.replace(
    /class="pu-tours-voices-mobile-img-overlay p-4 pt-5 position-absolute bottom-0 start-0 w-100 text-white"/g,
    'class="pu-tours-voices-mobile-img-overlay p-4 pt-5 position-absolute bottom-0 start-0 w-100 text-white" style="background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 100%); z-index: 2; padding-top: 80px;"'
);

content = content.replace(
    /<h4 class="fw-bold mb-1 text-white">/g,
    '<h4 class="fw-bold mb-1 text-white" style="color: #ffffff !important;">'
);

content = content.replace(
    /<div class="text-white opacity-75 d-block small">/g,
    '<div class="text-white opacity-75 d-block small" style="color: rgba(255, 255, 255, 0.75) !important;">'
);

fs.writeFileSync('fix-scrolling.html', content, 'utf8');
console.log('Fixed inline styles for overlays');
