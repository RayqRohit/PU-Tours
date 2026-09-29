<?php
$tagline      = get_sub_field('voices_tagline') ?: 'Voices';
$title        = get_sub_field('voices_title') ?: 'What founders and <span class="text-accent">guests say</span>';
$subtitle     = get_sub_field('voices_subtitle') ?: 'Testimonials from startups, mentors and event guests.';
$testimonials = get_sub_field('testimonials_list');
?>

<section class="voices-section py-4 py-md-5 position-relative overflow-hidden">
    <div class="container py-2 py-md-4">
        
        <!-- Header Part -->
        <div class="row align-items-center mb-4 mb-md-5 position-relative">
            <div class="col-lg-8 position-relative z-1">
                <span class="voices-tagline fw-bold d-block mb-1"><?php echo esc_html($tagline); ?></span>
                <h2 class="voices-title fw-bold mb-2"><?php echo $title; ?></h2>
                <p class="voices-subtitle text-muted mb-0"><?php echo esc_html($subtitle); ?></p>
            </div>
            <!-- Large Watermark Quote Icon (Desktop Only) -->
            <div class="bg-quote-icon d-none d-lg-block position-absolute end-0 top-50 translate-middle-y z-0 text-end pe-0" style="width: auto;">
                <img src="https://www.paruluniversity.ac.in/wp-content/uploads/2026/09/voices-research.svg" alt="Voices Quote" style="height: 160px; width: auto; opacity: 0.3;">
            </div>
        </div>

        <!-- Testimonial Slick Slider -->
        <?php if ($testimonials): ?>
            <div class="voices-slick-wrapper">
                <div class="voices-slider">
                    <?php foreach ($testimonials as $item): 
                        $h_title     = $item['highlight_title'];
                        $quote       = $item['quote_text'];
                        $rating      = intval($item['rating_stars'] ?: 5);
                        $image       = is_array($item['guest_image']) ? $item['guest_image']['url'] : $item['guest_image'];
                        $guest_name  = $item['guest_name'];
                        $guest_sub   = $item['guest_subtitle'];
                        $linkedin    = isset($item['linkedin_link']) ? $item['linkedin_link'] : '';
                    ?>
                        <div class="slick-slide-item px-3">
                            
                            <!-- DESKTOP CARD DESIGN (Screenshot 1) -->
                            <div class="testimonial-card-desktop d-none d-md-flex flex-row rounded-4 overflow-hidden shadow-sm h-100">
                                <!-- Left Dark Content Side -->
                                <div class="card-content-side p-4 p-xl-5 d-flex flex-column">
                                    <div class="d-flex flex-column justify-content-center flex-grow-1">
                                        <div class="quote-mark mb-4">
                                            <svg width="32" height="28" viewBox="0 0 24 24" fill="#FF2B56">
                                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                                            </svg>
                                        </div>
                                        <?php if ($h_title): ?>
                                            <h3 class="card-highlight-title mb-4"><?php echo $h_title; ?></h3>
                                        <?php endif; ?>
                                        
                                        <?php if ($quote): ?>
                                            <p class="card-quote-text mb-0"><?php echo esc_html($quote); ?></p>
                                        <?php endif; ?>
                                    </div>
                                    
                                    <!-- Footer: Stars & LinkedIn -->
                                    <div class="d-flex align-items-center justify-content-between mt-4 pt-2">
                                        <!-- Star Ratings -->
                                        <div class="card-rating text-warning fs-5">
                                            <?php for ($i = 0; $i < $rating; $i++): ?>
                                                <i class="bi bi-star-fill me-1"></i>
                                            <?php endfor; ?>
                                        </div>
                                        
                                        <!-- LinkedIn Icon -->
                                        <?php if ($linkedin): 
                                            $li_url = is_array($linkedin) ? $linkedin['url'] : $linkedin;
                                        ?>
                                            <a href="<?php echo esc_url($li_url); ?>" target="_blank" rel="noopener noreferrer" class="ms-3 transition-opacity hover-opacity-75">
                                                <img src="https://www.paruluniversity.ac.in/wp-content/uploads/2026/09/linkedin-icon.svg" alt="LinkedIn" width="28" height="28">
                                            </a>
                                        <?php endif; ?>
                                    </div>
                                </div>

                                <!-- Right Image Banner Side -->
                                <?php if ($image): ?>
                                    <div class="card-image-side position-relative overflow-hidden">
                                        <img src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($guest_name); ?>" class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover">
                                        <div class="card-img-overlay-content p-3 p-md-4 position-absolute bottom-0 start-0 w-100 text-white">
                                            <?php if ($guest_name): ?>
                                                <h5 class="fw-bold mb-0 text-white"><?php echo esc_html($guest_name); ?></h5>
                                            <?php endif; ?>
                                            <?php if ($guest_sub): ?>
                                                <small class="text-white-50 d-block"><?php echo esc_html($guest_sub); ?></small>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                <?php endif; ?>
                            </div>

                            <!-- MOBILE CARD DESIGN (Screenshot 2) -->
                            <div class="testimonial-card-mobile d-flex d-md-none flex-column rounded-4 overflow-hidden shadow-sm bg-white h-100">
                                <!-- Top Image Banner -->
                                <?php if ($image): ?>
                                    <div class="mobile-card-image position-relative overflow-hidden">
                                        <img src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($guest_name); ?>" class="w-100 h-100 object-fit-cover">
                                        <?php if ($guest_name || $guest_sub): ?>
                                            <div class="mobile-img-overlay p-4 pt-5 position-absolute bottom-0 start-0 w-100 text-white">
                                                <?php if ($guest_name): ?>
                                                    <h4 class="fw-bold mb-1 text-white"><?php echo esc_html($guest_name); ?></h4>
                                                <?php endif; ?>
                                                <?php if ($guest_sub): ?>
                                                    <div class="text-white opacity-75 d-block small"><?php echo esc_html($guest_sub); ?></div>
                                                <?php endif; ?>
                                            </div>
                                        <?php endif; ?>
                                    </div>
                                <?php endif; ?>

                                <!-- Bottom White Content Area -->
                                <div class="mobile-card-content p-4 d-flex flex-column justify-content-between flex-grow-1">
                                    <?php if ($quote): ?>
                                        <p class="mobile-quote-text mb-3"><?php echo esc_html($quote); ?></p>
                                    <?php endif; ?>

                                    <!-- Footer: Stars & LinkedIn -->
                                    <div class="d-flex align-items-center justify-content-between mt-auto">
                                        <!-- Star Ratings -->
                                        <div class="card-rating d-flex flex-row gap-1">
                                            <?php for ($i = 0; $i < $rating; $i++): ?>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFC107" class="me-1" viewBox="0 0 16 16">
                                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                </svg>
                                            <?php endfor; ?>
                                        </div>
                                        
                                        <!-- LinkedIn Icon -->
                                        <?php if ($linkedin): 
                                            $li_url = is_array($linkedin) ? $linkedin['url'] : $linkedin;
                                        ?>
                                            <a href="<?php echo esc_url($li_url); ?>" target="_blank" rel="noopener noreferrer" class="ms-3">
                                                <img src="https://www.paruluniversity.ac.in/wp-content/uploads/2026/09/linkedin-icon.svg" alt="LinkedIn" width="24" height="24">
                                            </a>
                                        <?php endif; ?>
                                    </div>
                                </div>
                            </div>

                        </div>
                    <?php endforeach; ?>
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
        <?php endif; ?>

    </div>
</section>

<script>
document.addEventListener("DOMContentLoaded", function () {
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
});
</script>