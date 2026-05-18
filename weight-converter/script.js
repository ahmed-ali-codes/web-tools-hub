// Weight Conversion Functions
      function kgToLb(kg) {
        return kg * 2.20462;
      }

      function kgToOz(kg) {
        return kg * 35.274;
      }

      function kgToG(kg) {
        return kg * 1000;
      }

      function kgToSt(kg) {
        return kg * 0.157473;
      }

      function lbToKg(lb) {
        return lb / 2.20462;
      }

      function lbToOz(lb) {
        return lb * 16;
      }

      function lbToG(lb) {
        return lb * 453.592;
      }

      function lbToSt(lb) {
        return lb / 14;
      }

      function ozToKg(oz) {
        return oz / 35.274;
      }

      function ozToLb(oz) {
        return oz / 16;
      }

      function ozToG(oz) {
        return oz * 28.3495;
      }

      function ozToSt(oz) {
        return oz / 224;
      }

      function gToKg(g) {
        return g / 1000;
      }

      function gToLb(g) {
        return g / 453.592;
      }

      function gToOz(g) {
        return g / 28.3495;
      }

      function gToSt(g) {
        return g / 6350.29;
      }

      function stToKg(st) {
        return st * 6.35029;
      }

      function stToLb(st) {
        return st * 14;
      }

      function stToOz(st) {
        return st * 224;
      }

      function stToG(st) {
        return st * 6350.29;
      }

      // Update all conversions when any input changes
      function updateConversions() {
        // Get all input values
        const kg = parseFloat(document.getElementById("kilograms").value) || 0;
        const lb = parseFloat(document.getElementById("pounds").value) || 0;
        const oz = parseFloat(document.getElementById("ounces").value) || 0;
        const g = parseFloat(document.getElementById("grams").value) || 0;
        const st = parseFloat(document.getElementById("stones").value) || 0;

        // Determine which input was changed
        const activeId = document.activeElement.id;

        // Update from Kilograms if it's being actively edited
        if (activeId === "kilograms") {
          document.getElementById("pounds").value = kgToLb(kg).toFixed(4);
          document.getElementById("ounces").value = kgToOz(kg).toFixed(4);
          document.getElementById("grams").value = kgToG(kg).toFixed(2);
          document.getElementById("stones").value = kgToSt(kg).toFixed(4);

          // Update display
          document.getElementById("kg-to-lb").textContent = `Pounds: ${kgToLb(
            kg
          ).toFixed(4)} lb`;
          document.getElementById("kg-to-oz").textContent = `Ounces: ${kgToOz(
            kg
          ).toFixed(4)} oz`;
          document.getElementById("kg-to-g").textContent = `Grams: ${kgToG(
            kg
          ).toFixed(2)} g`;
          document.getElementById("kg-to-st").textContent = `Stones: ${kgToSt(
            kg
          ).toFixed(4)} st`;
        }
        // Update from Pounds if it's being actively edited
        else if (activeId === "pounds") {
          document.getElementById("kilograms").value = lbToKg(lb).toFixed(4);
          document.getElementById("ounces").value = lbToOz(lb).toFixed(4);
          document.getElementById("grams").value = lbToG(lb).toFixed(2);
          document.getElementById("stones").value = lbToSt(lb).toFixed(4);

          // Update display
          document.getElementById(
            "lb-to-kg"
          ).textContent = `Kilograms: ${lbToKg(lb).toFixed(4)} kg`;
          document.getElementById("lb-to-oz").textContent = `Ounces: ${lbToOz(
            lb
          ).toFixed(4)} oz`;
          document.getElementById("lb-to-g").textContent = `Grams: ${lbToG(
            lb
          ).toFixed(2)} g`;
          document.getElementById("lb-to-st").textContent = `Stones: ${lbToSt(
            lb
          ).toFixed(4)} st`;
        }
        // Update from Ounces if it's being actively edited
        else if (activeId === "ounces") {
          document.getElementById("kilograms").value = ozToKg(oz).toFixed(4);
          document.getElementById("pounds").value = ozToLb(oz).toFixed(4);
          document.getElementById("grams").value = ozToG(oz).toFixed(2);
          document.getElementById("stones").value = ozToSt(oz).toFixed(4);

          // Update display
          document.getElementById(
            "oz-to-kg"
          ).textContent = `Kilograms: ${ozToKg(oz).toFixed(4)} kg`;
          document.getElementById("oz-to-lb").textContent = `Pounds: ${ozToLb(
            oz
          ).toFixed(4)} lb`;
          document.getElementById("oz-to-g").textContent = `Grams: ${ozToG(
            oz
          ).toFixed(2)} g`;
          document.getElementById("oz-to-st").textContent = `Stones: ${ozToSt(
            oz
          ).toFixed(4)} st`;
        }
        // Update from Grams if it's being actively edited
        else if (activeId === "grams") {
          document.getElementById("kilograms").value = gToKg(g).toFixed(4);
          document.getElementById("pounds").value = gToLb(g).toFixed(4);
          document.getElementById("ounces").value = gToOz(g).toFixed(4);
          document.getElementById("stones").value = gToSt(g).toFixed(4);

          // Update display
          document.getElementById("g-to-kg").textContent = `Kilograms: ${gToKg(
            g
          ).toFixed(4)} kg`;
          document.getElementById("g-to-lb").textContent = `Pounds: ${gToLb(
            g
          ).toFixed(4)} lb`;
          document.getElementById("g-to-oz").textContent = `Ounces: ${gToOz(
            g
          ).toFixed(4)} oz`;
          document.getElementById("g-to-st").textContent = `Stones: ${gToSt(
            g
          ).toFixed(4)} st`;
        }
        // Update from Stones if it's being actively edited
        else if (activeId === "stones") {
          document.getElementById("kilograms").value = stToKg(st).toFixed(4);
          document.getElementById("pounds").value = stToLb(st).toFixed(4);
          document.getElementById("ounces").value = stToOz(st).toFixed(4);
          document.getElementById("grams").value = stToG(st).toFixed(2);

          // Update display
          document.getElementById(
            "st-to-kg"
          ).textContent = `Kilograms: ${stToKg(st).toFixed(4)} kg`;
          document.getElementById("st-to-lb").textContent = `Pounds: ${stToLb(
            st
          ).toFixed(4)} lb`;
          document.getElementById("st-to-oz").textContent = `Ounces: ${stToOz(
            st
          ).toFixed(4)} oz`;
          document.getElementById("st-to-g").textContent = `Grams: ${stToG(
            st
          ).toFixed(2)} g`;
        }
      }

      // Add event listeners to all input fields
      document
        .getElementById("kilograms")
        .addEventListener("input", updateConversions);
      document
        .getElementById("pounds")
        .addEventListener("input", updateConversions);
      document
        .getElementById("ounces")
        .addEventListener("input", updateConversions);
      document
        .getElementById("grams")
        .addEventListener("input", updateConversions);
      document
        .getElementById("stones")
        .addEventListener("input", updateConversions);

      // Initialize with some values
      document.getElementById("kilograms").value = "1";
      updateConversions();