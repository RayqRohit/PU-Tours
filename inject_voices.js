const fs = require('fs');

const indexHtmlPath = 'index.html';
const styleCssPath = 'assets/css/style.css';
const newCssPath = 'pierc-voice.css';

// 1. Append CSS
const newCss = fs.readFileSync(newCssPath, 'utf8');
let styleCss = fs.readFileSync(styleCssPath, 'utf8');
if (!styleCss.includes('.voices-section')) {
    styleCss += '\n\n/* ============ VOICES SECTION ============ */\n' + newCss;
    fs.writeFileSync(styleCssPath, styleCss, 'utf8');
    console.log('Appended CSS to style.css');
}

// 2. Generate HTML
const htmlBlock = `
    <!-- Voices Section -->
    <section class="voices-section py-4 py-md-5 position-relative overflow-hidden">
        <div class="container py-2 py-md-4">
            
            <!-- Header Part -->
            <div class="row align-items-center mb-4 mb-md-5 position-relative">
                <div class="col-lg-8 position-relative z-1">
                    <span class="voices-tagline fw-bold d-block mb-1">Voices</span>
                    <h2 class="voices-title fw-bold mb-2">What founders and <span class="text-accent">guests say</span></h2>
                    <p class="voices-subtitle text-muted mb-0">Testimonials from startups, mentors and event guests.</p>
                </div>
                <!-- Large Watermark Quote Icon (Desktop Only) -->
                <div class="bg-quote-icon d-none d-lg-block position-absolute end-0 top-50 translate-middle-y z-0 text-end pe-0" style="width: auto;">
                    <img src="https://www.paruluniversity.ac.in/wp-content/uploads/2026/09/voices-research.svg" alt="Voices Quote" style="height: 160px; width: auto; opacity: 0.3;">
                </div>
            </div>

            <!-- Testimonial Slick Slider -->
            <div class="voices-slick-wrapper">
                <div class="voices-slider">
                    
                    <!-- Slide 1 -->
                    <div class="slick-slide-item px-3">
                        <!-- DESKTOP CARD DESIGN -->
                        <div class="testimonial-card-desktop d-none d-md-flex flex-row rounded-4 overflow-hidden shadow-sm h-100">
                            <!-- Left Dark Content Side -->
                            <div class="card-content-side p-4 p-xl-5 d-flex flex-column">
                                <div class="d-flex flex-column justify-content-center flex-grow-1">
                                    <div class="quote-mark mb-4">
                                        <svg width="32" height="28" viewBox="0 0 24 24" fill="#FF2B56">
                                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                                        </svg>
                                    </div>
                                    <h3 class="card-highlight-title mb-4">From an <span style="color:#ffc107">Idea</span> to a <span style="color:#ffc107">Sustainable Venture</span></h3>
                                    <p class="card-quote-text mb-0">PIERC acts as a vital launchpad for aspiring business leaders. It provides structured training, one-on-one mentorship, and essential legal compliance support.</p>
                                </div>
                                <!-- Footer: Stars & LinkedIn -->
                                <div class="d-flex align-items-center justify-content-between mt-4 pt-2">
                                    <div class="card-rating text-warning fs-5">
                                        <i class="bi bi-star-fill me-1"></i><i class="bi bi-star-fill me-1"></i><i class="bi bi-star-fill me-1"></i><i class="bi bi-star-fill me-1"></i><i class="bi bi-star-fill me-1"></i>
                                    </div>
                                    <a href="#" target="_blank" rel="noopener noreferrer" class="ms-3 transition-opacity hover-opacity-75">
                                        <img src="https://www.paruluniversity.ac.in/wp-content/uploads/2026/09/linkedin-icon.svg" alt="LinkedIn" width="28" height="28">
                                    </a>
                                </div>
                            </div>
                            <!-- Right Image Banner Side -->
                            <div class="card-image-side position-relative overflow-hidden">
                                <img src="https://img.youtube.com/vi/jv2_dqg1wss/maxresdefault.jpg" alt="Guest" class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover">
                            </div>
                        </div>

                        <!-- MOBILE CARD DESIGN -->
                        <div class="testimonial-card-mobile d-flex d-md-none flex-column rounded-4 overflow-hidden shadow-sm bg-white h-100">
                            <!-- Top Image Banner -->
                            <div class="mobile-card-image position-relative overflow-hidden">
                                <img src="https://img.youtube.com/vi/jv2_dqg1wss/maxresdefault.jpg" alt="Guest" class="w-100 h-100 object-fit-cover">
                            </div>
                            <!-- Bottom White Content Area -->
                            <div class="mobile-card-content p-4 d-flex flex-column justify-content-between flex-grow-1">
                                <p class="mobile-quote-text mb-3">PIERC acts as a vital launchpad for aspiring business leaders. It provides structured training, one-on-one mentorship, and essential legal compliance support.</p>
                                <div class="d-flex align-items-center justify-content-between mt-auto">
                                    <div class="card-rating d-flex flex-row gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFC107" class="me-1" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFC107" class="me-1" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFC107" class="me-1" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFC107" class="me-1" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFC107" class="me-1" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                    </div>
                                    <a href="#" target="_blank" rel="noopener noreferrer" class="ms-3">
                                        <img src="https://www.paruluniversity.ac.in/wp-content/uploads/2026/09/linkedin-icon.svg" alt="LinkedIn" width="24" height="24">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Slide 2 -->
                    <div class="slick-slide-item px-3">
                        <!-- DESKTOP CARD DESIGN -->
                        <div class="testimonial-card-desktop d-none d-md-flex flex-row rounded-4 overflow-hidden shadow-sm h-100">
                            <!-- Left Dark Content Side -->
                            <div class="card-content-side p-4 p-xl-5 d-flex flex-column">
                                <div class="d-flex flex-column justify-content-center flex-grow-1">
                                    <div class="quote-mark mb-4">
                                        <svg width="32" height="28" viewBox="0 0 24 24" fill="#FF2B56">
                                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                                        </svg>
                                    </div>
                                    <h3 class="card-highlight-title mb-4">From <span style="color:#ffc107">Seed to Scale</span></h3>
                                    <p class="card-quote-text mb-0">Through PIERC at Parul University, I learned how real businesses are created. Validating assumptions and design revenue models completely shifted my perspective.</p>
                                </div>
                                <!-- Footer: Stars & LinkedIn -->
                                <div class="d-flex align-items-center justify-content-between mt-4 pt-2">
                                    <div class="card-rating text-warning fs-5">
                                        <i class="bi bi-star-fill me-1"></i><i class="bi bi-star-fill me-1"></i><i class="bi bi-star-fill me-1"></i><i class="bi bi-star-fill me-1"></i><i class="bi bi-star-fill me-1"></i>
                                    </div>
                                    <a href="#" target="_blank" rel="noopener noreferrer" class="ms-3 transition-opacity hover-opacity-75">
                                        <img src="https://www.paruluniversity.ac.in/wp-content/uploads/2026/09/linkedin-icon.svg" alt="LinkedIn" width="28" height="28">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- DESKTOP SLIDER CONTROLS (Progress Line + Arrows) -->
                <div class="slider-controls-wrapper d-none d-md-flex align-items-center justify-content-between mt-4 mt-md-5">
                    <div class="slick-custom-progress">
                        <div class="slick-progress-bar"></div>
                    </div>
                    <div class="slider-arrows d-flex align-items-center gap-2 ms-4">
                        <button class="btn btn-slider-prev rounded-circle" type="button"><i class="bi bi-chevron-left"></i></button>
                        <button class="btn btn-slider-next rounded-circle" type="button"><i class="bi bi-chevron-right"></i></button>
                    </div>
                </div>
            </div>

        </div>
    </section>
`;

