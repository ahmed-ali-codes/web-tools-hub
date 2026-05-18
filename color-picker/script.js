// Color Picker Functionality
      const pickerArea = document.getElementById("picker-area");
      const pickerCanvas = document.getElementById("picker-canvas");
      const pickerCursor = document.getElementById("picker-cursor");
      const colorPreview = document.getElementById("color-preview");
      const hexValue = document.getElementById("hex-value");
      const rgbValue = document.getElementById("rgb-value");
      const hslValue = document.getElementById("hsl-value");
      const startPickerBtn = document.getElementById("start-picker");
      const copyAllBtn = document.getElementById("copy-all");

      const ctx = pickerCanvas.getContext("2d");
      let isPicking = false;
      let currentColor = "#3498db";

      // Set canvas size
      function resizeCanvas() {
        pickerCanvas.width = pickerArea.offsetWidth;
        pickerCanvas.height = pickerArea.offsetHeight;

        // Draw a gradient background for the picker area
        const gradient = ctx.createLinearGradient(
          0,
          0,
          pickerCanvas.width,
          pickerCanvas.height
        );
        gradient.addColorStop(0, "#ff0000");
        gradient.addColorStop(0.17, "#ffff00");
        gradient.addColorStop(0.33, "#00ff00");
        gradient.addColorStop(0.5, "#00ffff");
        gradient.addColorStop(0.67, "#0000ff");
        gradient.addColorStop(0.83, "#ff00ff");
        gradient.addColorStop(1, "#ff0000");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, pickerCanvas.width, pickerCanvas.height);

        // Add white to black gradient overlay
        const whiteGradient = ctx.createLinearGradient(
          0,
          0,
          0,
          pickerCanvas.height
        );
        whiteGradient.addColorStop(0, "rgba(255,255,255,1)");
        whiteGradient.addColorStop(0.5, "rgba(255,255,255,0)");
        whiteGradient.addColorStop(0.5, "rgba(0,0,0,0)");
        whiteGradient.addColorStop(1, "rgba(0,0,0,1)");

        ctx.fillStyle = whiteGradient;
        ctx.fillRect(0, 0, pickerCanvas.width, pickerCanvas.height);
      }

      // Convert RGB to HSL
      function rgbToHsl(r, g, b) {
        (r /= 255), (g /= 255), (b /= 255);

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h,
          s,
          l = (max + min) / 2;

        if (max === min) {
          h = s = 0; // achromatic
        } else {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;
            case g:
              h = (b - r) / d + 2;
              break;
            case b:
              h = (r - g) / d + 4;
              break;
          }

          h /= 6;
        }

        return {
          h: Math.round(h * 360),
          s: Math.round(s * 100),
          l: Math.round(l * 100),
        };
      }

      // Update color display
      function updateColorDisplay(r, g, b) {
        // HEX
        const toHex = (c) => {
          const hex = c.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        };
        const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

        // HSL
        const hsl = rgbToHsl(r, g, b);

        // Update elements
        colorPreview.style.backgroundColor = hex;
        hexValue.textContent = hex;
        rgbValue.textContent = `rgb(${r}, ${g}, ${b})`;
        hslValue.textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

        currentColor = hex;
      }

      // Handle color picking
      function pickColor(e) {
        if (!isPicking) return;

        const rect = pickerCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Show cursor at pick position
        pickerCursor.style.display = "block";
        pickerCursor.style.left = `${x - 7}px`;
        pickerCursor.style.top = `${y - 7}px`;

        // Get pixel color
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const r = pixel[0];
        const g = pixel[1];
        const b = pixel[2];

        updateColorDisplay(r, g, b);
      }

      // Start/stop color picker
      function toggleColorPicker() {
        isPicking = !isPicking;

        if (isPicking) {
          startPickerBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Picker';
          pickerArea.style.cursor = "crosshair";
          pickerCursor.style.display = "block";
        } else {
          startPickerBtn.innerHTML =
            '<i class="fas fa-eye-dropper"></i> Start Picker';
          pickerArea.style.cursor = "default";
          pickerCursor.style.display = "none";
        }
      }

      // Copy all color values
      function copyAllValues() {
        const text = `HEX: ${hexValue.textContent}\nRGB: ${rgbValue.textContent}\nHSL: ${hslValue.textContent}`;
        navigator.clipboard.writeText(text).then(() => {
          // Change button text temporarily
          const originalText = copyAllBtn.innerHTML;
          copyAllBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';

          setTimeout(() => {
            copyAllBtn.innerHTML = originalText;
          }, 2000);
        });
      }

      // Event listeners
      window.addEventListener("resize", resizeCanvas);
      pickerArea.addEventListener("mousemove", pickColor);
      pickerArea.addEventListener("click", pickColor);
      startPickerBtn.addEventListener("click", toggleColorPicker);
      copyAllBtn.addEventListener("click", copyAllValues);

      // Initialize
      resizeCanvas();
      updateColorDisplay(52, 152, 219); // Default color #3498db