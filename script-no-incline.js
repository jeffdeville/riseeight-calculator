const Calculation = (function () {
  // Predefined distances between cities
  const distances = {
    "New York": {
      "Los Angeles": 2445,
      Chicago: 790,
      Houston: 1630,
      Phoenix: 2150,
      Philadelphia: 95,
      "San Antonio": 1820,
      "San Diego": 2435,
    },
    "Los Angeles": {
      Chicago: 2015,
      Houston: 1547,
      Phoenix: 370,
      Philadelphia: 2405,
      "San Antonio": 1210,
      "San Diego": 120,
    },
    Chicago: {
      Houston: 940,
      Phoenix: 1750,
      Philadelphia: 760,
      "San Antonio": 1175,
      "San Diego": 2040,
    },
    Houston: {
      Phoenix: 1170,
      Philadelphia: 1540,
      "San Antonio": 200,
      "San Diego": 1505,
    },
    Phoenix: { Philadelphia: 2300, "San Antonio": 1000, "San Diego": 355 },
    Philadelphia: { "San Antonio": 1680, "San Diego": 2370 },
    "San Antonio": { "San Diego": 1315 },
  };

  // Public functions
  return {
    dailyDistance: function (hours, speed) {
      return hours * speed;
    },
    dailySteps: function (hours, speed) {
      return hours * speed * 2000; // Assuming 2000 steps per mile
    },
    yearlyDistance: function (hours, speed) {
      return this.dailyDistance(hours, speed) * 260; // 260 working days per year
    },
    closestCities: function (targetDistance) {
      let closestDistance = Infinity;
      let closestPair = ["", ""];

      // Iterate through each city pair and calculate the difference from the target distance
      for (let city1 in distances) {
        for (let city2 in distances[city1]) {
          let distance = distances[city1][city2];
          let difference = Math.abs(distance - targetDistance);

          if (difference < closestDistance) {
            closestDistance = difference;
            closestPair = [city1, city2, distance];
          }
        }
      }

      return closestPair;
    },
  };
})();

let map;
let directionsService;
let directionsRenderer;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
    streetViewControl: false,
    scaleControl: false,
    fullscreenControl: false,
    zoomControl: false,
    mapTypeControl: false,
  });
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
}

// Add your JavaScript here
function initSliders() {
  const slidersData = [
    {
      id: "hoursPerDay",
      label: " Hrs/Day",
      min: 0,
      max: 8,
      step: 0.5,
      value: 2,
    },
    { id: "avgSpeed", label: " MPH", min: 1, max: 3.5, step: 0.5, value: 1.5 },
  ];

  const slidersContainer = d3.select("#sliders");

  slidersData.forEach((sliderData) => {
    const container = slidersContainer
      .append("div")
      .attr("class", "slider-container");

    const sliderInput = container
      .append("input")
      .attr("type", "range")
      .attr("min", sliderData.min)
      .attr("max", sliderData.max)
      .attr("step", sliderData.step)
      .attr("value", sliderData.value)
      .attr("class", "slider")
      .attr("id", sliderData.id);

    sliderInput.on("input", function () {
      output.text(this.value);
    });

    const label = container.append("span").attr("class", "slider-label");

    const output = label.append("span").text(sliderData.value);

    label
      .append("span")
      // .attr('class', 'slider-label')
      .text(sliderData.label);
  });
  // Event listeners for the range sliders
  document
    .getElementById("hoursPerDay")
    .addEventListener("input", updateGauges);
  document.getElementById("avgSpeed").addEventListener("input", updateGauges);
}

function updateGauges() {
  const hours = document.getElementById("hoursPerDay").value;
  const speed = document.getElementById("avgSpeed").value;

  const dailyDistance = Calculation.dailyDistance(hours, speed);
  updateGauge("miles", dailyDistance);

  const dailySteps = Calculation.dailySteps(hours, speed);
  updateGauge("steps", dailySteps);

  // Calculate yearly distance
  const yearlyDistance = Calculation.yearlyDistance(hours, speed);
  const [city1, city2, realDistance] = Calculation.closestCities(yearlyDistance);
  updateGauge("yearly-miles", yearlyDistance);
  updateMap(city1, city2, yearlyDistance);
  console.log(city1, city2, realDistance);
}

function updateGauge(gaugeId, value) {
  document.getElementById(gaugeId).innerHTML = value;
}

function updateMap(city1, city2, distance) {
  document.getElementById("distance-walked").innerText = `That's from ${city1} to ${city2}!`;
  showWalkingDirections(city1, city2);
}

function showWalkingDirections(origin, destination) {
  const request = {
    origin: origin,
    destination: destination,
    travelMode: "WALKING",
  };

  directionsService.route(request, function (result, status) {
    if (status == "OK") {
      directionsRenderer.setDirections(result);
    } else {
      alert("Directions request failed due to " + status);
    }
  });
}

// Initialize the map and gauges on window load
window.onload = () => {
  initSliders();
  initMap().then(updateGauges);
};
