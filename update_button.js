const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldButtonRegex = /<button class="btn pu-tours-btn-film[^>]+id="view-all-tours-btn"[^>]*>.*?<\/button>/;
const newButton = `<button class="btn px-5 py-3" style="background-color: #16074a !important; color: #ffffff !important; font-size: 18px; border-radius: 40px; padding: 16px 40px !important; font-family: var(--font-figtree-semibold) !important; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: none;" id="view-all-tours-btn">Browse all 27 tours</button>`;

if (oldButtonRegex.test(html)) {
  html = html.replace(oldButtonRegex, newButton);
  fs.writeFileSync('index.html', html);
  console.log('Button updated');
} else {
  console.log('Button not found');
}
