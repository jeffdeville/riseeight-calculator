

// Function to initialize the map
function initMap() {
    // The location of Uluru
    var uluru = {lat: -25.344, lng: 131.036};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: uluru});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
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
