// Age Calculator Functionality
      const birthDateInput = document.getElementById("birth-date");
      const asOfDateInput = document.getElementById("as-of-date");
      const calculateBtn = document.getElementById("calculate-btn");
      const ageResult = document.getElementById("age-result");
      const resultDisplay = document.getElementById("result-display");

      // Set max dates to today
      const today = new Date();
      const todayStr = today.toISOString().split("T")[0];
      birthDateInput.max = todayStr;
      asOfDateInput.max = todayStr;
      asOfDateInput.value = todayStr;

      // Calculate age
      function calculateAge(showAlert = false) {
        const birthDate = new Date(birthDateInput.value);
        const asOfDate = new Date(asOfDateInput.value || todayStr);

        if (!birthDateInput.value) {
          if (showAlert) {
            alert("Please enter your date of birth");
          }
          return;
        }

        if (birthDate > asOfDate) {
          if (showAlert) {
            alert("Birth date cannot be in the future");
          }
          return;
        }

        let years = asOfDate.getFullYear() - birthDate.getFullYear();
        let months = asOfDate.getMonth() - birthDate.getMonth();
        let days = asOfDate.getDate() - birthDate.getDate();

        if (days < 0) {
          months--;
          // Get the last day of the previous month
          const lastDayOfMonth = new Date(
            asOfDate.getFullYear(),
            asOfDate.getMonth(),
            0
          ).getDate();
          days += lastDayOfMonth;
        }

        if (months < 0) {
          years--;
          months += 12;
        }

        ageResult.textContent = `${years} years, ${months} months, ${days} days`;
        resultDisplay.style.display = "block";

        // Add animation
        resultDisplay.style.animation = "none";
        void resultDisplay.offsetWidth; // Trigger reflow
        resultDisplay.style.animation = "fadeIn 0.5s ease-out";
      }

      // Event listeners
      calculateBtn.addEventListener("click", () => calculateAge(true));
      birthDateInput.addEventListener("change", () => calculateAge(false));
      asOfDateInput.addEventListener("change", () => calculateAge(false));

      // Initial calculation
      calculateAge(false);