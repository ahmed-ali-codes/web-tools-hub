// Calories Calculator Functionality
      const calculateBtn = document.getElementById("calculate-btn");
      const resetBtn = document.getElementById("reset-btn");
      const resultsDiv = document.getElementById("results");
      const bmiValueEl = document.getElementById("bmi-value");
      const bmiCategoryEl = document.getElementById("bmi-category");
      const bmiMarkerEl = document.getElementById("bmi-marker");
      const bmrValueEl = document.getElementById("bmr-value");
      const caloriesValueEl = document.getElementById("calories-value");
      const goalCaloriesEl = document.getElementById("goal-calories");

      // Calculate button handler
      calculateBtn.addEventListener("click", function () {
        // Get input values
        const gender = document.querySelector(
          'input[name="gender"]:checked'
        ).value;
        const age = parseInt(document.getElementById("age").value);
        const height = parseInt(document.getElementById("height").value);
        const weight = parseInt(document.getElementById("weight").value);
        const activityLevel = parseFloat(
          document.querySelector('input[name="activity"]:checked').value
        );
        const goal = document.getElementById("goal").value;

        // Validate inputs
        if (!age || !height || !weight) {
          alert("Please fill in all fields");
          return;
        }

        // Calculate BMI
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        const roundedBMI = Math.round(bmi * 10) / 10;

        // Determine BMI category
        let bmiCategory;
        if (bmi < 18.5) {
          bmiCategory = "Underweight";
        } else if (bmi >= 18.5 && bmi < 25) {
          bmiCategory = "Normal weight";
        } else if (bmi >= 25 && bmi < 30) {
          bmiCategory = "Overweight";
        } else {
          bmiCategory = "Obese";
        }

        // Position BMI marker (0-100% scale where 18.5=25%, 25=50%, 30=75%)
        let markerPosition;
        if (bmi < 18.5) {
          markerPosition = (bmi / 18.5) * 25;
        } else if (bmi < 25) {
          markerPosition = 25 + ((bmi - 18.5) / (25 - 18.5)) * 25;
        } else if (bmi < 30) {
          markerPosition = 50 + ((bmi - 25) / (30 - 25)) * 25;
        } else {
          markerPosition = 75 + Math.min(((bmi - 30) / 10) * 25, 25);
        }
        bmiMarkerEl.style.left = `${markerPosition}%`;

        // Calculate BMR (Basal Metabolic Rate)
        let bmr;
        if (gender === "male") {
          bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
          bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        // Calculate daily maintenance calories
        const maintenanceCalories = Math.round(bmr * activityLevel);

        // Calculate goal calories
        let goalCalories;
        if (goal === "lose") {
          goalCalories = maintenanceCalories - 500;
        } else if (goal === "gain") {
          goalCalories = maintenanceCalories + 500;
        } else {
          goalCalories = maintenanceCalories;
        }

        // Display results
        bmiValueEl.textContent = roundedBMI;
        bmiCategoryEl.textContent = bmiCategory;
        bmrValueEl.textContent = Math.round(bmr) + " calories/day";
        caloriesValueEl.textContent = maintenanceCalories + " calories/day";
        goalCaloriesEl.textContent = goalCalories + " calories/day";

        // Show results
        resultsDiv.style.display = "block";
      });

      // Reset button handler
      resetBtn.addEventListener("click", function () {
        // Reset form values
        document.getElementById("male").checked = true;
        document.getElementById("age").value = "30";
        document.getElementById("height").value = "170";
        document.getElementById("weight").value = "70";
        document.getElementById("sedentary").checked = true;
        document.getElementById("goal").value = "maintain";

        // Hide results
        resultsDiv.style.display = "none";
      });