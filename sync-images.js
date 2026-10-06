const fs = require('fs');

let content = fs.readFileSync('fix-scrolling.html', 'utf8');

// The structure is:
// <!-- Testimonial X -->
// ...
// <div class="pu-tours-voices-card-image-side ...">
//   <img src="URL" ...>
// ...
// <div class="pu-tours-voices-mobile-card-image ...">
//   <img src="URL" ...>

const slides = content.split('<!-- Testimonial ');

for (let i = 1; i < slides.length; i++) {
    const slide = slides[i];
    
    // Find desktop image
    const desktopImageSection = slide.match(/class="pu-tours-voices-card-image-side[^>]*>[\s\S]*?<img src="([^"]+)"/);
    
    if (desktopImageSection && desktopImageSection[1]) {
        const desktopImageUrl = desktopImageSection[1];
        
        // Find and replace mobile image
        // Match the mobile image tag within this slide
        const mobileImgRegex = /(class="pu-tours-voices-mobile-card-image[^>]*>[\s\S]*?<img src=")([^"]+)(")/;
        
        slides[i] = slide.replace(mobileImgRegex, `$1${desktopImageUrl}$3`);
    }
}

const newContent = slides.join('<!-- Testimonial ');

fs.writeFileSync('fix-scrolling.html', newContent, 'utf8');
console.log('Success');
