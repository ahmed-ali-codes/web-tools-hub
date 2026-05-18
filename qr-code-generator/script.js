// QR Code Generator Functionality
      const generateBtn = document.getElementById("generate-btn");
      const downloadBtn = document.getElementById("download-btn");
      const clearBtn = document.getElementById("clear-btn");
      const qrContent = document.getElementById("qr-content");
      const qrColor = document.getElementById("qr-color");
      const qrSize = document.getElementById("qr-size");
      const qrContainer = document.getElementById("qr-code-container");

      generateBtn.addEventListener("click", generateQRCode);
      clearBtn.addEventListener("click", clearQRCode);

      function generateQRCode() {
        const content = qrContent.value.trim();
        if (!content) {
          alert("Please enter content for the QR code");
          return;
        }

        qrContainer.innerHTML = ""; // Clear previous QR code

        // Generate QR code
        QRCode.toCanvas(
          content,
          {
            width: parseInt(qrSize.value),
            color: {
              dark: qrColor.value,
              light: "#ffffff",
            },
          },
          function (error, canvas) {
            if (error) {
              console.error(error);
              alert("Error generating QR code");
              return;
            }

            qrContainer.appendChild(canvas);
            downloadBtn.disabled = false;
          }
        );
      }

      function clearQRCode() {
        qrContent.value = "";
        qrColor.value = "#2c3e50";
        qrSize.value = "250";
        qrContainer.innerHTML = `
          <div class="qr-code-placeholder">
            <i class="fas fa-qrcode" style="font-size: 3rem; color: #ccc; margin-bottom: 10px;"></i>
            <p>Your QR code will appear here</p>
          </div>
        `;
        downloadBtn.disabled = true;
      }

      // Download QR code
      downloadBtn.addEventListener("click", function () {
        const canvas = qrContainer.querySelector("canvas");
        if (!canvas) {
          alert("Please generate a QR code first");
          return;
        }

        const link = document.createElement("a");
        link.download = "ecotrustia-qr-code.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });