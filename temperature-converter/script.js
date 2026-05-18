// Temperature Conversion Functions
      function celsiusToFahrenheit(c) {
        return (c * 9) / 5 + 32;
      }

      function celsiusToKelvin(c) {
        return c + 273.15;
      }

      function fahrenheitToCelsius(f) {
        return ((f - 32) * 5) / 9;
      }

      function fahrenheitToKelvin(f) {
        return ((f - 32) * 5) / 9 + 273.15;
      }

      function kelvinToCelsius(k) {
        return k - 273.15;
      }

      function kelvinToFahrenheit(k) {
        return ((k - 273.15) * 9) / 5 + 32;
      }

      // Update all conversions when any input changes
      function updateConversions() {
        // Get all input values
        const celsius = parseFloat(document.getElementById("celsius").value);
        const fahrenheit = parseFloat(
          document.getElementById("fahrenheit").value
        );
        const kelvin = parseFloat(document.getElementById("kelvin").value);

        // Update from Celsius if it has a value and is being actively edited
        if (!isNaN(celsius) && document.activeElement.id === "celsius") {
          document.getElementById("fahrenheit").value =
            celsiusToFahrenheit(celsius).toFixed(2);
          document.getElementById("kelvin").value =
            celsiusToKelvin(celsius).toFixed(2);
          document.getElementById(
            "celsius-to-fahrenheit"
          ).textContent = `${celsiusToFahrenheit(celsius).toFixed(2)}°F`;
          document.getElementById(
            "celsius-to-kelvin"
          ).textContent = `${celsiusToKelvin(celsius).toFixed(2)}K`;
        }
        // Update from Fahrenheit if it has a value and is being actively edited
        else if (
          !isNaN(fahrenheit) &&
          document.activeElement.id === "fahrenheit"
        ) {
          document.getElementById("celsius").value =
            fahrenheitToCelsius(fahrenheit).toFixed(2);
          document.getElementById("kelvin").value =
            fahrenheitToKelvin(fahrenheit).toFixed(2);
          document.getElementById(
            "fahrenheit-to-celsius"
          ).textContent = `${fahrenheitToCelsius(fahrenheit).toFixed(2)}°C`;
          document.getElementById(
            "fahrenheit-to-kelvin"
          ).textContent = `${fahrenheitToKelvin(fahrenheit).toFixed(2)}K`;
        }
        // Update from Kelvin if it has a value and is being actively edited
        else if (!isNaN(kelvin) && document.activeElement.id === "kelvin") {
          document.getElementById("celsius").value =
            kelvinToCelsius(kelvin).toFixed(2);
          document.getElementById("fahrenheit").value =
            kelvinToFahrenheit(kelvin).toFixed(2);
          document.getElementById(
            "kelvin-to-celsius"
          ).textContent = `${kelvinToCelsius(kelvin).toFixed(2)}°C`;
          document.getElementById(
            "kelvin-to-fahrenheit"
          ).textContent = `${kelvinToFahrenheit(kelvin).toFixed(2)}°F`;
        }
      }

      // Add event listeners to all input fields
      document
        .getElementById("celsius")
        .addEventListener("input", updateConversions);
      document
        .getElementById("fahrenheit")
        .addEventListener("input", updateConversions);
      document
        .getElementById("kelvin")
        .addEventListener("input", updateConversions);

      // Initialize with some values
      document.getElementById("celsius").value = "0";
      updateConversions();