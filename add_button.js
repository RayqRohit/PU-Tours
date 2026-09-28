const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const endPattern = /<\/div>\s*<\/div>\s*<\/section>/;
const replacement = '</div>\n\n      <div class="text-center mt-5" id="view-all-tours-container">\n        <button class="btn pu-tours-btn-film px-5 py-3" style="font-size: 18px; border-radius: 40px; padding: 12px 30px !important;" id="view-all-tours-btn">View All 27 Tours</button>\n      </div>\n\n    </div>\n  </section>';

if (endPattern.test(html)) {
  html = html.replace(endPattern, replacement);
  fs.writeFileSync('index.html', html);
  console.log('Button added successfully');
} else {
  console.log('Pattern not found');
}
