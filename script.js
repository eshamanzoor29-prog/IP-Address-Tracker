const input = document.getElementById("search-input");
const button = document.getElementById("search-btn");

const ip = document.getElementById("ip");
const locationText = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");

// --------------------
// Initialize Map
// --------------------

const map = L.map("map").setView([33.6844, 73.0479], 13);

L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
  {
    attribution: "&copy; Esri",
  }
).addTo(map);

// Marker
const marker = L.marker([33.6844, 73.0479]).addTo(map);

// --------------------
// Fetch IP Data
// --------------------

async function getIP(ipAddress = "") {
  try {
    const url = ipAddress ? `https://geo.ipify.org/api/v2/country,city?apiKey=at_OrPbyuIFToN8PKpb2uGJg729TZoYu&ipAddress=${ipAddress}` : `https://geo.ipify.org/api/v2/country,city?apiKey=at_OrPbyuIFToN8PKpb2uGJg729TZoYu`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    // Invalid IP
    if (data.code) {
      alert("Please enter a valid IP address.");
      return;
    }

    // Update Information Card
    ip.textContent = data.ip;
    locationText.textContent = `${data.location.city}, ${data.location.region}`;
    timezone.textContent = `UTC ${data.location.timezone}`;
    isp.textContent = data.isp;

    // Move Map
    const lat = data.location.lat;
    const lng = data.location.lng;

    map.setView([lat, lng], 15);

    marker.setLatLng([lat, lng]);
  } catch (error) {
    console.error(error);
    alert("Something went wrong!");
  }
}

// --------------------
// Default Load
// --------------------

getIP();

// --------------------
// Search Button
// --------------------

button.addEventListener("click", () => {
  const value = input.value.trim();

  getIP(value);
});

// --------------------
// Press Enter to Search
// --------------------

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getIP(input.value.trim());
  }
});