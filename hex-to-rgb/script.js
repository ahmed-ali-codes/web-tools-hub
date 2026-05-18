// HEX to RGB Converter Functionality
      const colorPicker = document.getElementById("color-picker");
      const hexInput = document.getElementById("hex-color");
      const redInput = document.getElementById("red");
      const greenInput = document.getElementById("green");
      const blueInput = document.getElementById("blue");
      const colorPreview = document.getElementById("color-preview");
      const convertBtn = document.getElementById("convert-btn");

      // Convert HEX to RGB
      function hexToRgb(hex) {
        // Remove # if present
        hex = hex.replace("#", "");

        // Parse r, g, b values
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        return { r, g, b };
      }

      // Convert RGB to HEX
      function rgbToHex(r, g, b) {
        const toHex = (c) => {
          const hex = c.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      }

      // Update color preview and RGB inputs from HEX
      function updateFromHex() {
        const hex = hexInput.value;

        if (/^#[0-9A-F]{6}$/i.test(hex)) {
          colorPicker.value = hex;
          const { r, g, b } = hexToRgb(hex);
          redInput.value = r;
          greenInput.value = g;
          blueInput.value = b;
          colorPreview.style.backgroundColor = hex;
        }
      }

      // Update color preview and HEX input from RGB
      function updateFromRgb() {
        const r = parseInt(redInput.value) || 0;
        const g = parseInt(greenInput.value) || 0;
        const b = parseInt(blueInput.value) || 0;

        // Validate RGB values
        const validR = Math.min(255, Math.max(0, r));
        const validG = Math.min(255, Math.max(0, g));
        const validB = Math.min(255, Math.max(0, b));

        redInput.value = validR;
        greenInput.value = validG;
        blueInput.value = validB;

        const hex = rgbToHex(validR, validG, validB);
        hexInput.value = hex;
        colorPicker.value = hex;
        colorPreview.style.backgroundColor = hex;
      }

      // Event listeners
      colorPicker.addEventListener("input", function () {
        hexInput.value = this.value;
        updateFromHex();
      });

      hexInput.addEventListener("input", function () {
        if (this.value.length === 7) {
          updateFromHex();
        }
      });

      [redInput, greenInput, blueInput].forEach((input) => {
        input.addEventListener("input", function () {
          if (this.value > 255) this.value = 255;
          if (this.value < 0) this.value = 0;
        });
      });

      convertBtn.addEventListener("click", function () {
        if (hexInput.value && /^#[0-9A-F]{6}$/i.test(hexInput.value)) {
          updateFromHex();
        } else {
          updateFromRgb();
        }
      });

      // Initialize with default color
      updateFromHex();