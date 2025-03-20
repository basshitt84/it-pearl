




document.getElementById('weatherForm').addEventListener('submit', async function (event) {
  event.preventDefault(); // Stop form from reloading the page

  console.log('Form submitted'); // Debugging

  // Get user input
  const locationInput = document.getElementById('location').value.trim();
  const loading = document.getElementById('loading');
  const errorMessage = document.getElementById('error-message');

  // Show loading message and clear previous results/errors
  loading.style.display = 'block';
  errorMessage.textContent = '';
  document.getElementById('forecast-table').innerHTML = '';
  document.getElementById('forecast-chart').style.display = 'none';

  try {
      console.log('Fetching geolocation data...'); // Debugging

      // Step 1: Fetch geolocation data from OpenStreetMap Nominatim
      const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationInput)}`;
      const geoResponse = await fetch(geoUrl);
      if (!geoResponse.ok) throw new Error('Failed to fetch location data.');
      const geoData = await geoResponse.json();

      if (geoData.length === 0) {
          throw new Error('No matching location found.');
      }

      // Extract location details
      const { lat, lon, display_name } = geoData[0];
      document.getElementById('latitude').textContent = lat;
      document.getElementById('longitude').textContent = lon;
      document.getElementById('place-name').textContent = display_name;

      console.log(`Location found: ${display_name} (${lat}, ${lon})`);

      // Step 2: Fetch weather forecast
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&temperature_unit=fahrenheit`;
      const weatherResponse = await fetch(weatherUrl);
      if (!weatherResponse.ok) throw new Error('Failed to fetch weather data.');
      const weatherData = await weatherResponse.json();

      console.log('Weather Data:', weatherData); // Debugging

      // Ensure hourly data exists
      if (!weatherData.hourly || !weatherData.hourly.time || !weatherData.hourly.temperature_2m) {
          throw new Error('Weather data is missing required fields.');
      }

      // Extract only the next 12 hours
      const times = weatherData.hourly.time.slice(0, 12); // First 12 hours
      const temperatures = weatherData.hourly.temperature_2m.slice(0, 12);

      // Convert date/time to a friendly format
      const formattedDates = times.map(time => {
          const unixmillsec = Date.parse(time);
          return new Date(unixmillsec).toLocaleString();
      });

      // Step 3: Display forecast as a table
      const forecastTable = document.getElementById('forecast-table');
      forecastTable.innerHTML = ''; // Clear previous data
      for (let i = 0; i < formattedDates.length; i++) {
          const row = document.createElement('tr');
          row.innerHTML = `<td>${formattedDates[i]}</td><td>${temperatures[i]}°F</td>`;
          forecastTable.appendChild(row);
      }

      // Step 4: Display forecast as a line chart
      const ctx = document.getElementById('forecast-chart').getContext('2d');
      if (window.forecastChart) window.forecastChart.destroy(); // Destroy previous chart instance
      window.forecastChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: formattedDates,
              datasets: [{
                  label: 'Temperature (°F)',
                  data: temperatures,
                  borderColor: '#008080',
                  backgroundColor: 'rgba(0, 128, 128, 0.2)',
                  borderWidth: 2,
                  tension: 0.3
              }]
          },
          options: {
              responsive: true,
              plugins: {
                  legend: { display: true }
              }
          }
      });

      // Show chart
      document.getElementById('forecast-chart').style.display = 'block';

  } catch (error) {
      console.error('Error:', error.message);
      errorMessage.textContent = error.message;
  } finally {
      loading.style.display = 'none';
  }
});

// Trigger the form submission automatically for default location on page load
window.addEventListener('load', function () {
    document.getElementById('weatherForm').dispatchEvent(new Event('submit'));
});
$(document).ready(function() {

    $('.fade').slick({
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      slide: 'div',
      cssEase: 'linear',
      autoplay: true,
      autoplaySpeed: 2000
    });


});
