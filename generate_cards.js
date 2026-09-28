const fs = require('fs');
const html = fs.readFileSync('Tour.html', 'utf8');

const regex = /<article class="tour-card"[\s\S]*?<\/article>/g;
const articles = html.match(regex);

let newCardsHTML = '';

articles.forEach((art, i) => {
  const getDataType = art.match(/data-type="([^"]+)"/)?.[1] || '';
  const getDataFaculty = art.match(/data-faculty="([^"]+)"/)?.[1] || '';
  const getDataSearch = art.match(/data-search="([^"]+)"/)?.[1] || '';
  
  const typeMatch = art.match(/<span[^>]*class="tour-type[^>]*>\s*([^<]+)\s*<\/span>/);
  const type = typeMatch ? typeMatch[1].trim() : '';
  const dateMatch = art.match(/<span[^>]*class="tour-date"[^>]*>\s*([^<]+)\s*<\/span>/);
  const date = dateMatch ? dateMatch[1].trim() : '';
  const titleMatch = art.match(/<h3>([^<]+)<\/h3>/);
  const title = titleMatch ? titleMatch[1].trim() : '';
  
  const expertsMatch = art.match(/<span><b>([^<]+)<\/b>\s*experts<\/span>/);
  const experts = expertsMatch ? expertsMatch[1].trim() + ' experts' : '';
  
  const orgsMatch = art.match(/<span><b>([^<]+)<\/b>\s*Leading Organizations<\/span>/);
  const orgs = orgsMatch ? orgsMatch[1].trim() + ' Leading Organizations' : '';
  
  let totalLogos = 0;
  if (orgsMatch) {
      totalLogos = parseInt(orgsMatch[1], 10);
  } else {
      const venuesMatch = art.match(/<p class="tour-venues">([\s\S]+?)<\/p>/);
      if (venuesMatch) {
          totalLogos = venuesMatch[1].split(/[•]/).length;
      }
  }

  let venuesHTML = '';
  if (totalLogos > 0) {
    for (let idx = 0; idx < totalLogos; idx++) {
        const isHidden = idx >= 5;
        const cls = isHidden ? 'pu-tours-hidden-logo d-none' : '';
        
        let imgSrc = 'assets/images/practical-learning-tours/practical-learning-tours-organization.svg';
        let altText = 'Organization';
        
        if (idx === 0) { imgSrc = 'assets/images/practical-learning-tours/practical-learning-tours-google.svg'; altText = 'Google'; }
        else if (idx === 1) { imgSrc = 'assets/images/practical-learning-tours/practical-learning-tours-ibm.svg'; altText = 'IBM'; }
        else if (idx === 2) { imgSrc = 'assets/images/practical-learning-tours/practical-learning-tours-nse.svg'; altText = 'NSE'; }
        
        venuesHTML += `              <div class="pu-tours-logo-box ${cls}"><img src="${imgSrc}" alt="${altText}"></div>\n`;
        
        if (idx === 4 && totalLogos > 5) {
            venuesHTML += `              <div class="pu-tours-logo-box pu-tours-logo-box-text pu-tours-show-more-logos" style="cursor: pointer;" title="Show more logos">+${totalLogos - 5} more</div>\n`;
        }
    }
  }

  const facultyMatch = art.match(/<span class="faculty-chip">([^<]+)<\/span>/);
  const faculty = facultyMatch ? facultyMatch[1].trim() : '';
  
  const youtubeUrlMatch = art.match(/<a class="tour-link watch" href="([^"]+)"/);
  const youtubeUrl = youtubeUrlMatch ? youtubeUrlMatch[1] : '#';
  let youtubeId = '';
  if (youtubeUrl.includes('youtu.be/')) youtubeId = youtubeUrl.split('youtu.be/')[1];
  else if (youtubeUrl.includes('youtube.com/watch?v=')) youtubeId = youtubeUrl.split('youtube.com/watch?v=')[1];
  
  const storyUrlMatch = art.match(/<a[^>]+href="([^"]+)"[^>]*>Story/i);
  const storyUrl = storyUrlMatch ? storyUrlMatch[1] : '#';
  const storyButtonHTML = storyUrl !== '#' ? `<a href="${storyUrl}" target="_blank" rel="noopener noreferrer" class="btn pu-tours-btn-story d-flex align-items-center gap-2">Story <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg></a>` : '';
  
  newCardsHTML += `
      <!-- Tour Card ${i+1} -->
      <div class="pu-tours-evidence-card mb-5 tour-card" data-type="${getDataType}" data-faculty="${getDataFaculty}" data-search="${getDataSearch}">
        <div class="row g-0 h-100">
          <!-- Card Left Content -->
          <div class="col-12 col-lg-6 d-flex flex-column p-4 p-lg-5">
            <div class="d-flex justify-content-between align-items-start mb-4">
              <span class="pu-tours-evidence-pill pu-tours-evidence-pill-light">${type}</span>
              ${date ? `<span class="pu-tours-evidence-pill pu-tours-evidence-pill-light">${date}</span>` : ''}
            </div>
            
            <h3 class="pu-tours-evidence-card-title mb-4">${title}</h3>
            
            <div class="d-flex gap-2 mb-4">
              ${experts ? `<span class="pu-tours-evidence-pill-small">${experts}</span>` : ''}
              ${orgs ? `<span class="pu-tours-evidence-pill-small">${orgs}</span>` : ''}
            </div>
            
            <div class="pu-tours-evidence-logos d-flex flex-wrap gap-2 mb-4 mb-lg-auto">
${venuesHTML}            </div>
            
            <div class="d-flex align-items-center justify-content-between mt-lg-5 pt-3 border-top border-light border-opacity-25">
              <span class="pu-tours-evidence-faculty text-white">${faculty}</span>
              <div class="d-flex gap-3">
                <a href="${youtubeUrl}" target="_blank" rel="noopener noreferrer" class="btn pu-tours-btn-film d-flex align-items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> Film
                </a>
                ${storyButtonHTML}
              </div>
            </div>
          </div>
          
          <!-- Card Right Video -->
          <div class="col-12 col-lg-6 p-4">
            <div class="pu-tours-evidence-video-wrapper h-100">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${youtubeId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>`;
});

fs.writeFileSync('generated_cards.html', newCardsHTML);
console.log('Cards generated: ' + articles.length);
