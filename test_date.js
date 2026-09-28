const fs = require('fs');
const html = fs.readFileSync('Tour.html', 'utf8');

const regex = /<article class="tour-card"[\s\S]*?<\/article>/g;
const articles = html.match(regex);
const art = articles[0];

const tourTop = art.match(/<div class="tour-top">([\s\S]*?)<\/div>/);
console.log("tourTop: " + JSON.stringify(tourTop));
