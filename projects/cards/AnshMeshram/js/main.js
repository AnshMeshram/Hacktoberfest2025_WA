// Dynamic About Me Card Script
const GITHUB_USERNAME = "anshmeshram"; // replace with your GitHub username
const LEETCODE_USERNAME = "anshmeshram"; // replace with your LeetCode username

const el = (id) => document.getElementById(id);

// Fetch GitHub Top Repos
async function fetchGitHubRepos() {
  const target = el("repos");
  if (!target) return;
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=3`
    );
    if (!res.ok) throw new Error("GitHub API error");
    const data = await res.json();
    if (Array.isArray(data) && data.length) {
      const repoNames = data
        .map((r) => r.name)
        .filter(Boolean)
        .slice(0, 3)
        .join(", ");
      target.textContent = repoNames || "No Repos Found";
    } else {
      target.textContent = "No Repos Found";
    }
  } catch (err) {
    console.warn("fetchGitHubRepos error:", err);
    target.textContent = "N/A";
  }
}

// Fetch LeetCode Stats (Using unofficial API)
async function fetchLeetCodeStats() {
  const target = el("leetcode");
  if (!target) return;
  try {
    const res = await fetch(
      `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`
    );
    if (!res.ok) throw new Error("LeetCode API error");
    const data = await res.json();
    const solved = (data && (data.totalSolved ?? data.solved)) || 0;
    target.textContent = String(solved);
  } catch (err) {
    console.warn("fetchLeetCodeStats error:", err);
    target.textContent = "N/A";
  }
}

// Simulate GitHub Streak (placeholder)
const streakEl = el("streak");
if (streakEl) streakEl.textContent = "🔥 25 Days";

// Dynamic "Now Coding" message
const projects = [
  "Spotify Clone 🎵",
  "Gesture Visualizer ✋",
  "AI Summarizer 🧠",
  "PLC Pilot Plant ⚙️",
  "Portfolio Revamp 🌐",
];

let i = 0;
function cycleProjects() {
  const p = el("project");
  if (!p) return;
  p.textContent = projects[i];
  i = (i + 1) % projects.length;
}

// start cycling, but keep handle in case we want to clear it later
const projectInterval = setInterval(cycleProjects, 4000);

// Initialize Fetch Calls
fetchGitHubRepos();
fetchLeetCodeStats();
cycleProjects();
