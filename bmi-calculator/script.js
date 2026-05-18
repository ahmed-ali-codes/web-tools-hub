// BMI Calculator Functionality
      const metricBtn = document.getElementById("metric-btn");
      const imperialBtn = document.getElementById("imperial-btn");
      const metricInputs = document.getElementById("metric-inputs");
      const imperialInputs = document.getElementById("imperial-inputs");
      const calculateBtn = document.getElementById("calculate-btn");
      const resultsContainer = document.getElementById("results");

      // Toggle between metric and imperial units
      metricBtn.addEventListener("click", function () {
        metricBtn.classList.add("active");
        imperialBtn.classList.remove("active");
        metricInputs.style.display = "block";
        imperialInputs.style.display = "none";
      });

      imperialBtn.addEventListener("click", function () {
        imperialBtn.classList.add("active");
        metricBtn.classList.remove("active");
        imperialInputs.style.display = "block";
        metricInputs.style.display = "none";
      });

      // Calculate BMI
      calculateBtn.addEventListener("click", function () {
        let height, weight, bmi;

        if (metricBtn.classList.contains("active")) {
          // Metric calculation
          height = parseFloat(document.getElementById("height-cm").value) / 100; // Convert cm to m
          weight = parseFloat(document.getElementById("weight-kg").value);
        } else {
          // Imperial calculation
          const feet = parseFloat(document.getElementById("height-ft").value);
          const inches = parseFloat(document.getElementById("height-in").value);
          height = (feet * 12 + inches) * 0.0254; // Convert to meters
          weight =
            parseFloat(document.getElementById("weight-lb").value) * 0.453592; // Convert to kg
        }

        if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
          alert("Please enter valid height and weight values");
          return;
        }

        bmi = weight / (height * height);
        displayResults(bmi);
      });

      function displayResults(bmi) {
        const bmiValue = document.getElementById("bmi-value");
        const bmiCategory = document.getElementById("bmi-category");
        const bmiMessage = document.getElementById("bmi-message");
        const bmiIndicator = document.getElementById("bmi-indicator");

        // Format BMI to 1 decimal place
        bmiValue.textContent = bmi.toFixed(1);

        // Determine category and set colors
        let category, message, color;

        if (bmi < 18.5) {
          category = "Underweight";
          message =
            "Your BMI suggests you are underweight. Consider consulting with a healthcare provider about healthy ways to gain weight.";
          color = "var(--underweight)";
        } else if (bmi >= 18.5 && bmi < 25) {
          category = "Healthy weight";
          message =
            "Your BMI suggests you have a healthy weight for your height. Maintaining a healthy weight reduces your risk of developing serious health problems.";
          color = "var(--healthy)";
        } else if (bmi >= 25 && bmi < 30) {
          category = "Overweight";
          message =
            "Your BMI suggests you are overweight. You may want to talk with a healthcare provider about healthy lifestyle changes.";
          color = "var(--overweight)";
        } else {
          category = "Obese";
          message =
            "Your BMI suggests you are obese. Obesity increases risk for serious health conditions. Consider consulting with a healthcare provider.";
          color = "var(--obese)";
        }

        bmiCategory.textContent = category;
        bmiMessage.textContent = message;
        bmiValue.style.color = color;
        bmiCategory.style.color = color;

        // Position indicator on scale (limited to 0-40 BMI range for display)
        let indicatorPosition = (bmi / 40) * 100;
        if (indicatorPosition > 100) indicatorPosition = 100;
        bmiIndicator.style.left = `${indicatorPosition}%`;
        bmiIndicator.style.backgroundColor = color;

        // Show results
        resultsContainer.style.display = "block";
      }

      // Calculate on page load with default values
      window.addEventListener("load", function () {
        document.getElementById("calculate-btn").click();
      });