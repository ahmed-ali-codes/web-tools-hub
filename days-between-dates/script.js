// Days Between Dates Calculator
      const startDateInput = document.getElementById("start-date");
      const endDateInput = document.getElementById("end-date");
      const calculateBtn = document.getElementById("calculate-btn");
      const daysResult = document.getElementById("days-result");
      const resultDisplay = document.getElementById("result-display");

      // Set default dates (today and 7 days from today)
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);

      startDateInput.valueAsDate = today;
      endDateInput.valueAsDate = nextWeek;

      // Calculate days between dates
      function calculateDaysBetween() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);

        if (!startDateInput.value || !endDateInput.value) {
          alert("Please select both start and end dates");
          return;
        }

        // Calculate difference in milliseconds
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        daysResult.textContent = diffDays;
        resultDisplay.style.display = "block";

        // Add animation
        resultDisplay.style.animation = "none";
        void resultDisplay.offsetWidth; // Trigger reflow
        resultDisplay.style.animation = "fadeIn 0.5s ease-out";
      }

      // Event listener for calculate button
      calculateBtn.addEventListener("click", calculateDaysBetween);

      // Also calculate when dates change
      startDateInput.addEventListener("change", calculateDaysBetween);
      endDateInput.addEventListener("change", calculateDaysBetween);

      // Initial calculation
      calculateDaysBetween();