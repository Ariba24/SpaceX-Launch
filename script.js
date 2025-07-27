document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const sections = document.querySelectorAll('.tab-section');

  // Tab switching
  tabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabs.forEach(tab => tab.classList.remove('active'));
      btn.classList.add('active');
      sections.forEach(sec => sec.classList.remove('active'));
      const target = document.getElementById(btn.dataset.target);
      if (target) target.classList.add('active');
    });
  });

  // Fetch everything
  fetchLatestLaunch();
  fetchUpcomingLaunches();
  fetchPastLaunches();
  fetchStats();
});

// ---------- Utilities ----------

function getImage(url) {
  return url && url !== "" ? url : 'https://www.spacex.com/static/images/share.jpg';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
}

// ---------- Latest Launch ----------

async function fetchLatestLaunch() {
  const container = document.getElementById('latest-launch');
  try {
    const res = await fetch('https://api.spacexdata.com/v5/launches/latest');
    const data = await res.json();

    const webcast = data.links.webcast
      ? `<a href="${data.links.webcast}" target="_blank" class="btn-watch">Watch Webcast</a>`
      : '';

    let details = data.details || 'No details available for this mission.';
    if (details.length > 300) details = details.slice(0, 300) + '...';

    container.innerHTML = `
      <img src="${getImage(data.links.patch.small)}" alt="${data.name}">
      <h3>${data.name}</h3>
      <p><strong>Launch Date:</strong> ${formatDate(data.date_utc)}</p>
      <p><strong>Flight Number:</strong> ${data.flight_number}</p>
      <p><strong>Status:</strong> 
        <span style="color: ${data.success ? '#4CAF50' : '#F44336'};">
          ${data.success ? 'Successful' : data.success === false ? 'Failed' : 'Unknown'}
        </span>
      </p>
      <p>${details}</p>
      ${webcast}
    `;
  } catch (err) {
    container.innerHTML = `<p>Error loading latest launch data.</p><pre>${err.message}</pre>`;
  }
}

// ---------- Upcoming Launches ----------

async function fetchUpcomingLaunches() {
  const container = document.getElementById('upcoming-launches');
  try {
    const res = await fetch('https://api.spacexdata.com/v5/launches/upcoming');
    const launches = await res.json();

    if (!launches.length) {
      container.innerHTML = '<p>No upcoming launches at this time.</p>';
      return;
    }

    container.innerHTML = launches.slice(0, 6).map(launch => `
      <div class="launch-item">
        <img src="${getImage(launch.links.patch.small)}" alt="${launch.name}">
        <h4>${launch.name}</h4>
        <p><strong>Launch Date:</strong> ${formatDate(launch.date_utc)}</p>
        <p><strong>Flight Number:</strong> ${launch.flight_number}</p>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = `<p>Error loading upcoming launches.</p><pre>${err.message}</pre>`;
  }
}

// ---------- Past Launches ----------

async function fetchPastLaunches() {
  const container = document.getElementById('past-launches');
  try {
    const res = await fetch('https://api.spacexdata.com/v5/launches/past');
    const launches = await res.json();

    container.innerHTML = launches.slice(-6).reverse().map(launch => `
      <div class="launch-item">
        <img src="${getImage(launch.links.patch.small)}" alt="${launch.name}">
        <h4>${launch.name}</h4>
        <p><strong>Launch Date:</strong> ${formatDate(launch.date_utc)}</p>
        <p><strong>Flight Number:</strong> ${launch.flight_number}</p>
        <p><strong>Status:</strong> 
          <span style="color: ${launch.success ? '#4CAF50' : '#F44336'};">
            ${launch.success ? 'Successful' : 'Failed'}
          </span>
        </p>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = `<p>Error loading past launches.</p><pre>${err.message}</pre>`;
  }
}

// ---------- Mission Stats ----------

async function fetchStats() {
  try {
    const [launchRes, companyRes] = await Promise.all([
      fetch('https://api.spacexdata.com/v4/launches'),
      fetch('https://api.spacexdata.com/v4/company')
    ]);

    const launches = await launchRes.json();
    const company = await companyRes.json();

    const totalLaunches = launches.length;
    const successfulLandings = launches.filter(launch =>
      launch.success && launch.cores.some(core => core.landing_success)
    ).length;
    const reflights = launches.filter(launch =>
      launch.cores.some(core => core.reused)
    ).length;

    document.getElementById('total-launches').textContent = totalLaunches;
    document.getElementById('total-landings').textContent = successfulLandings;
    document.getElementById('total-reflights').textContent = reflights;
  } catch (err) {
    document.getElementById('stats').innerHTML += `<p>Error loading stats: ${err.message}</p>`;
  }
}

