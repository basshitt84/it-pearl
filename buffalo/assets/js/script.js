 // Back to Top Button
 
 jQuery(document).ready(function($) {
  var progressPath = document.querySelector('.progress-wrap path');
  var pathLength = progressPath.getTotalLength();

  progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
  progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

  var updateProgress = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength / height);
    progressPath.style.strokeDashoffset = progress;
  };

  updateProgress();

  $(window).scroll(function () {
    updateProgress();
    if ($(this).scrollTop() > 50) {
      $('.progress-wrap').addClass('active-progress');
    } else {
      $('.progress-wrap').removeClass('active-progress');
    }
  });

  $('.progress-wrap').on('click', function (event) {
    event.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 550);
    return false;
  });
});

// Hamburger Menu

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navList = document.querySelector('.nav-list');

  hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
  document.body.classList.toggle('#menu-open');
  });
});

// Water Level

document.addEventListener("DOMContentLoaded", function () {
const ctx = document.getElementById("waterLevelChart").getContext("2d");

// Function to fetch water level data for a specific river site
const fetchData = async (siteCode, days) => {
  const url = `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${siteCode}&indent=on&period=P${days}D&siteStatus=active&parameterCd=00065`;
  try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  // Map over the returned data to create an array of objects with a date/time and value
  return data.value.timeSeries[0].values[0].value.map(item => ({
     dateTime: item.dateTime,
     value: parseFloat(item.value)
  }));
  } catch (error) {
  console.error("Error fetching data:", error);
  return null; // Return null if there's an error
  }
};

// Function to update the chart with new data from the selected site.
const updateChart = async (siteCode, days = 7) => {
  const waterData = await fetchData(siteCode, days);

  if (waterData) {
  // Create labels that reflect the actual date/time each measurement was gathered
  const labels = waterData.map(entry => new Date(entry.dateTime).toLocaleString());
  const values = waterData.map(entry => entry.value);

  // Chart configuration using the fetched labels and values
  const chartData = {
    labels: labels,
    datasets: [{
    label: "Water Level (ft)",
    data: values,
    backgroundColor: "rgba(0, 128, 255, 0.5)",
    borderColor: "rgba(0, 128, 255, 1)",
    borderWidth: 2,
    fill: true
    }]
  };

  const config = {
    type: "line",
    data: chartData,
    options: {
    responsive: true,
    maintainAspectRatio: false,  // Needed for auto fit resizing
    plugins: {
      legend: {
      position: "top",
      }
    },
    scales: {
      y: {
      beginAtZero: false,
      title: {
        display: true,
        text: "Water Level (ft)"
      }
      },
      x: {
      title: {
        display: true,
        text: "Date and Time"
      }
      }
    }
    }
  };

  // Clear previous chart if one exists and create a new Chart instance
  if (window.chartInstance) {
    window.chartInstance.destroy();
  }
  window.chartInstance = new Chart(ctx, config);
  } else {
  alert("Unable to retrieve water level data. Please try again later.");
  }
};

// Set a default site code from one of the header buttons (assumes at least one exists)
const defaultSiteCode = document.querySelector('.buttons button').dataset.siteCode;
updateChart(defaultSiteCode, 7);

// Connect header buttons so clicking one updates the chart with that site's data
document.querySelectorAll('.buttons button').forEach(button => {
  button.addEventListener('click', () => {
  const siteCode = button.dataset.siteCode;
  updateChart(siteCode, 7);
  });
});
});



document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=33.6&longitude=54.6&daily=rain_sum,temperature_2m_min,temperature_2m_max&current_weather=true&timezone=America%2FChicago";

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("weatherData");
      container.innerHTML = "";

      // Add current weather
      const currentWeather = document.createElement("div");
      currentWeather.classList.add("data-item");
      currentWeather.innerHTML = `
        <h3>Current Weather</h3>
        <p><strong>Temperature:</strong> ${data.current_weather.temperature} °F</p>
        <p><strong>Rain:</strong> ${data.current_weather.rain} inches</p>
      `;
      container.appendChild(currentWeather);

      // Add daily forecast
      data.daily.time.forEach((day, index) => {
        const forecastItem = document.createElement("div");
        forecastItem.classList.add("data-item");
        forecastItem.innerHTML = `
          <h3>${new Date(day).toLocaleDateString()}</h3>
          <p><strong>High of:</strong> ${data.daily.temperature_2m_max[index]} °F</p>
          <p><strong>Low of:</strong> ${data.daily.temperature_2m_min[index]} °F</p>
          <p><strong>Rain:</strong> ${data.daily.rain_sum[index]} inches</p>
        `;
        container.appendChild(forecastItem);
      });
    })
    .catch(error => console.error("Error fetching data:", error));
});



document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=33.6&longitude=54.6&daily=rain_sum,temperature_2m_min,temperature_2m_max&current_weather=true&timezone=America%2FChicago";

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("weatherData");
      container.innerHTML = "";

      // Add current weather
      const currentWeather = document.createElement("div");
      currentWeather.classList.add("data-item");
      currentWeather.innerHTML = `
        <h3>Current Weather</h3>
        <p><strong>Temperature:</strong> ${data.current_weather.temperature} °F</p>
        <p><strong>Rain:</strong> ${data.current_weather.rain} inches</p>
      `;
      container.appendChild(currentWeather);

      // Add daily forecast
      data.daily.time.forEach((day, index) => {
        const forecastItem = document.createElement("div");
        forecastItem.classList.add("data-item");

        // Format day with weekday
        const formattedDate = new Date(day).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });
        forecastItem.innerHTML = `
          <h3>${formattedDate}</h3>
          <p><strong>High of:</strong> ${data.daily.temperature_2m_max[index]} °F</p>
          <p><strong>Low of:</strong> ${data.daily.temperature_2m_min[index]} °F</p>
          <p><strong>Rain:</strong> ${data.daily.rain_sum[index]} inches</p>
        `;
        container.appendChild(forecastItem);
      });
    })
    .catch(error => console.error("Error fetching data:", error));
});

