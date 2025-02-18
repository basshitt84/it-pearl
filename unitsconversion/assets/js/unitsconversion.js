document.getElementById('calculateBtn').addEventListener('click', function() {
    let value = document.getElementById('fromValue').value;
    let fromUnit = document.querySelector('input[name="fromUnit"]:checked');
    let toUnit = document.querySelector('input[name="toUnit"]:checked');

    // Reset error messages
    document.getElementById('valueError').style.display = "none";
    document.getElementById('fromUnitError').style.display = "none";
    document.getElementById('toUnitError').style.display = "none";

    // Validation
    if (!value) {
        document.getElementById('valueError').style.display = "inline";
        return;
    }
    if (!fromUnit) {
        document.getElementById('fromUnitError').style.display = "inline";
        return;
    }
    if (!toUnit) {
        document.getElementById('toUnitError').style.display = "inline";
        return;
    }

    fromUnit = fromUnit.value;
    toUnit = toUnit.value;

    // Conversion factors stored in JavaScript
    const conversions = {
        "cm": { "m": 0.01, "km": 0.00001, "in": 0.3937, "ft": 0.0328, "yd": 0.0109, "mi": 0.00000621 },
        "m": { "cm": 100, "km": 0.001, "in": 39.37, "ft": 3.281, "yd": 1.094, "mi": 0.000621 },
        "km": { "cm": 100000, "m": 1000, "in": 39370, "ft": 3281, "yd": 1094, "mi": 0.621 },
        "in": { "cm": 2.54, "m": 0.0254, "km": 0.0000254, "ft": 0.0833, "yd": 0.0278, "mi": 0.00001578 },
        "ft": { "cm": 30.48, "m": 0.3048, "km": 0.0003048, "in": 12, "yd": 0.333, "mi": 0.000189 },
        "yd": { "cm": 91.44, "m": 0.9144, "km": 0.000914, "in": 36, "ft": 3, "mi": 0.000568 },
        "mi": { "cm": 160934, "m": 1609.34, "km": 1.609, "in": 63360, "ft": 5280, "yd": 1760 }
    };

    // Convert value
    let conversionFactor = conversions[fromUnit][toUnit];

    if (conversionFactor) {
        let result = value * conversionFactor;
        document.getElementById('toValue').value = result.toFixed(4);
    } else {
        alert("Conversion not available.");
    }
});

// Clear button resets all fields
document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('toValue').value = "";
});
