// Converter Functionality
      const milesInput = document.getElementById("miles-input");
      const kmInput = document.getElementById("km-input");
      const switchBtn = document.getElementById("switch-units");
      const resetBtn = document.getElementById("reset-btn");

      // Convert miles to kilometers
      milesInput.addEventListener("input", function () {
        if (this.value === "") {
          kmInput.value = "";
          return;
        }
        const miles = parseFloat(this.value);
        const km = miles * 1.609344;
        kmInput.value = km.toFixed(6);
      });

      // Convert kilometers to miles
      kmInput.addEventListener("input", function () {
        if (this.value === "") {
          milesInput.value = "";
          return;
        }
        const km = parseFloat(this.value);
        const miles = km * 0.621371;
        milesInput.value = miles.toFixed(6);
      });

      // Switch units
      switchBtn.addEventListener("click", function () {
        const milesValue = milesInput.value;
        const kmValue = kmInput.value;

        if (milesValue) {
          kmInput.value = "";
          milesInput.value = kmValue;
          kmInput.dispatchEvent(new Event("input"));
        } else if (kmValue) {
          milesInput.value = "";
          kmInput.value = milesValue;
          milesInput.dispatchEvent(new Event("input"));
        }
      });

      // Reset converter
      resetBtn.addEventListener("click", function () {
        milesInput.value = "";
        kmInput.value = "";
      });