let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Insert after the Video Exposure Section
if (!indexHtml.includes('voices-section')) {
    const insertPoint = indexHtml.indexOf('<!-- Footer -->');
    if (insertPoint !== -1) {
        indexHtml = indexHtml.slice(0, insertPoint) + htmlBlock + '\n' + indexHtml.slice(insertPoint);
        fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
        console.log('Injected HTML block into index.html');
    }
}

// 3. Append JS from the script tag
let jsContent = \`
    function initVoicesSlider() {
        if (typeof jQuery !== 'undefined' && jQuery.fn.slick) {
            var $ = jQuery;
            
            $('.voices-slider').each(function() {
                var $slider = $(this);
                var $wrapper = $slider.closest('.voices-slick-wrapper');
                var $progressBar = $wrapper.find('.slick-progress-bar');

                if (!$slider.hasClass('slick-initialized')) {

                    var slideCount = $slider.children().length;
                    if (slideCount === 1) {
                        $slider.append($slider.children().clone());
                        $slider.append($slider.children().clone());
                        $slider.append($slider.children().clone());
                    } else if (slideCount === 2) {
                        $slider.append($slider.children().clone());
                    }

                    function updateProgressBar(slick, currentSlide) {
                        if (slick.slideCount > 0) {
                            const calcProgress = ((currentSlide + 1) / slick.slideCount) * 100;
                            $progressBar.css('width', calcProgress + '%');
                        }
                    }

                    // Instagram-style dynamic dots recalculation
                    function updateInstagramDots(slick, currentSlide) {
						var $dots = $slider.find('.slick-dots li');
						var totalDots = $dots.length;
						var maxVisible = 5;

						$dots.removeClass('dot-near dot-far');

						if (totalDots <= maxVisible) {
							$dots.css('transform', 'translateX(0px)');
							return;
						}

						var translateIndex = 0;

						if (currentSlide <= 2) {
							translateIndex = 0;
						} else if (currentSlide >= totalDots - 3) {
							translateIndex = totalDots - maxVisible;
						} else {
							translateIndex = currentSlide - 2;
						}

						// 8px dot width + 6px gap = 14px step offset
						var moveAmount = translateIndex * 14; 
						$dots.css('transform', 'translateX(-' + moveAmount + 'px)');

						// Apply scaling classes for smooth transitions
						$dots.each(function(index) {
							var distance = Math.abs(index - currentSlide);
							if (distance === 2) {
								$(this).addClass('dot-near');
							} else if (distance >= 3) {
								$(this).addClass('dot-far');
							}
						});
					}

                    $slider.on('init', function (event, slick) {
                        updateProgressBar(slick, 0);
                        updateInstagramDots(slick, 0);
                    });

                    $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                        updateProgressBar(slick, nextSlide);
                        updateInstagramDots(slick, nextSlide);
                    });

                    $slider.slick({
                        slidesToShow: 1.5,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 5000,
                        infinite: false,
                        arrows: true,
                        prevArrow: $wrapper.find('.btn-slider-prev'),
                        nextArrow: $wrapper.find('.btn-slider-next'),
                        dots: false,
                        responsive: [
                            {
                                breakpoint: 1200,
                                settings: {
                                    slidesToShow: 1.5
                                }
                            },
                            {
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 1.2
                                }
                            },
                            {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 1.05,
                                    arrows: false,
                                    dots: true
                                }
                            }
                        ]
                    });
                }
            });
        } else {
            setTimeout(initVoicesSlider, 50);
        }
    }

    initVoicesSlider();
\`;

let scriptJsPath = 'assets/js/script.js';
let scriptJs = fs.readFileSync(scriptJsPath, 'utf8');
if (!scriptJs.includes('initVoicesSlider')) {
    scriptJs += '\\n\\n$(document).ready(function() {' + jsContent + '});\\n';
    fs.writeFileSync(scriptJsPath, scriptJs, 'utf8');
    console.log('Appended JS to script.js');
}
