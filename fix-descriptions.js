const fs = require('fs');

const data = [
    {
        "description": "The Hyderabad Biopharma Tour was an incredible opportunity to see real-world science in action. Visiting top facilities and learning directly from industry leaders completely shifted how I view my future in pharmacy."
    },
    {
        "description": "Ending our tour by learning about vaccine production at IIL and API manufacturing at Piramal Pharma was incredible. Hearing leadership stories at Converge Biotech inspired me to think beyond textbooks and explore pharma entrepreneurship. I'm so grateful for this opportunity!"
    },
    {
        "description": "Being selected for the Social Work Leadership Tour as a first-year MSW student is a huge milestone for me. I’m excited to learn from inspiring leaders, discuss pressing social issues, and gain hands-on insights to help build a more inclusive society."
    },
    {
        "description": "Touring biotech pioneers like String Bio, Biocon, and NCBS in Bengaluru showed me the true power of scientific research. Seeing how sustainable tech and drug discovery directly improve lives inspired me to pursue my own career with a clear sense of purpose."
    },
    {
        "description": "Being chosen for the Bangalore Business Leadership Tour was a dream opportunity. Traveling alongside my team and gaining direct exposure to corporate strategy transformed my confidence and sharpened my business mindset."
    },
    {
        "description": "Earning my spot on the AI & Tech Tour through rigorous selection rounds was incredible. Getting to interact directly with CEOs and tech visionaries across Bangalore gave me a front-row seat to cutting-edge industry innovations and real-world AI applications."
    },
    {
        "description": "Experiencing Day 2 of the tour brought my classroom learning to life. Exploring fintech integration, strong governance, and strategic vision with seasoned industry heads provided me with a clear roadmap for my own career in business management."
    },
    {
        "description": "Representing Parul Institute of Ayurveda on this Leadership Tour was an incredible honor. Connecting with pioneering experts showed me firsthand how innovation and strong leadership are expanding traditional Ayurveda into the global healthcare space."
    },
    {
        "description": "Day 1 at SAM Agri in Nashik was an incredible hands-on experience! As an Agricultural Engineering student, seeing the practical mechanics of fermentation, processing, and quality control for grapes and strawberries brought our textbook concepts to life."
    },
    {
        "description": "This visit to Collins Aerospace was a major highlight of our tour. Exploring advanced aerospace systems and learning about the future of commercial and defense aviation gave me the exact motivation and direction I need for my career in the field."
    }
];

let content = fs.readFileSync('fix-scrolling.html', 'utf8');

for (let i = 0; i < data.length; i++) {
    content = content.replace('{description}', data[i].description);
}

fs.writeFileSync('fix-scrolling.html', content, 'utf8');
console.log('Success');
