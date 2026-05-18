// Length Conversion Functions
      function mToFt(m) {
        return m * 3.28084;
      }

      function mToIn(m) {
        return m * 39.3701;
      }

      function mToCm(m) {
        return m * 100;
      }

      function mToYd(m) {
        return m * 1.09361;
      }

      function mToKm(m) {
        return m / 1000;
      }

      function ftToM(ft) {
        return ft / 3.28084;
      }

      function ftToIn(ft) {
        return ft * 12;
      }

      function ftToCm(ft) {
        return ft * 30.48;
      }

      function ftToYd(ft) {
        return ft / 3;
      }

      function ftToKm(ft) {
        return ft / 3280.84;
      }

      function inToM(inch) {
        return inch / 39.3701;
      }

      function inToFt(inch) {
        return inch / 12;
      }

      function inToCm(inch) {
        return inch * 2.54;
      }

      function inToYd(inch) {
        return inch / 36;
      }

      function inToKm(inch) {
        return inch / 39370.1;
      }

      function cmToM(cm) {
        return cm / 100;
      }

      function cmToFt(cm) {
        return cm / 30.48;
      }

      function cmToIn(cm) {
        return cm / 2.54;
      }

      function cmToYd(cm) {
        return cm / 91.44;
      }

      function cmToKm(cm) {
        return cm / 100000;
      }

      function ydToM(yd) {
        return yd / 1.09361;
      }

      function ydToFt(yd) {
        return yd * 3;
      }

      function ydToIn(yd) {
        return yd * 36;
      }

      function ydToCm(yd) {
        return yd * 91.44;
      }

      function ydToKm(yd) {
        return yd / 1093.61;
      }

      function kmToM(km) {
        return km * 1000;
      }

      function kmToFt(km) {
        return km * 3280.84;
      }

      function kmToIn(km) {
        return km * 39370.1;
      }

      function kmToYd(km) {
        return km * 1093.61;
      }

      function kmToCm(km) {
        return km * 100000;
      }

      // Update all conversions when any input changes
      function updateConversions() {
        // Get all input values
        const m = parseFloat(document.getElementById("meters").value) || 0;
        const ft = parseFloat(document.getElementById("feet").value) || 0;
        const inch = parseFloat(document.getElementById("inches").value) || 0;
        const cm =
          parseFloat(document.getElementById("centimeters").value) || 0;
        const yd = parseFloat(document.getElementById("yards").value) || 0;
        const km = parseFloat(document.getElementById("kilometers").value) || 0;

        // Determine which input was changed
        const activeId = document.activeElement.id;

        // Update from Meters if it's being actively edited
        if (activeId === "meters") {
          document.getElementById("feet").value = mToFt(m).toFixed(4);
          document.getElementById("inches").value = mToIn(m).toFixed(4);
          document.getElementById("centimeters").value = mToCm(m).toFixed(2);
          document.getElementById("yards").value = mToYd(m).toFixed(4);
          document.getElementById("kilometers").value = mToKm(m).toFixed(6);

          // Update display
          document.getElementById("m-to-ft").textContent = `Feet: ${mToFt(
            m
          ).toFixed(4)} ft`;
          document.getElementById("m-to-in").textContent = `Inches: ${mToIn(
            m
          ).toFixed(4)} in`;
          document.getElementById(
            "m-to-cm"
          ).textContent = `Centimeters: ${mToCm(m).toFixed(2)} cm`;
          document.getElementById("m-to-yd").textContent = `Yards: ${mToYd(
            m
          ).toFixed(4)} yd`;
          document.getElementById("m-to-km").textContent = `Kilometers: ${mToKm(
            m
          ).toFixed(6)} km`;
        }
        // Update from Feet if it's being actively edited
        else if (activeId === "feet") {
          document.getElementById("meters").value = ftToM(ft).toFixed(4);
          document.getElementById("inches").value = ftToIn(ft).toFixed(4);
          document.getElementById("centimeters").value = ftToCm(ft).toFixed(2);
          document.getElementById("yards").value = ftToYd(ft).toFixed(4);
          document.getElementById("kilometers").value = ftToKm(ft).toFixed(6);

          // Update display
          document.getElementById("ft-to-m").textContent = `Meters: ${ftToM(
            ft
          ).toFixed(4)} m`;
          document.getElementById("ft-to-in").textContent = `Inches: ${ftToIn(
            ft
          ).toFixed(4)} in`;
          document.getElementById(
            "ft-to-cm"
          ).textContent = `Centimeters: ${ftToCm(ft).toFixed(2)} cm`;
          document.getElementById("ft-to-yd").textContent = `Yards: ${ftToYd(
            ft
          ).toFixed(4)} yd`;
          document.getElementById(
            "ft-to-km"
          ).textContent = `Kilometers: ${ftToKm(ft).toFixed(6)} km`;
        }
        // Update from Inches if it's being actively edited
        else if (activeId === "inches") {
          document.getElementById("meters").value = inToM(inch).toFixed(4);
          document.getElementById("feet").value = inToFt(inch).toFixed(4);
          document.getElementById("centimeters").value =
            inToCm(inch).toFixed(2);
          document.getElementById("yards").value = inToYd(inch).toFixed(4);
          document.getElementById("kilometers").value = inToKm(inch).toFixed(6);

          // Update display
          document.getElementById("in-to-m").textContent = `Meters: ${inToM(
            inch
          ).toFixed(4)} m`;
          document.getElementById("in-to-ft").textContent = `Feet: ${inToFt(
            inch
          ).toFixed(4)} ft`;
          document.getElementById(
            "in-to-cm"
          ).textContent = `Centimeters: ${inToCm(inch).toFixed(2)} cm`;
          document.getElementById("in-to-yd").textContent = `Yards: ${inToYd(
            inch
          ).toFixed(4)} yd`;
          document.getElementById(
            "in-to-km"
          ).textContent = `Kilometers: ${inToKm(inch).toFixed(6)} km`;
        }
        // Update from Centimeters if it's being actively edited
        else if (activeId === "centimeters") {
          document.getElementById("meters").value = cmToM(cm).toFixed(4);
          document.getElementById("feet").value = cmToFt(cm).toFixed(4);
          document.getElementById("inches").value = cmToIn(cm).toFixed(4);
          document.getElementById("yards").value = cmToYd(cm).toFixed(4);
          document.getElementById("kilometers").value = cmToKm(cm).toFixed(6);

          // Update display
          document.getElementById("cm-to-m").textContent = `Meters: ${cmToM(
            cm
          ).toFixed(4)} m`;
          document.getElementById("cm-to-ft").textContent = `Feet: ${cmToFt(
            cm
          ).toFixed(4)} ft`;
          document.getElementById("cm-to-in").textContent = `Inches: ${cmToIn(
            cm
          ).toFixed(4)} in`;
          document.getElementById("cm-to-yd").textContent = `Yards: ${cmToYd(
            cm
          ).toFixed(4)} yd`;
          document.getElementById(
            "cm-to-km"
          ).textContent = `Kilometers: ${cmToKm(cm).toFixed(6)} km`;
        }
        // Update from Yards if it's being actively edited
        else if (activeId === "yards") {
          document.getElementById("meters").value = ydToM(yd).toFixed(4);
          document.getElementById("feet").value = ydToFt(yd).toFixed(4);
          document.getElementById("inches").value = ydToIn(yd).toFixed(4);
          document.getElementById("centimeters").value = ydToCm(yd).toFixed(2);
          document.getElementById("kilometers").value = ydToKm(yd).toFixed(6);

          // Update display
          document.getElementById("yd-to-m").textContent = `Meters: ${ydToM(
            yd
          ).toFixed(4)} m`;
          document.getElementById("yd-to-ft").textContent = `Feet: ${ydToFt(
            yd
          ).toFixed(4)} ft`;
          document.getElementById("yd-to-in").textContent = `Inches: ${ydToIn(
            yd
          ).toFixed(4)} in`;
          document.getElementById(
            "yd-to-cm"
          ).textContent = `Centimeters: ${ydToCm(yd).toFixed(2)} cm`;
          document.getElementById(
            "yd-to-km"
          ).textContent = `Kilometers: ${ydToKm(yd).toFixed(6)} km`;
        }
        // Update from Kilometers if it's being actively edited
        else if (activeId === "kilometers") {
          document.getElementById("meters").value = kmToM(km).toFixed(2);
          document.getElementById("feet").value = kmToFt(km).toFixed(2);
          document.getElementById("inches").value = kmToIn(km).toFixed(2);
          document.getElementById("yards").value = kmToYd(km).toFixed(2);
          document.getElementById("centimeters").value = kmToCm(km).toFixed(2);

          // Update display
          document.getElementById("km-to-m").textContent = `Meters: ${kmToM(
            km
          ).toFixed(2)} m`;
          document.getElementById("km-to-ft").textContent = `Feet: ${kmToFt(
            km
          ).toFixed(2)} ft`;
          document.getElementById("km-to-in").textContent = `Inches: ${kmToIn(
            km
          ).toFixed(2)} in`;
          document.getElementById("km-to-yd").textContent = `Yards: ${kmToYd(
            km
          ).toFixed(2)} yd`;
          document.getElementById(
            "km-to-cm"
          ).textContent = `Centimeters: ${kmToCm(km).toFixed(2)} cm`;
        }
      }

      // Add event listeners to all input fields
      document
        .getElementById("meters")
        .addEventListener("input", updateConversions);
      document
        .getElementById("feet")
        .addEventListener("input", updateConversions);
      document
        .getElementById("inches")
        .addEventListener("input", updateConversions);
      document
        .getElementById("centimeters")
        .addEventListener("input", updateConversions);
      document
        .getElementById("yards")
        .addEventListener("input", updateConversions);
      document
        .getElementById("kilometers")
        .addEventListener("input", updateConversions);

      // Initialize with some values
      document.getElementById("meters").value = "1";
      updateConversions();