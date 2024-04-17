const Calculation = (function () {
  // Private function to calculate calories burned
  function calculateCaloriesBurned(weightPounds, speedMph, inclineDegrees) {
    const baseMets = {
      1: 2.0,
      1.5: 2.2,
      2: 2.8,
      2.5: 3.0,
      3: 3.3,
      3.5: 3.8,
    };
    const inclineAdjustments = {
      3: 30,
      6: 50,
      9: 70,
      12: 90,
    };

    const weightKg = weightPounds * 0.453592;
    const speeds = Object.keys(baseMets)
      .map(Number)
      .sort((a, b) => a - b);
    const closestSpeed = speeds.reduce((prev, curr) =>
      Math.abs(curr - speedMph) < Math.abs(prev - speedMph) ? curr : prev
    );
    const baseMet = baseMets[closestSpeed];
    const inclineAdjustment = inclineAdjustments[inclineDegrees] || 0;
    const adjustedMet = baseMet * (1 + inclineAdjustment / 100);
    const caloriesPerMinute = (adjustedMet * weightKg * 3.5) / 200;

    return caloriesPerMinute * 60;
  }

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
    dailyCalories: function (hours, speed, incline) {
      const averageWeight = 180; // assuming an average weight of 180 pounds for calculations
      const caloriesPerHour = calculateCaloriesBurned(
        averageWeight,
        speed,
        incline
      );
      return caloriesPerHour * hours;
    },
    yearlyDistance: function (hours, speed) {
      return this.dailyDistance(hours, speed) * 260; // 260 working days per year
    },
    yearlyPounds: function (hours, speed, incline) {
      const dailyCal = this.dailyCalories(hours, speed, incline);
      return (dailyCal * 260) / 3500; // 3500 calories per pound of fat
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
                  closestPair = [city1, city2];
              }
          }
      }

      return closestPair;
    }
  };
})();


// // Example usage:
// console.log("Daily Distance:", Calculation.dailyDistance(2, 3)); // 6 miles
// console.log("Daily Steps:", Calculation.dailySteps(2, 3)); // 12000 steps
// console.log("Daily Calories:", Calculation.dailyCalories(2, 3, 6)); // calories burned in 2 hours at 3 mph with a 6 degrees incline
// console.log("Yearly Distance:", Calculation.yearlyDistance(2, 3)); // yearly miles based on 260 working days
// console.log("Yearly Pounds:", Calculation.yearlyPounds(2, 3, 6)); // pounds lost/gained based on calories burned over 260 days
// Example usage: find cities closest to a given distance
// console.log(Calcuculation.closestCities(1000)); // Change 1000 to any target distance to test
