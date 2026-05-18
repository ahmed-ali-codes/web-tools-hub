// Tab functionality
      const tabBtns = document.querySelectorAll(".tab-btn");
      const calculatorContents = document.querySelectorAll(
        ".calculator-content"
      );

      tabBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          // Remove active class from all buttons and contents
          tabBtns.forEach((btn) => btn.classList.remove("active"));
          calculatorContents.forEach((content) =>
            content.classList.remove("active")
          );

          // Add active class to clicked button and corresponding content
          btn.classList.add("active");
          const tabId = btn.getAttribute("data-tab");
          document.getElementById(`${tabId}-content`).classList.add("active");
        });
      });

      // Percentage Calculation Functions
      function calculatePercentage() {
        const x = parseFloat(document.getElementById("percentage-x").value);
        const y = parseFloat(document.getElementById("percentage-y").value);

        if (isNaN(x) || isNaN(y)) {
          alert("Please enter valid numbers");
          return;
        }

        const result = (x / 100) * y;
        document.getElementById("percentage-result-value").textContent =
          result.toFixed(2);
        document.getElementById(
          "percentage-result-formula"
        ).textContent = `${x}% × ${y} = ${result.toFixed(2)}`;
        document.getElementById("percentage-result").style.display = "block";
      }

      function calculateIncrease() {
        const x = parseFloat(document.getElementById("increase-x").value);
        const y = parseFloat(document.getElementById("increase-y").value);

        if (isNaN(x) || isNaN(y)) {
          alert("Please enter valid numbers");
          return;
        }

        const result = x + x * (y / 100);
        document.getElementById("increase-result-value").textContent =
          result.toFixed(2);
        document.getElementById(
          "increase-result-formula"
        ).textContent = `${x} + (${y}% × ${x}) = ${result.toFixed(2)}`;
        document.getElementById("increase-result").style.display = "block";
      }

      function calculateDecrease() {
        const x = parseFloat(document.getElementById("decrease-x").value);
        const y = parseFloat(document.getElementById("decrease-y").value);

        if (isNaN(x) || isNaN(y)) {
          alert("Please enter valid numbers");
          return;
        }

        const result = x - x * (y / 100);
        document.getElementById("decrease-result-value").textContent =
          result.toFixed(2);
        document.getElementById(
          "decrease-result-formula"
        ).textContent = `${x} - (${y}% × ${x}) = ${result.toFixed(2)}`;
        document.getElementById("decrease-result").style.display = "block";
      }

      function calculateDifference() {
        const x = parseFloat(document.getElementById("difference-x").value);
        const y = parseFloat(document.getElementById("difference-y").value);

        if (isNaN(x) || isNaN(y)) {
          alert("Please enter valid numbers");
          return;
        }

        if (x === 0) {
          alert(
            "Initial value cannot be zero for percentage difference calculation"
          );
          return;
        }

        const result = ((y - x) / x) * 100;
        const changeType = result >= 0 ? "increase" : "decrease";
        const absResult = Math.abs(result);

        document.getElementById(
          "difference-result-value"
        ).textContent = `${absResult.toFixed(2)}% ${changeType}`;
        document.getElementById(
          "difference-result-formula"
        ).textContent = `(${y} - ${x}) ÷ ${x} × 100 = ${absResult.toFixed(
          2
        )}% ${changeType}`;
        document.getElementById("difference-result").style.display = "block";
      }

      // Event listeners for calculate buttons
      document
        .getElementById("percentage-calculate")
        .addEventListener("click", calculatePercentage);
      document
        .getElementById("increase-calculate")
        .addEventListener("click", calculateIncrease);
      document
        .getElementById("decrease-calculate")
        .addEventListener("click", calculateDecrease);
      document
        .getElementById("difference-calculate")
        .addEventListener("click", calculateDifference);

      // Calculate with default values on page load
      window.addEventListener("load", function () {
        calculatePercentage();
        calculateIncrease();
        calculateDecrease();
        calculateDifference();
      });