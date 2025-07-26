
🚀 SpaceX Launch Tracker
The SpaceX Launch Tracker is a sleek, responsive web application that provides real-time updates on SpaceX missions. Track the latest, upcoming, and past launches, explore detailed stats, and learn about SpaceX's powerful rocket fleet — all in a beautifully animated, space-themed UI.

🌟 Features
🛰️ Latest Launch – View details of the most recent SpaceX launch.

📅 Upcoming Missions – Stay updated on scheduled future launches.

📜 Past Launches – Explore historic mission data.

🚀 Rocket Fleet – Discover technical details of Falcon 9, Falcon Heavy, and Starship.

📊 Mission Stats – Dive into launch success rates and statistics.

📱 Responsive Design – Optimized for desktop, tablet, and mobile views.

🌌 Space-Themed UI – Animations, gradients, and cosmic visuals for a stunning experience.

🛠️ Technologies Used
HTML5

CSS3 – including keyframe animations and gradients

JavaScript (ES6+)

SpaceX API v4/v5

Google Fonts – Orbitron & Space Mono

📁 Project Structure
graphql
Copy
Edit
spacex-launch-tracker/
│
├── index.html              # Main application file
├── css/
│   └── style.css           # All styles and animations
├── js/
│   └── script.js           # API logic and UI rendering
└── images/                 # SpaceX rocket images
    ├── falcon9.png
    ├── falcon-heavy.png
    └── starship.png
🔗 API Endpoints Used
GET https://api.spacexdata.com/v5/launches/latest

GET https://api.spacexdata.com/v5/launches/upcoming

GET https://api.spacexdata.com/v5/launches/past

GET https://api.spacexdata.com/v4/company

GET https://api.spacexdata.com/v4/launches

🚀 Installation & Setup
bash
Copy
Edit
# Clone the repository
git clone https://github.com/yourusername/spacex-launch-tracker.git

# Move into the project folder
cd spacex-launch-tracker

# Open in your browser
open index.html
✅ No server or build tools required – fully client-side app!

🎨 Customization Tips
Colors: Edit in css/style.css (search for variables or color codes).

Fonts: Replace Google Font links in <head> of index.html.

Animations: Modify keyframes and durations in the CSS file.

Layout: Tweak flexbox/grid settings to redesign sections.

🧩 Troubleshooting
Images Not Showing?
Confirm correct filenames and extensions in /images

Ensure you're using a local server if you're accessing from file://

Check browser console (F12) for 404 errors

API Not Loading?
Check browser console for CORS or fetch errors

Ensure you are connected to the internet

Visit SpaceX API status for maintenance updates

📄 License
This project is licensed under the MIT License – see the LICENSE file for details.

🙏 Acknowledgments
SpaceX – for the public API

NASA – for space visuals

Unsplash – for background assets

Google Fonts – typography

📬 Contact
Built with 💻 by Ariba Arzi
Feel free to reach out with suggestions, collaborations, or just to say hi!
