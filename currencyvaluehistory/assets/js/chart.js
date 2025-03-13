async function GetCurrencyData() {
    "use strict";

    let baseCurrency = document.getElementById("baseCurrency").value;
    let convertCurrency = document.getElementById("convertCurrency").value;
    let fromDate = document.getElementById("fromDate").value;
    let toDate = document.getElementById("toDate").value;
    let apiKey = "aRfJuGZnw49uO4q_Z0tOkjBkFkQ1kh14";  // Replace with your actual API key

    // Construct the API URL
    let apiURL = `https://api.polygon.io/v2/aggs/ticker/C:${baseCurrency}${convertCurrency}/range/1/day/${fromDate}/${toDate}?apiKey=${apiKey}`;
    console.log(`Request URL: ${apiURL}`); // Debugging the request URL

    try {
        let response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error("Unable to fetch data. Please check your API key or the URL.");
        }

        let data = await response.json();

        // Check if the response contains valid data
        if (data.results && data.results.length > 0) {
            DisplayChart(data, baseCurrency, convertCurrency);
        } else {
            alert("No data available for the selected date range.");
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        alert(error.message);  // Show the error message to the user
    }
}

function DisplayChart(data, base, convert) {
    "use strict";

    let ctx = document.getElementById("currencyChart").getContext("2d");
    
    let chartContainer = document.getElementById("currencyChart");
    chartContainer.width = chartContainer.offsetWidth;   // Use the container's width
    chartContainer.height = 100;  // Fixed height for the chart

    // Extract dates and values from the API response
    let labels = data.results.map(entry => new Date(entry.t).toLocaleDateString());
    let values = data.results.map(entry => entry.c);  // Closing value

    // Check if there's an existing chart and destroy it
    if (window.currencyChart && window.currencyChart instanceof Chart) {
        console.log("Destroying existing chart");
        window.currencyChart.destroy(); // Only destroy if it's a valid Chart object
    }

    // Create a new chart
    console.log("Creating new chart");
    window.currencyChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: `Exchange Rate: ${base} to ${convert}`,
                data: values,
                borderColor: "teal",
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,  // Ensure that the aspect ratio is maintained
            scales: {
                x: {
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10  // Limit the number of ticks shown
                    }
                },
                y: {
                    ticks: {
                        beginAtZero: true
                    }
                }
            }
        }
    });

    console.log(window.currencyChart); // Log the chart object to verify it's created
}
