// Gradient Generator Functionality
      const color1Input = document.getElementById("color1");
      const color1Hex = document.getElementById("color1-hex");
      const color2Input = document.getElementById("color2");
      const color2Hex = document.getElementById("color2-hex");
      const gradientType = document.getElementById("gradient-type");
      const gradientDirection = document.getElementById("gradient-direction");
      const gradientPreview = document.getElementById("gradient-preview");
      const cssCode = document.getElementById("css-code");
      const copyBtn = document.getElementById("copy-btn");

      // Update gradient when any input changes
      function updateGradient() {
        const color1 = color1Input.value;
        const color2 = color2Input.value;
        const type = gradientType.value;
        const direction = gradientDirection.value;

        let gradientCSS;

        if (type === "linear") {
          gradientCSS = `linear-gradient(${direction}, ${color1}, ${color2})`;
        } else {
          gradientCSS = `radial-gradient(circle, ${color1}, ${color2})`;
        }

        gradientPreview.style.background = gradientCSS;
        cssCode.value = `background: ${gradientCSS};`;
      }

      // Sync color inputs with hex inputs
      color1Input.addEventListener("input", function () {
        color1Hex.value = this.value;
        updateGradient();
      });

      color1Hex.addEventListener("input", function () {
        if (this.value.match(/^#[0-9A-F]{6}$/i)) {
          color1Input.value = this.value;
          updateGradient();
        }
      });

      color2Input.addEventListener("input", function () {
        color2Hex.value = this.value;
        updateGradient();
      });

      color2Hex.addEventListener("input", function () {
        if (this.value.match(/^#[0-9A-F]{6}$/i)) {
          color2Input.value = this.value;
          updateGradient();
        }
      });

      gradientType.addEventListener("change", updateGradient);
      gradientDirection.addEventListener("change", updateGradient);

      // Copy CSS code to clipboard
      copyBtn.addEventListener("click", function () {
        cssCode.select();
        document.execCommand("copy");

        // Change button text temporarily
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Copied!';

        setTimeout(() => {
          this.innerHTML = originalText;
        }, 2000);
      });

      // Initialize
      updateGradient();