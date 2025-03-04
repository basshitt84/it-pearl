$(document).ready(function() {
    // Initialize Chart
    const ctx = document.getElementById('chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: '',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    // Handle Form Submission
    $('#currency-form').submit(function(event) {
        event.preventDefault();

        const fromCurrency = $('#from-currency').val();
        const toCurrency = $('#to-currency').val();
        const fromDate = $('#from-date').val();
        const toDate = $('#to-date').val();

        if (!fromCurrency || !toCurrency || !fromDate || !toDate) {
            $('#error-message').text('Please fill in all fields.');
            return;
        }

        // Construct API URL
        const apiToken = 'YOUR_API_TOKEN'; // Replace with your Polygon.io API token
        const url = `https://api.polygon.io/v1/historic/currency/${fromCurrency}/${toCurrency}?from=${fromDate}&to=${toDate}&apiKey=${apiToken}`;

        // Make AJAX Call
        $.ajax({
            type: 'GET',
            url: url,
            success: function(data) {
                const labels = [];
                const values = [];
                data.forEach(point => {
                    labels.push(point.date);
                    values.push(point.close);
                });

                // Update Chart
                chart.data.labels = labels;
                chart.data.datasets[0].data = values;
                chart.data.datasets[0].label = `Exchange Rate: ${fromCurrency}/${toCurrency}`;
                chart.update();

                $('#error-message').text('');
            },
            error: function(xhr, status, error) {
                $('#error-message').text(`Error: ${error}`);
            }
        });
    });

    // Handle Clear Button
    $('#currency-form').on('reset', function() {
        $('#from-currency').val('');
        $('#to-currency').val('');
        $('#from-date').val('');
        $('#to-date').val('');
        $('#error-message').text('');
        chart.data.labels = [];
        chart.data.datasets[0].data = [];
        chart.update();
    });
});
