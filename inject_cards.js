const fs = require('fs');
let indexHTML = fs.readFileSync('index.html', 'utf8');
const generatedCards = fs.readFileSync('generated_cards.html', 'utf8');

const regex = /(<div class="pu-tours-evidence-cards-container" id="pu-tours-evidence-cards-container">)[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>)/;

// Wait, the previous addition added the button inside the $2 block or after.
// Let's first clean up if we added the button multiple times at the end
indexHTML = indexHTML.replace(/<div class="text-center mt-5" id="view-all-tours-container">[\s\S]*?<\/button>\s*<\/div>/g, '');

const viewAllButton = `
      <div class="text-center mt-5" id="view-all-tours-container">
        <button class="btn pu-tours-btn-film px-5 py-3" style="font-size: 18px; border-radius: 40px; padding: 12px 30px !important;" id="view-all-tours-btn">View All 27 Tours</button>
      </div>
`;

// Insert the button just before the closing tag of the container or after the container
// $2 is `</div> </div> </section>`
// So the first `</div>` closes the container. We should put the button AFTER the container closes, but BEFORE the next `</div>`.
indexHTML = indexHTML.replace(regex, `$1\n${generatedCards}\n</div>\n${viewAllButton}\n</div>\n</section>`);

fs.writeFileSync('index.html', indexHTML);
console.log('Successfully injected generated cards and button into index.html');
