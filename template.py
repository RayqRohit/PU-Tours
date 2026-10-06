import re
import json

html = """
          <!-- Testimonial {index} -->
          <div class="pu-tours-voices-slide-item px-3">
            <!-- DESKTOP CARD DESIGN -->
            <div class="pu-tours-voices-card-desktop d-none d-md-flex flex-row rounded-4 overflow-hidden shadow-sm h-100">
              <div class="pu-tours-voices-card-content p-4 d-flex flex-column">
                <div class="d-flex flex-column justify-content-center flex-grow-1">
                  <div class="pu-tours-voices-quote-mark mb-4">
                    <svg width="32" height="28" viewBox="0 0 24 24" fill="#FF2B56">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <h3 class="pu-tours-voices-card-title mb-4">
    {title}
</h3>
                  <p class="pu-tours-voices-card-quote mb-0">{description}</p>
                </div>
                <!-- Footer: Stars & LinkedIn -->
                <div class="d-flex align-items-center justify-content-between mt-4 pt-2">
                  <div class="pu-tours-voices-card-rating d-flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFC107" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFC107" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFC107" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFC107" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFC107" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" /></svg>
                  </div>
                  <!-- LinkedIn Icon -->
                  <div class="d-flex align-items-center gap-2 ms-auto">
                    <a href="{link}" target="_blank" class="text-white transition-opacity hover-opacity-75 d-flex align-items-center justify-content-center bg-white rounded-circle" style="width: 28px; height: 28px;">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f0445" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                    <a href="{link}" target="_blank" rel="noopener noreferrer" class="transition-opacity hover-opacity-75">
                      <img src="https://www.paruluniversity.ac.in/wp-content/uploads/2026/09/linkedin-icon.svg" alt="LinkedIn" width="28" height="28">
                    </a>
                  </div>
                </div>
              </div>
              <!-- Right Image Banner Side -->
              <div class="pu-tours-voices-card-image-side position-relative overflow-hidden">
                <img src="https://img.youtube.com/vi/7xUxQtHXXbs/maxresdefault.jpg" onerror="this.onerror=null; this.src='https://img.youtube.com/vi/7xUxQtHXXbs/hqdefault.jpg';" alt="Guest" class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover">
                <div class="pu-tours-voices-card-img-overlay p-3 p-md-4 position-absolute bottom-0 start-0 w-100 text-white">
                  <h5 class="fw-bold mb-0 text-white">Student Name</h5>
                  <small class="text-white-50 d-block">Leadership Tour Participant</small>
                </div>
              </div>
            </div>

            <!-- MOBILE CARD DESIGN -->
            <div class="pu-tours-voices-card-mobile d-flex d-md-none flex-column rounded-4 overflow-hidden shadow-sm bg-white h-100">
              <div class="pu-tours-voices-mobile-card-image position-relative overflow-hidden">
                <img src="https://img.youtube.com/vi/7xUxQtHXXbs/maxresdefault.jpg" onerror="this.onerror=null; this.src='https://img.youtube.com/vi/7xUxQtHXXbs/hqdefault.jpg';" alt="Guest" class="w-100 h-100 object-fit-cover">
                <div class="pu-tours-voices-mobile-img-overlay p-4 pt-5 position-absolute bottom-0 start-0 w-100 text-white">
                  <h4 class="fw-bold mb-1 text-white">Student Name</h4>
                  <div class="text-white opacity-75 d-block small">Leadership Tour Participant</div>
                </div>
              </div>
              <div class="pu-tours-voices-mobile-card-content p-4 d-flex flex-column justify-content-between flex-grow-1">
                <p class="pu-tours-voices-mobile-quote mb-3">{description}</p>
                <div class="d-flex align-items-center justify-content-between mt-auto">
                  <div class="pu-tours-voices-card-rating d-flex flex-row gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFC107" class="me-1" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFC107" class="me-1" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFC107" class="me-1" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFC107" class="me-1" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFC107" class="me-1" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" /></svg>
                  </div>
                  <div class="d-flex align-items-center gap-1 ms-auto">
                    <a href="{link}" target="_blank" class="text-white transition-opacity hover-opacity-75 d-flex align-items-center justify-content-center bg-white rounded-circle" style="width: 28px; height: 28px;">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f0445" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                    <a href="{link}" target="_blank" rel="noopener noreferrer" class="transition-opacity hover-opacity-75">
                      <img src="https://www.paruluniversity.ac.in/wp-content/uploads/2026/09/linkedin-icon.svg" alt="LinkedIn" width="24" height="24">
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
"""

