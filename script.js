let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

function drawGauge(elementId, value, max, unit) {
  const svg = d3
    .select(`#${elementId}`)
    .append("svg")
    .attr("viewBox", "-100 -100 200 125");

  // Gauge background
  svg
    .append("path")
    .attr(
      "d",
      d3
        .arc()
        .innerRadius(60)
        .outerRadius(70)
        .startAngle(-Math.PI / 2)
        .endAngle(Math.PI / 2)
        .cornerRadius(10)
    )
    .style("fill", "#ccc");

  // Gauge fill
  const percent = value / max;
  svg
    .append("path")
    .attr(
      "d",
      d3
        .arc()
        .innerRadius(60)
        .outerRadius(70)
        .startAngle(-Math.PI / 2)
        .endAngle(-Math.PI / 2 + percent * Math.PI)
        .cornerRadius(10)
    )
    .style("fill", "orange");

  // Text for value
  svg
    .append("text")
    .attr("x", 0)
    .attr("y", 0)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-family", "Arial")
    .text(value);

  // Text for unit
  svg
    .append("text")
    .attr("x", 0)
    .attr("y", 25)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .style("font-family", "Arial")
    .text(unit);
}

// Example data
drawGauge("caloriesGauge", 320, 500, "Calories");
drawGauge("milesGauge", 5, 10, "Miles");
drawGauge("stepsGauge", 3000, 10000, "Steps");


function updateGauges() {
  const hours = document.getElementById("hours").value;
  const speed = document.getElementById("speed").value;
  const incline = document.getElementById("incline").value;

  // Update gauges here using D3
  // ...

  // Calculate yearly distance
  const yearlyDistance = calculateYearlyDistance(hours, speed);
  const steps = calculateSteps(speed, hours);
  const calories = calculateCalories(hours, speed, incline);

  // Update map based on closest cities
  updateMap(yearlyDistance);
}

function calculateYearlyDistance(hours, speed) {
  // Perform calculation based on inputs
  // ...
  return yearlyDistance;
}

function calculateSteps(speed, hours) {
  // Assume a fixed step count per mile and calculate steps
  // ...
  return steps;
}

function calculateCalories(hours, speed, incline) {
  // Use previously defined method to calculate calories
  // ...
  return calories;
}

function updateMap(distance) {
  // Logic to find the closest cities and update the map
  // ...
}

// Event listeners for the range sliders
document.getElementById("hours").addEventListener("input", updateGauges);
document.getElementById("speed").addEventListener("input", updateGauges);
document.getElementById("incline").addEventListener("input", updateGauges);

// Initialize the map and gauges on window load
window.onload = () => {
  initMap();
  updateGauges();
};

// let map;

// async function initMap() {
//   const { Map } = await google.maps.importLibrary("maps");

//   map = new Map(document.getElementById("map"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8,
//   });
// }

// initMap();

// function drawGauge(elementId, value, max, unit) {
//   const svg = d3
//     .select(`#${elementId}`)
//     .append("svg")
//     .attr("viewBox", "-100 -100 200 125");

//   // Gauge background
//   svg
//     .append("path")
//     .attr(
//       "d",
//       d3
//         .arc()
//         .innerRadius(60)
//         .outerRadius(70)
//         .startAngle(-Math.PI / 2)
//         .endAngle(Math.PI / 2)
//         .cornerRadius(10)
//     )
//     .style("fill", "#ccc");

//   // Gauge fill
//   const percent = value / max;
//   svg
//     .append("path")
//     .attr(
//       "d",
//       d3
//         .arc()
//         .innerRadius(60)
//         .outerRadius(70)
//         .startAngle(-Math.PI / 2)
//         .endAngle(-Math.PI / 2 + percent * Math.PI)
//         .cornerRadius(10)
//     )
//     .style("fill", "orange");

//   // Text for value
//   svg
//     .append("text")
//     .attr("x", 0)
//     .attr("y", 0)
//     .attr("text-anchor", "middle")
//     .style("font-size", "20px")
//     .style("font-family", "Arial")
//     .text(value);

//   // Text for unit
//   svg
//     .append("text")
//     .attr("x", 0)
//     .attr("y", 25)
//     .attr("text-anchor", "middle")
//     .style("font-size", "12px")
//     .style("font-family", "Arial")
//     .text(unit);
// }

// // Example data
// drawGauge("caloriesGauge", 320, 500, "Calories");
// drawGauge("milesGauge", 5, 10, "Miles");
// drawGauge("stepsGauge", 3000, 10000, "Steps");
