document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const sections = document.querySelectorAll('.tab-section');

  // Tab Switching
  tabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabs.forEach((tab) => tab.classList.remove('active'));
      btn.classList.add('active');
      sections.forEach((sec) => sec.classList.remove('active'));
      document.getElementById(btn.dataset.target).classList.add('active');
    });
  });

  // Fetch Data
  fetchLatestLaunch();
  fetchUpcomingLaunches();
  fetchPastLaunches();
  fetchStats();
});

// Helper function to return fallback image
function getImage(url) {
  return url && url !== "" ? url : 'https://www.spacex.com/static/images/share.jpg';
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
}

// Fetch Latest Launch
async function fetchLatestLaunch() {
  try {
    const res = await fetch('https://api.spacexdata.com/v5/launches/latest');
    const data = await res.json();
    
    let webcastButton = '';
    if (data.links.webcast) {
      webcastButton = `<a href="${data.links.webcast}" target="_blank" class="btn-watch">Watch Webcast</a>`;
    }
    
    let details = data.details || 'No details available for this mission.';
    if (details.length > 300) {
      details = details.substring(0, 300) + '...';
    }
    
    document.getElementById('latest-launch').innerHTML = `
      <img src="${getImage(data.links.patch.small)}" alt="${data.name}">
      <h3>${data.name}</h3>
      <p><strong>Launch Date:</strong> ${formatDate(data.date_utc)}</p>
      <p><strong>Flight Number:</strong> ${data.flight_number}</p>
      ${data.success ? `<p><strong>Status:</strong> <span style="color: #4CAF50;">Successful</span></p>` : 
        `<p><strong>Status:</strong> <span style="color: #F44336;">${data.success === false ? 'Failed' : 'Unknown'}</span></p>`}
      <p>${details}</p>
      ${webcastButton}
    `;
  } catch (error) {
    console.error("Error fetching latest launch:", error);
    document.getElementById('latest-launch').innerHTML = `
      <p>Error loading latest launch data. Please try again later.</p>
      <p>${error.message}</p>
    `;
  }
}

// Fetch Upcoming Launches
async function fetchUpcomingLaunches() {
  try {
    const res = await fetch('https://api.spacexdata.com/v5/launches/upcoming');
    const data = await res.json();
    const container = document.getElementById('upcoming-launches');
    
    if (data.length === 0) {
      container.innerHTML = '<p>No upcoming launches scheduled at this time.</p>';
      return;
    }
    
    container.innerHTML = data.slice(0, 6).map(launch => `
      <div class="launch-item">
        <img src="${getImage(launch.links.patch.small)}" alt="${launch.name}">
        <h4>${launch.name}</h4>
        <p><strong>Launch Date:</strong> ${formatDate(launch.date_utc)}</p>
        <p><strong>Flight Number:</strong> ${launch.flight_number}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error("Error fetching upcoming launches:", error);
    document.getElementById('upcoming-launches').innerHTML = `
      <p>Error loading upcoming launches. Please try again later.</p>
      <p>${error.message}</p>
    `;
  }
}

// Fetch Past Launches
async function fetchPastLaunches() {
  try {
    const res = await fetch('https://api.spacexdata.com/v5/launches/past');
    const data = await res.json();
    const container = document.getElementById('past-launches');
    
    container.innerHTML = data.slice(-6).reverse().map(launch => `
      <div class="launch-item">
        <img src="${getImage(launch.links.patch.small)}" alt="${launch.name}">
        <h4>${launch.name}</h4>
        <p><strong>Launch Date:</strong> ${formatDate(launch.date_utc)}</p>
        <p><strong>Flight Number:</strong> ${launch.flight_number}</p>
        ${launch.success ? `<p><strong>Status:</strong> <span style="color: #4CAF50;">Successful</span></p>` : 
          `<p><strong>Status:</strong> <span style="color: #F44336;">Failed</span></p>`}
      </div>
    `).join('');
  } catch (error) {
    console.error("Error fetching past launches:", error);
    document.getElementById('past-launches').innerHTML = `
      <p>Error loading past launches. Please try again later.</p>
      <p>${error.message}</p>
    `;
  }
}

// Fetch Stats
async function fetchStats() {
  try {
    // Fetch company info
    const companyRes = await fetch('https://api.spacexdata.com/v4/company');
    const companyData = await companyRes.json();
    
    // Fetch launch stats
    const launchesRes = await fetch('https://api.spacexdata.com/v4/launches');
    const launchesData = await launchesRes.json();
    
    // Calculate stats
    const totalLaunches = launchesData.length;
    const successfulLandings = launchesData.filter(launch => launch.success && launch.cores.some(core => core.landing_success)).length;
    const reflownRockets = launchesData.filter(launch => launch.cores.some(core => core.reused)).length;
    
    // Update DOM
    document.getElementById('total-launches').textContent = totalLaunches;
    document.getElementById('total-landings').textContent = successfulLandings;
    document.getElementById('total-reflights').textContent = reflownRockets;
  } catch (error) {
    console.error("Error fetching stats:", error);
    document.getElementById('stats').innerHTML += `
      <p>Error loading some statistics. ${error.message}</p>
    `;
  }
}
