console.log("Welcome to the Community Portal");
window.onload = () => alert("Page loaded!");

// Event Class
class Event {
  constructor(name, date, seats, type) {
    this.name = name;
    this.date = new Date(date);
    this.seats = seats;
    this.type = type;
  }
  checkAvailability() {
    return this.date > new Date() && this.seats > 0;
  }
}

// Sample Events
let events = [
  new Event("Art Fest", "2025-06-10", 10, "Workshop"),
  new Event("Music Jam", "2025-06-01", 5, "Music"),
  new Event("Code Sprint", "2025-07-01", 0, "Tech")
];

// CRUD and filtering
function addEvent(event) {
  events.push(event);
}
function filterEventsByCategory(category) {
  return category === "All"
    ? events
    : events.filter(event => event.type === category);
}
function searchEventsByName(name) {
  return events.filter(event =>
    event.name.toLowerCase().includes(name.toLowerCase())
  );
}

// Render to DOM
const container = document.querySelector("#eventContainer");
const formSelect = document.querySelector("form select");

function renderEvents(eventList) {
  container.innerHTML = "";
  formSelect.innerHTML = "";

  eventList.forEach(event => {
    if (!event.checkAvailability()) return;

    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <strong>${event.name}</strong> (${event.type})<br/>
      Date: ${event.date.toDateString()}<br/>
      Seats: ${event.seats}<br/>
      <button onclick="register('${event.name}')">Register</button>
    `;
    container.appendChild(card);

    const option = document.createElement("option");
    option.text = event.name;
    formSelect.add(option);
  });
}
renderEvents(events);

// Register
function register(eventName) {
  const event = events.find(e => e.name === eventName);
  try {
    if (event && event.seats > 0) {
      event.seats--;
      alert(`Registered for ${event.name}`);
      renderEvents(events);
    } else throw new Error("No seats available or event not found");
  } catch (err) {
    console.error(err.message);
  }
}

// Form Handling
document.querySelector("#regForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const { username, email, event: eventField } = e.target.elements;
  if (!username.value || !email.value) {
    alert("Please fill all fields");
    return;
  }
  console.log("Form Submitted:", username.value, email.value, eventField.value);
  register(eventField.value);
});

// Filters
document.querySelector("#categoryFilter").onchange = function (e) {
  renderEvents(filterEventsByCategory(e.target.value));
};
document.querySelector("#searchInput").onkeydown = function (e) {
  if (e.key === "Enter") {
    renderEvents(searchEventsByName(e.target.value));
  }
};

// Async fetch simulation
async function fetchMockEvents() {
  try {
    console.log("Fetching events...");
    const mockResponse = await new Promise((res) =>
      setTimeout(() => res([
        new Event("Yoga Class", "2025-07-15", 8, "Workshop")
      ]), 1000)
    );
    mockResponse.forEach(e => addEvent(e));
    renderEvents(events);
  } catch (err) {
    console.error("Failed to fetch events:", err);
  }
}
fetchMockEvents();

// Modern JS (Destructuring, spread)
const clone = [...events];
const [{ name, date }] = clone;
console.log(`First event: ${name} on ${date.toDateString()}`);