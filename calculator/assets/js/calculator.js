"use strict";

$(document).ready(function() {
    // Attach calculate function to the Calculate button
    $("#calculateBtn").click(function() {
        calculate();
    });

    // Attach clearform function to the Clear button
    $("#clearBtn").click(function() {
        clearform();
    });

    // Initialize form validation
    $("#calculatorForm").validate({
        rules: {
            Operand1: {
                required: true,
                number: true
            },
            Operand2: {
                required: true,
                number: true
            },
            Operator: {
                required: true
            }
        },
        messages: {
            Operand1: {
                required: "Operand 1 is required",
                number: "Operand 1 must be a number"
            },
            Operand2: {
                required: "Operand 2 is required",
                number: "Operand 2 must be a number"
            },
            Operator: {
                required: "Operator is required"
            }
        },
        errorPlacement: function(error, element) {
            if (element.attr("name") === "Operator") {
                error.appendTo("#OperatorError");
            } else {
                error.appendTo(`#${element.attr("name")}Error`);
            }
        }
    });
});

function calculate() {
    /* Ensure the form is valid */
    if ($("#calculatorForm").valid()) {
        /* Get and convert the operands from the form */
        let operand1 = parseFloat(document.getElementById("Operand1").value);
        let operand2 = parseFloat(document.getElementById("Operand2").value);
        
        /* Determine which operator was selected */
        let operator = document.querySelector('input[name="Operator"]:checked')?.value;

        let result;

        /* Compute result based on operator */
        if (operator === "+") {
            result = operand1 + operand2;
        } else if (operator === "-") {
            result = operand1 - operand2;
        } else if (operator === "*") {
            result = operand1 * operand2;
        } else if (operator === "/") {
            result = operand1 / operand2;
        }

        /* Display the result */
        document.getElementById("Result").innerText = result.toFixed(2); // Formatting for clarity
    }
}

function clearform() {
    /* Reset form fields */
    document.getElementById("calculatorForm").reset();

    /* Clear error messages and result */
    ["Operand1Error", "Operand2Error", "OperatorError", "Result"].forEach(id => {
        document.getElementById(id).innerText = "";
    });
}