data = [
    {
        "title": "The Tour That Transformed <span style=\"color:#ffc107;\">My Perspective</span>",
        "description": "The Hyderabad Biopharma Tour was an incredible opportunity to see real-world science in action. Visiting top facilities and learning directly from industry leaders completely shifted how I view my future in pharmacy.",
        "link": "https://www.linkedin.com/posts/anthonyjcordeiro_paruluniversity-facultyofpharmacy-hyderabad-activity-7373703855072686080-8N2V"
    },
    {
        "title": "An Unforgettable <span style=\"color:#ffc107;\">Finale to Hyderabad</span>",
        "description": "Ending our tour by learning about vaccine production at IIL and API manufacturing at Piramal Pharma was incredible. Hearing leadership stories at Converge Biotech inspired me to think beyond textbooks and explore pharma entrepreneurship. I'm so grateful for this opportunity!",
        "link": "https://www.linkedin.com/posts/anant-pai-5360b61b1_research-toxicology-pharmacology-activity-7371900956894134272-CeAg"
    },
    {
        "title": "A Step Toward <span style=\"color:#ffc107;\">Real Change</span>",
        "description": "Being selected for the Social Work Leadership Tour as a first-year MSW student is a huge milestone for me. I’m excited to learn from inspiring leaders, discuss pressing social issues, and gain hands-on insights to help build a more inclusive society.",
        "link": "https://www.linkedin.com/posts/deven-pravinbhai-bariya-b04085366_socialworkleadership-paruluniversity-msw-activity-7369754090253295617-9gQb"
    },
    {
        "title": "Where Science Meets <span style=\"color:#ffc107;\">Human Impact</span>",
        "description": "Touring biotech pioneers like String Bio, Biocon, and NCBS in Bengaluru showed me the true power of scientific research. Seeing how sustainable tech and drug discovery directly improve lives inspired me to pursue my own career with a clear sense of purpose.",
        "link": "https://www.linkedin.com/posts/jash-jain-6236ab320_sciencetour2025-paruluniversity-biotechnology-activity-7384491478296977408-ZMIG"
    },
    {
        "title": "A Full-Scholarship <span style=\"color:#ffc107;\">Milestone</span>",
        "description": "Being chosen for the Bangalore Business Leadership Tour was a dream opportunity. Traveling alongside my team and gaining direct exposure to corporate strategy transformed my confidence and sharpened my business mindset.",
        "link": "https://www.linkedin.com/posts/indranisahoo_it-all-started-with-this-opportunity-by-parul-activity-7391887439658897409-P4mE"
    },
    {
        "title": "A Defining <span style=\"color:#ffc107;\">First-Year Moment</span>",
        "description": "Earning my spot on the AI & Tech Tour through rigorous selection rounds was incredible. Getting to interact directly with CEOs and tech visionaries across Bangalore gave me a front-row seat to cutting-edge industry innovations and real-world AI applications.",
        "link": "https://www.linkedin.com/posts/pearl-chaudhary_iimun-leadershiptour-paruluniversity-activity-7402296016366014466-1MVJ"
    },
    {
        "title": "A Masterclass in <span style=\"color:#ffc107;\">Modern Leadership</span>",
        "description": "Experiencing Day 2 of the tour brought my classroom learning to life. Exploring fintech integration, strong governance, and strategic vision with seasoned industry heads provided me with a clear roadmap for my own career in business management.",
        "link": "https://www.linkedin.com/posts/prachisomani12_leadershiptour-day2-leadershiplearning-activity-7421561770051260416-DAXM"
    },
    {
        "title": "Taking Ayurveda <span style=\"color:#ffc107;\">to the World</span>",
        "description": "Representing Parul Institute of Ayurveda on this Leadership Tour was an incredible honor. Connecting with pioneering experts showed me firsthand how innovation and strong leadership are expanding traditional Ayurveda into the global healthcare space.",
        "link": "https://lnkd.in/p/dGywFnvi"
    },
    {
        "title": "Seeing Post-Harvest <span style=\"color:#ffc107;\">Engineering in Action</span>",
        "description": "Day 1 at SAM Agri in Nashik was an incredible hands-on experience! As an Agricultural Engineering student, seeing the practical mechanics of fermentation, processing, and quality control for grapes and strawberries brought our textbook concepts to life.",
        "link": "https://www.linkedin.com/posts/ayush-chaudhary-ab4712355_educationaltour-samagri-nashik-activity-7510681932301766656-hWm_"
    },
    {
        "title": "A Front-Row Seat to <span style=\"color:#ffc107;\">Aerospace Innovation</span>",
        "description": "This visit to Collins Aerospace was a major highlight of our tour. Exploring advanced aerospace systems and learning about the future of commercial and defense aviation gave me the exact motivation and direction I need for my career in the field.",
        "link": "https://www.linkedin.com/posts/rudraksh-chouhan-81027626b_aviation-aerospace-collinsaerospace-activity-7435158540501032962--18x"
    }
]

output = ""
for i, item in enumerate(data):
    output += html.format(index=i+1, title=item['title'], description=item['description'], link=item['link'])

with open('fix-scrolling.html', 'r', encoding='utf-8') as f:
    content = f.read()

start_tag = '<div class="pu-tours-voices-slider">'
end_tag = '<!-- DESKTOP SLIDER CONTROLS (Progress Line + Arrows) -->'

start_idx = content.find(start_tag)
end_idx = content.find(end_tag)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx + len(start_tag)] + "\n" + output + "\n        </div>\n\n        " + content[end_idx:]
    with open('fix-scrolling.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Success")
else:
    print("Failed to find boundaries")
