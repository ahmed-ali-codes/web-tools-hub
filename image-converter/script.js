// Image Converter Functionality
      const uploadArea = document.getElementById("upload-area");
      const fileInput = document.getElementById("file-input");
      const previewContainer = document.getElementById("preview-container");
      const previewImage = document.getElementById("preview-image");
      const fileNameEl = document.getElementById("file-name");
      const fileSizeEl = document.getElementById("file-size");
      const dimensionsEl = document.getElementById("dimensions");
      const currentFormatEl = document.getElementById("current-format");
      const outputFormat = document.getElementById("output-format");
      const qualityControl = document.getElementById("quality-control");
      const qualitySlider = document.getElementById("quality");
      const qualityValue = document.getElementById("quality-value");
      const convertBtn = document.getElementById("convert-btn");
      const downloadBtn = document.getElementById("download-btn");
      const resetBtn = document.getElementById("reset-btn");

      let currentFile = null;
      let convertedImageUrl = null;

      // Handle file selection
      uploadArea.addEventListener("click", function () {
        fileInput.click();
      });

      // Handle drag and drop
      uploadArea.addEventListener("dragover", function (e) {
        e.preventDefault();
        this.style.borderColor = "var(--primary-blue)";
        this.style.backgroundColor = "rgba(52, 152, 219, 0.1)";
      });

      uploadArea.addEventListener("dragleave", function () {
        this.style.borderColor = "#ddd";
        this.style.backgroundColor = "transparent";
      });

      uploadArea.addEventListener("drop", function (e) {
        e.preventDefault();
        this.style.borderColor = "#ddd";
        this.style.backgroundColor = "transparent";

        if (e.dataTransfer.files.length) {
          handleFileSelect(e.dataTransfer.files[0]);
        }
      });

      fileInput.addEventListener("change", function () {
        if (this.files.length) {
          handleFileSelect(this.files[0]);
        }
      });

      // Handle quality slider
      qualitySlider.addEventListener("input", function () {
        qualityValue.textContent = `${this.value}%`;
      });

      // Handle output format change
      outputFormat.addEventListener("change", function () {
        // Show quality control for JPG and WEBP
        qualityControl.style.display =
          this.value === "jpg" || this.value === "webp" ? "block" : "none";
      });

      // Handle file processing
      function handleFileSelect(file) {
        // Check file type
        if (!file.type.match("image.*")) {
          alert("Please select an image file (JPG, PNG, WEBP, GIF)");
          return;
        }

        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          alert("File size exceeds 10MB limit");
          return;
        }

        currentFile = file;

        // Display file info
        fileNameEl.textContent = file.name;
        fileSizeEl.textContent = formatFileSize(file.size);

        // Get current format
        const format = file.name.split(".").pop().toLowerCase();
        currentFormatEl.textContent = format.toUpperCase();

        // Preview image
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image();
          img.onload = function () {
            dimensionsEl.textContent = `${img.width} × ${img.height}px`;
            previewImage.src = e.target.result;
            previewContainer.style.display = "flex";
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);

        // Enable convert button
        convertBtn.disabled = false;
      }

      // Convert image
      convertBtn.addEventListener("click", function () {
        if (!currentFile) return;

        convertBtn.disabled = true;
        convertBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Converting...';

        const reader = new FileReader();
        reader.onload = function (event) {
          const img = new Image();
          img.onload = function () {
            // Create canvas
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            // Convert based on selected format
            const format = outputFormat.value;
            let mimeType;
            switch (format) {
              case "jpg":
                mimeType = "image/jpeg";
                break;
              case "png":
                mimeType = "image/png";
                break;
              case "webp":
                mimeType = "image/webp";
                break;
              case "gif":
                mimeType = "image/gif";
                break;
              default:
                mimeType = "image/jpeg";
            }

            // Convert with quality if applicable
            let quality = 1;
            if (format === "jpg" || format === "webp") {
              quality = parseInt(qualitySlider.value) / 100;
            }

            canvas.toBlob(
              function (blob) {
                convertedImageUrl = URL.createObjectURL(blob);
                downloadBtn.style.display = "inline-block";
                convertBtn.disabled = false;
                convertBtn.innerHTML =
                  '<i class="fas fa-exchange-alt"></i> Convert Image';
                alert("Image converted successfully! Click Download to save.");
              },
              mimeType,
              quality
            );
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(currentFile);
      });

      // Download converted image
      downloadBtn.addEventListener("click", function () {
        if (!convertedImageUrl) return;

        const format = outputFormat.value;
        const originalName = currentFile.name.split(".").shift();
        const newFilename = `${originalName}.${format}`;

        const a = document.createElement("a");
        a.href = convertedImageUrl;
        a.download = newFilename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });

      // Reset tool
      resetBtn.addEventListener("click", function () {
        fileInput.value = "";
        previewContainer.style.display = "none";
        downloadBtn.style.display = "none";
        convertBtn.disabled = true;
        fileNameEl.textContent = "-";
        fileSizeEl.textContent = "-";
        dimensionsEl.textContent = "-";
        currentFormatEl.textContent = "-";
        currentFile = null;
        convertedImageUrl = null;
        outputFormat.value = "jpg";
        qualityControl.style.display = "none";
        qualitySlider.value = "85";
        qualityValue.textContent = "85%";
      });

      // Helper function to format file size
      function formatFileSize(bytes) {
        if (bytes < 1024) return `${bytes} bytes`;
        else if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
        else return `${(bytes / 1048576).toFixed(1)} MB`;
      }