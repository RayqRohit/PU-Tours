/**
 * PARUL UNIVERSITY - PRACTICAL LEARNING TOURS (optimized)
 * Same behavior as original: smooth scrolling cards, two-finger desktop
 * slide, one-finger mobile touch. Desktop/mobile thumbnail + close-button
 * logic merged to remove duplication.
 */
document.addEventListener('DOMContentLoaded', () => {
  const toursData = [
    { id: 'tour-1', tag: 'VADODARA', title: 'Campus Virtual Tour', year: '2025-26', badgeColor: '#008899', videoId: 'CoK-vRyucMU', embedUrl: 'https://www.youtube.com/embed/CoK-vRyucMU', heading: 'Virtual Campus Tour', subheading: 'Award-Winning Vadodara Campus' },
    { id: 'tour-2', tag: 'BANGALORE', title: 'Business Leadership Tour', year: '2025', badgeColor: '#1A4D80', videoId: 'urZTpngOKMU', embedUrl: 'https://www.youtube.com/embed/urZTpngOKMU', heading: 'Business Leadership', subheading: 'Bangalore Tech & Innovation' },
    { id: 'tour-3', tag: 'MUMBAI', title: 'Leadership Tour', year: '2025', badgeColor: '#0F0445', videoId: 'Cy4rIpjHlH8', embedUrl: 'https://www.youtube.com/embed/Cy4rIpjHlH8', heading: 'Mumbai Leadership Tour', subheading: 'A Saga of Learning & Legacy' },
    { id: 'tour-4', tag: 'BANGALORE', title: 'Enterprise Tour', year: '2025', badgeColor: '#2A2181', videoId: '75mkemYOtcU', embedUrl: 'https://www.youtube.com/embed/75mkemYOtcU', heading: 'Corporate Innovation', subheading: 'Silicon Valley of India' },
    { id: 'tour-5', tag: 'DELHI', title: 'National Governance Tour', year: '2025', badgeColor: '#C2410C', videoId: '7OlwbVLLAbI', embedUrl: 'https://www.youtube.com/embed/7OlwbVLLAbI', heading: 'Governance & Diplomacy', subheading: 'New Delhi Capital Experience' },
    { id: 'tour-6', tag: 'MUMBAI', title: 'Architecture & Design', year: '2025', badgeColor: '#047857', videoId: 'kwSSr-eUis8', embedUrl: 'https://www.youtube.com/embed/kwSSr-eUis8', heading: 'Architecture & Design', subheading: 'Mumbai Fashion & Lifestyle' },
    { id: 'tour-7', tag: 'MUMBAI', title: 'Justice in Journey', year: '2025', badgeColor: '#6D28D9', videoId: 'JDvKTHLaAbs', embedUrl: 'https://www.youtube.com/embed/JDvKTHLaAbs', heading: 'Justice in Journey', subheading: 'High Court & Legal Chambers' },
    { id: 'tour-8', tag: 'DELHI', title: 'Civil Servants Tour', year: '2025', badgeColor: '#B45309', videoId: 'f4RvTWOn7M4', embedUrl: 'https://www.youtube.com/embed/f4RvTWOn7M4', heading: 'Civil Services Tour', subheading: 'Delhi Future Leaders Residency' }
  ];

  const $ = id => document.getElementById(id);
  const getThumb = videoId => `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const getVideoUrl = tour => `${tour.embedUrl}${tour.embedUrl.includes('?') ? '&' : '?'}autoplay=1&enablejsapi=1&rel=0`;

  let currentTourIndex = 0, isVideoPlaying = false, isTransitioning = false;
  const totalTours = toursData.length;

  const els = {
    desktopSlider: $('desktopScreenSlider'),
    mobileSlider: $('mobileScreenSlider'),
    desktopIframe: $('desktopIframe'),
    mobileIframe: $('mobileIframe'),
    closeDesktop: $('closeVideoDesktop'),
    closeMobile: $('closeVideoMobile'),
    sideLeft: $('sideCardLeft'),
    sideRight: $('sideCardRight'),
    sideLeftSlider: $('sideCardLeftSlider'),
    sideRightSlider: $('sideCardRightSlider'),
    stage: $('puToursShowcase') || $('puToursStage'),
    center: $('deviceCenterWrapper'),
    dots: $('dotsTrack')
  };

  // ---- Pagination dots ----
  function initializeDots() {
    if (!els.dots) return;
    els.dots.innerHTML = '';
    toursData.forEach((t, i) => {
      const dot = document.createElement('button');
      dot.className = 'pu-tours-page-indicator-dot';
      dot.setAttribute('aria-label', `Go to ${t.title}`);
      dot.addEventListener('click', () => i !== currentTourIndex && slideToTour(i, i > currentTourIndex ? 'next' : 'prev'));
      els.dots.appendChild(dot);
    });
    updateDotsUI(0);
  }

  function updateDotsUI(active) {
    if (!els.dots) return;
    const dots = [...els.dots.querySelectorAll('.pu-tours-page-indicator-dot')];
    if (!dots.length) return;
    const visible = 5, step = 16;
    const start = totalTours <= visible ? 0
      : active <= 2 ? 0
        : active >= totalTours - 3 ? totalTours - visible
          : active - 2;
    els.dots.style.transform = `translateX(${-(start * step)}px)`;
    dots.forEach((dot, i) => {
      dot.classList.remove('active', 'dot-small', 'dot-tiny', 'dot-hidden');
      if (i === active) { dot.classList.add('active'); return; }
      const d = i - start;
      if (d < 0 || d >= visible) dot.classList.add('dot-hidden');
      else if ((d === 0 && start > 0) || (d === visible - 1 && start + visible < totalTours)) dot.classList.add('dot-small');
    });
  }

  // ---- Thumbnail / side-card face builders (desktop+mobile merged) ----
  function createThumbnail(tour, mobile) {
    const thumb = document.createElement('div');
    thumb.className = mobile ? 'pu-tours-page-mobile-thumbnail-view' : 'pu-tours-page-video-thumbnail-view';
    thumb.style.backgroundImage = `url('${getThumb(tour.videoId)}')`;
    const size = mobile ? 40 : 67;
    thumb.innerHTML = `<div class="pu-tours-page-play-btn-circle${mobile ? ' pu-tours-page-play-btn-mobile' : ''}" role="button" aria-label="Play Tour Video">
      <svg width="${size}" height="${size}" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.4487 18.8018L48.9087 33.5011L23.4487 48.2004L23.4487 18.8018Z" fill="white"/>
      </svg></div>`;
    thumb.addEventListener('click', () => { if (!isVideoPlaying) startVideo(); });
    return thumb;
  }

  function createSideCardFace(tour) {
    const face = document.createElement('div');
    face.className = 'pu-tours-page-side-card-face';
    face.style.backgroundImage = `url('${getThumb(tour.videoId)}')`;
    return face;
  }

  // ---- Shared slide-in/out animation for any layer (center screen or side card) ----
  function slideLayer(container, selector, newEl, direction) {
    if (!container) return;
    const current = container.querySelector(selector);
    newEl.style.transform = direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
    container.appendChild(newEl);
    void newEl.offsetWidth; // force reflow
    newEl.style.transform = 'translateX(0)';
    if (current) {
      current.style.transform = direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
      current.style.opacity = '0.4';
      setTimeout(() => current.remove(), 500);
    }
  }

  function initializeSideCards() {
    const l = (currentTourIndex - 1 + totalTours) % totalTours;
    const r = (currentTourIndex + 1) % totalTours;
    els.sideLeftSlider?.appendChild(createSideCardFace(toursData[l]));
    els.sideRightSlider?.appendChild(createSideCardFace(toursData[r]));
  }

  function slideToTour(target, direction = 'next') {
    if (isTransitioning) return;
    isTransitioning = true;
    stopVideo();

    currentTourIndex = (target + totalTours) % totalTours;
    const tour = toursData[currentTourIndex];
    const l = (currentTourIndex - 1 + totalTours) % totalTours;
    const r = (currentTourIndex + 1) % totalTours;

    slideLayer(els.desktopSlider, '.pu-tours-page-video-thumbnail-view', createThumbnail(tour, false), direction);
    slideLayer(els.mobileSlider, '.pu-tours-page-mobile-thumbnail-view', createThumbnail(tour, true), direction);
    slideLayer(els.sideLeftSlider, '.pu-tours-page-side-card-face', createSideCardFace(toursData[l]), direction);
    slideLayer(els.sideRightSlider, '.pu-tours-page-side-card-face', createSideCardFace(toursData[r]), direction);

    setTimeout(() => { isTransitioning = false; }, 500);
    updateDotsUI(currentTourIndex);
  }

  const nextSlide = () => slideToTour(currentTourIndex + 1, 'next');
  const prevSlide = () => slideToTour(currentTourIndex - 1, 'prev');

  // ---- Video playback ----
  function startVideo() {
    isVideoPlaying = true;
    const url = getVideoUrl(toursData[currentTourIndex]);
    const desktop = window.innerWidth >= 768;
    const iframe = desktop ? els.desktopIframe : els.mobileIframe;
    const closeBtn = desktop ? els.closeDesktop : els.closeMobile;
    if (iframe) { iframe.src = url; iframe.classList.add('active'); }
    if (closeBtn) closeBtn.style.display = 'flex';
  }

  function stopVideo() {
    isVideoPlaying = false;
    [els.desktopIframe, els.mobileIframe].forEach(f => { if (f) { f.src = ''; f.classList.remove('active'); } });
    [els.closeDesktop, els.closeMobile].forEach(b => { if (b) b.style.display = 'none'; });
  }

  [els.closeDesktop, els.closeMobile].forEach(btn => btn?.addEventListener('click', e => { e.stopPropagation(); stopVideo(); }));
  els.sideLeft?.addEventListener('click', prevSlide);
  els.sideRight?.addEventListener('click', nextSlide);

  // ---- Two-finger desktop trackpad slide ----
  let wheelLocked = false, wheelAccum = 0, wheelEndTimer = null;
  els.stage?.addEventListener('wheel', e => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) <= 10) return;
    e.preventDefault();
    clearTimeout(wheelEndTimer);
    wheelEndTimer = setTimeout(() => { wheelLocked = false; wheelAccum = 0; }, 200);
    if (wheelLocked || isTransitioning) return;
    wheelAccum += e.deltaX;
    if (Math.abs(wheelAccum) >= 24) {
      wheelAccum > 0 ? nextSlide() : prevSlide();
      wheelLocked = true;
      wheelAccum = 0;
    }
  }, { passive: false });

  // ---- Drag / one-finger mobile touch ----
  let startX = 0, startY = 0, deltaX = 0, dragging = false, isTouch = false;

  function dragStart(x, y, touch) {
    if (isVideoPlaying || isTransitioning) return;
    startX = x; startY = y; deltaX = 0; dragging = true; isTouch = touch;
    [els.center, els.sideLeft, els.sideRight].forEach(el => el?.classList.add('is-dragging'));
  }

  function dragMove(x, y) {
    if (!dragging) return;
    const dx = x - startX, dy = y - startY;
    if (isTouch && Math.abs(dy) > Math.abs(dx) * 1.5 && Math.abs(dx) < 15) return; // natural vertical scroll
    deltaX = dx;
    const px = dx * 0.35;
    if (els.center) els.center.style.transform = `translateX(${px}px)`;
    els.sideLeft?.style.setProperty('--drag-offset', `${px}px`);
    els.sideRight?.style.setProperty('--drag-offset', `${px}px`);
  }

  function dragEnd() {
    if (!dragging) return;
    dragging = false;
    if (els.center) { els.center.classList.remove('is-dragging'); els.center.style.transform = ''; }
    [els.sideLeft, els.sideRight].forEach(el => { el?.classList.remove('is-dragging'); el?.style.removeProperty('--drag-offset'); });
    if (Math.abs(deltaX) > 35) (deltaX < 0 ? nextSlide : prevSlide)();
    deltaX = 0;
  }

  if (els.stage) {
    els.stage.addEventListener('touchstart', e => e.touches.length === 1 && dragStart(e.touches[0].clientX, e.touches[0].clientY, true), { passive: true });
    els.stage.addEventListener('touchmove', e => dragging && e.touches.length === 1 && dragMove(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
    els.stage.addEventListener('touchend', dragEnd);
    els.stage.addEventListener('touchcancel', dragEnd);
    els.stage.addEventListener('mousedown', e => {
      if (e.target.closest('.pu-tours-page-play-btn-circle, .pu-tours-page-btn-close-video')) return;
      dragStart(e.clientX, e.clientY, false);
    });
    window.addEventListener('mousemove', e => !isTouch && dragMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', () => !isTouch && dragEnd());
  }

  // ---- Keyboard ----
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isVideoPlaying) stopVideo();
    else if (e.key === 'ArrowRight') nextSlide();
    else if (e.key === 'ArrowLeft') prevSlide();
  });

  // ---- Init ----
  initializeDots();
  initializeSideCards();

  // Wire up the server-rendered default thumbnail play buttons (tour 1, shown on load)
  [['playButtonDesktop', 'desktopThumbnail'], ['playButtonMobile', 'mobileThumbnail']].forEach(([playId, thumbId]) => {
    $(playId)?.addEventListener('click', e => { e.stopPropagation(); startVideo(); });
    $(thumbId)?.addEventListener('click', () => { if (!isVideoPlaying) startVideo(); });
  });

  // ---- Why It Matters Slick Slider ----
  if (typeof jQuery !== 'undefined') {
    const slider = jQuery('.pu-tours-why-slider');
    const progressBar = jQuery('#whyProgressBar');

    if (slider.length) {
      function updateProgress(slick, nextSlide) {
        // slick.options.slidesToShow safely gives the current active slidesToShow
        let maxSlide = slick.slideCount - slick.options.slidesToShow;
        let calc = 100; // default to 100% if no scrolling is possible
        if (maxSlide > 0) {
          calc = ((nextSlide + 1) / (maxSlide + 1)) * 100;
        }
        progressBar.css('width', calc + '%');
      }

      slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        updateProgress(slick, nextSlide);
      });

      slider.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: jQuery('.pu-tours-why-prev'),
        nextArrow: jQuery('.pu-tours-why-next'),
        infinite: false,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });

      if (slider.slick('getSlick').slideCount) {
        updateProgress(slider.slick('getSlick'), 0);
      }
    }

    // ---- Leadership Spotlight Slick Slider ----
    const leadershipSlider = jQuery('.pu-tours-leadership-slider');
    const leadershipProgressBar = jQuery('#leadershipProgressBar');

    if (leadershipSlider.length) {
      function updateLeadershipProgress(slick, nextSlide) {
        let maxSlide = slick.slideCount - slick.options.slidesToShow;
        let calc = 100;
        if (maxSlide > 0) {
          calc = ((nextSlide + 1) / (maxSlide + 1)) * 100;
        }
        leadershipProgressBar.css('width', calc + '%');
      }

      leadershipSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        // Only update progress for the main slider, ignore nested sliders
        if (event.target !== event.currentTarget) return;
        updateLeadershipProgress(slick, nextSlide);
      });

      leadershipSlider.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: jQuery('.pu-tours-leadership-prev'),
        nextArrow: jQuery('.pu-tours-leadership-next'),
        infinite: false,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });

      if (leadershipSlider.slick('getSlick').slideCount) {
        updateLeadershipProgress(leadershipSlider.slick('getSlick'), 0);
      }

      // Initialize nested speaker slider for each card
      jQuery('.pu-tours-speaker-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true
      });
    }
  }

  // ---- Evidence Directory Logos Show More ----
  if (typeof jQuery !== 'undefined') {
    jQuery(document).on('click', '.pu-tours-show-more-logos', function () {
      // Find the parent container
      const container = jQuery(this).closest('.pu-tours-evidence-logos');
      // Show the hidden logos
      container.find('.pu-tours-hidden-logo').removeClass('d-none');
      // Hide the "more" button itself
      jQuery(this).addClass('d-none');
    });
  }

  // ---- Evidence Directory Filtering ----
  const cards = Array.from(document.querySelectorAll('.tour-card'));
  const typeButtons = Array.from(document.querySelectorAll('.pu-tours-filter-btn'));
  const facultySelect = document.getElementById('faculty-filter');
  const searchInput = document.getElementById('tour-search');

  const viewAllBtn = document.getElementById('view-all-tours-btn');
  const viewAllContainer = document.getElementById('view-all-tours-container');

  let activeType = 'all';
  let showingAll = false;

  if (cards.length > 0 && facultySelect && searchInput) {
    const applyFilters = () => {
      const query = searchInput.value.trim().toLowerCase();
      const faculty = facultySelect.value;

      let visibleCount = 0;

      cards.forEach(card => {
        const typeMatch = activeType === 'all' || card.dataset.type === activeType;
        const facultyMatch = faculty === 'all' || card.dataset.faculty === faculty;

        let searchMatch = true;
        if (query) {
          searchMatch = (card.dataset.search || '').includes(query);
        }

        const show = typeMatch && facultyMatch && searchMatch;

        if (show) {
          visibleCount++;
          if (!showingAll && visibleCount > 6) {
            card.style.setProperty('display', 'none', 'important');
          } else {
            card.style.setProperty('display', 'block', 'important');
          }
        } else {
          card.style.setProperty('display', 'none', 'important');
        }
      });

      if (viewAllContainer) {
        if (!showingAll && visibleCount > 6) {
          viewAllContainer.style.setProperty('display', 'block', 'important');
        } else {
          viewAllContainer.style.setProperty('display', 'none', 'important');
        }
      }
    };

    typeButtons.forEach(button => button.addEventListener('click', () => {
      activeType = button.dataset.filter;
      typeButtons.forEach(item => {
        const selected = item === button;
        item.classList.toggle('active', selected);
      });
      showingAll = false;
      applyFilters();
    }));

    searchInput.addEventListener('input', () => {
      showingAll = false;
      applyFilters();
    });
    facultySelect.addEventListener('change', () => {
      showingAll = false;
      applyFilters();
    });

    if (viewAllBtn) {
      viewAllBtn.addEventListener('click', () => {
        showingAll = true;
        applyFilters();
      });
    }

    // Initial setup
    applyFilters();
  }

  // Organization Tabs Logic
  const orgButtons = document.querySelectorAll('.pu-tours-org-btn');
  const orgGrids = document.querySelectorAll('.pu-tours-org-grid');

  if (orgButtons.length > 0) {
    orgButtons.forEach(button => {
      button.addEventListener('click', function (e) {
        e.preventDefault();

        // Get target
        const targetId = this.getAttribute('data-target');

        // Update active class on buttons
        orgButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Hide all grids
        orgGrids.forEach(grid => {
          grid.style.display = 'none';
        });

        // Show target grid
        const targetGrid = document.querySelector(targetId);
        if (targetGrid) {
          targetGrid.style.display = 'grid';
        }
      });
    });
  }

  // Video Exposure Slick Slider
  const $videoSlider = jQuery('.pu-tours-video-exposure-slider');
  if ($videoSlider.length) {
    $videoSlider.on('init reInit afterChange', function(event, slick, currentSlide) {
      const i = (currentSlide ? currentSlide : 0);
      const progressBar = jQuery('#video-slider-progress');
      if (progressBar.length) {
        const slideCount = slick.slideCount;
        const width = ((i + 1) / slideCount) * 100;
        progressBar.css('width', width + '%');
      }
    });

    $videoSlider.slick({
      centerMode: true,
      centerPadding: '15%',
      slidesToShow: 1,
      dots: false,
      arrows: true,
      infinite: true,
      prevArrow: jQuery('.pu-tours-video-exposure-prev'),
      nextArrow: jQuery('.pu-tours-video-exposure-next'),
      responsive: [
        {
          breakpoint: 992,
          settings: {
            centerPadding: '10%'
          }
        },
        {
          breakpoint: 768,
          settings: {
            centerPadding: '5%'
          }
        }
      ]
    });
  }

});

function initVoicesSlider() {
    if (typeof jQuery !== 'undefined' && jQuery.fn.slick) {
        var $ = jQuery;
        
        $('.pu-tours-voices-slider').each(function() {
            var $slider = $(this);
            var $wrapper = $slider.closest('.pu-tours-voices-slick-wrapper');
            var $progressBar = $wrapper.find('.pu-tours-voices-progress-bar');

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

                function updateInstagramDots(slick, currentSlide) {
                    var $dots = $slider.find('.slick-dots li');
                    var totalDots = $dots.length;
                    var maxVisible = 5;

                    $dots.removeClass('pu-tours-voices-dot-near pu-tours-voices-dot-far');

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

                    var moveAmount = translateIndex * 14; 
                    $dots.css('transform', 'translateX(-' + moveAmount + 'px)');

                    $dots.each(function(index) {
                        var distance = Math.abs(index - currentSlide);
                        if (distance === 2) {
                            $(this).addClass('pu-tours-voices-dot-near');
                        } else if (distance >= 3) {
                            $(this).addClass('pu-tours-voices-dot-far');
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
                    prevArrow: $wrapper.find('.pu-tours-voices-btn-prev'),
                    nextArrow: $wrapper.find('.pu-tours-voices-btn-next'),
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

$(document).ready(function() {
    initVoicesSlider();
});

/* =========================================================
   FAQ ACCORDION
   ========================================================= */
document.addEventListener('DOMContentLoaded', function() {
    const detailsElements = document.querySelectorAll('.pu-tours-faq-details');
    if (detailsElements.length > 0) {
        detailsElements.forEach(function (detail) {
            const summary = detail.querySelector('.pu-tours-faq-summary');
            if (summary) {
                summary.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (detail.hasAttribute('open')) {
                        detail.classList.add('closing');
                        setTimeout(function () {
                            detail.removeAttribute('open');
                            detail.classList.remove('closing');
                        }, 300);
                    } else {
                        detailsElements.forEach(function (otherDetail) {
                            if (otherDetail !== detail && otherDetail.hasAttribute('open')) {
                                otherDetail.classList.add('closing');
                                setTimeout(function () {
                                    otherDetail.removeAttribute('open');
                                    otherDetail.classList.remove('closing');
                                }, 300);
                            }
                        });
                        detail.setAttribute('open', '');
                    }
                });
            }
        });
    }

    /* =========================================================
       FAQ VIEW MORE
       ========================================================= */
    const viewMoreBtn = document.getElementById('pu-tours-faq-view-more-btn');
    const hiddenFaqs = document.querySelectorAll('.pu-tours-faq-hidden');
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function (e) {
            e.preventDefault();
            let isHidden = false;
            hiddenFaqs.forEach(function (faq) {
                if (faq.classList.contains('d-none')) {
                    faq.classList.remove('d-none');
                    isHidden = true;
                } else {
                    faq.classList.add('d-none');
                    faq.removeAttribute('open');
                }
            });
            if (isHidden) {
                viewMoreBtn.innerHTML = 'View less &uarr;';
            } else {
                viewMoreBtn.innerHTML = 'View more &darr;';
            }
        });
    }
});

/* =========================================================
   INCUBATION SLIDER
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    function initIncubationSlider() {
        if (typeof jQuery !== 'undefined' && jQuery.fn.slick) {
            var $slider = jQuery('.incubation-slick-slider');
            if ($slider.length && !$slider.hasClass('slick-initialized')) {
                $slider.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 4000,
                    infinite: true,
                    arrows: false,
                    dots: true,
                    appendDots: jQuery('.incubation-dots-container'),
                    fade: false,
                    cssEase: 'ease-in-out'
                });
            }
        } else {
            setTimeout(initIncubationSlider, 100);
        }
    }
    initIncubationSlider();

    /* =========================================================
       WHAT IS SLIDER
       ========================================================= */
    function initWhatIsSlider() {
        if (typeof jQuery !== 'undefined' && jQuery.fn.slick) {
            var $slider = jQuery('.pu-tours-what-is-slider');
            if ($slider.length && !$slider.hasClass('slick-initialized')) {
                // Only initialize slick on small screens to match max-width 360px request
                if (window.innerWidth <= 767) {
                    $slider.slick({
                        slidesToShow: 1.15,
                        slidesToScroll: 1,
                        infinite: false,
                        arrows: false,
                        dots: true,
                        appendDots: jQuery('.pu-tours-what-is-dots-container')
                    });
                }
                
                // Re-check on resize
                jQuery(window).on('resize', function() {
                    if (window.innerWidth <= 767) {
                        if (!$slider.hasClass('slick-initialized')) {
                            $slider.slick({
                                slidesToShow: 1.15,
                                slidesToScroll: 1,
                                infinite: false,
                                arrows: false,
                                dots: true,
                                appendDots: jQuery('.pu-tours-what-is-dots-container')
                            });
                        }
                    } else {
                        if ($slider.hasClass('slick-initialized')) {
                            $slider.slick('unslick');
                        }
                    }
                });
            }
        } else {
            setTimeout(initWhatIsSlider, 100);
        }
    }
    initWhatIsSlider();
    /* =========================================================
       PROCESS SLIDER
       ========================================================= */
    function initProcessSlider() {
        if (typeof jQuery !== 'undefined' && jQuery.fn.slick) {
            var $slider = jQuery('.pu-tours-process-slider');
            if ($slider.length && !$slider.hasClass('slick-initialized')) {
                // Initialize slick on small screens and tablets
                if (window.innerWidth <= 991) {
                    $slider.slick({
                        slidesToShow: window.innerWidth <= 767 ? 1.15 : 2.15,
                        slidesToScroll: 1,
                        infinite: false,
                        arrows: false,
                        dots: true,
                        appendDots: jQuery('.pu-tours-process-dots-container')
                    });
                }
                
                // Re-check on resize
                jQuery(window).on('resize', function() {
                    if (window.innerWidth <= 991) {
                        if (!$slider.hasClass('slick-initialized')) {
                            $slider.slick({
                                slidesToShow: window.innerWidth <= 767 ? 1.15 : 2.15,
                                slidesToScroll: 1,
                                infinite: false,
                                arrows: false,
                                dots: true,
                                appendDots: jQuery('.pu-tours-process-dots-container')
                            });
                        } else {
                            // Update slidesToShow dynamically on resize if already initialized
                            $slider.slick('slickSetOption', 'slidesToShow', window.innerWidth <= 767 ? 1.15 : 2.15, true);
                        }
                    } else {
                        if ($slider.hasClass('slick-initialized')) {
                            $slider.slick('unslick');
                        }
                    }
                });
            }
        } else {
            setTimeout(initProcessSlider, 100);
        }
    }
    initProcessSlider();

    /* =========================================================
       CAREERS SLIDER
       ========================================================= */
    function initCareersSlider() {
        if (typeof jQuery !== 'undefined' && jQuery.fn.slick) {
            var $slider = jQuery('.pu-tours-career-slider');
            if ($slider.length && !$slider.hasClass('slick-initialized')) {
                // Initialize slick on small screens and tablets
                if (window.innerWidth <= 991) {
                    $slider.slick({
                        slidesToShow: window.innerWidth <= 767 ? 1.1 : 1.5,
                        slidesToScroll: 1,
                        infinite: false,
                        arrows: false,
                        dots: true,
                        appendDots: jQuery('.pu-tours-career-dots-container')
                    });
                }
                
                // Re-check on resize
                jQuery(window).on('resize', function() {
                    if (window.innerWidth <= 991) {
                        if (!$slider.hasClass('slick-initialized')) {
                            $slider.slick({
                                slidesToShow: window.innerWidth <= 767 ? 1.1 : 1.5,
                                slidesToScroll: 1,
                                infinite: false,
                                arrows: false,
                                dots: true,
                                appendDots: jQuery('.pu-tours-career-dots-container')
                            });
                        } else {
                            $slider.slick('slickSetOption', 'slidesToShow', window.innerWidth <= 767 ? 1.1 : 1.5, true);
                        }
                    } else {
                        if ($slider.hasClass('slick-initialized')) {
                            $slider.slick('unslick');
                        }
                    }
                });
            }
        } else {
            setTimeout(initCareersSlider, 100);
        }
    }
    initCareersSlider();
});
