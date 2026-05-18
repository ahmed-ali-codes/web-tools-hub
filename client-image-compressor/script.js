// Image Compressor Functionality
      const uploadArea = document.getElementById("upload-area");
      const fileInput = document.getElementById("file-input");
      const qualitySlider = document.getElementById("quality-slider");
      const qualityValue = document.getElementById("quality-value");
      const widthSlider = document.getElementById("width-slider");
      const widthValue = document.getElementById("width-value");
      const formatSelect = document.getElementById("format-select");
      const previewContainer = document.getElementById("preview-container");
      const previewImage = document.getElementById("preview-image");
      const originalSizeEl = document.getElementById("original-size");
      const compressedSizeEl = document.getElementById("compressed-size");
      const reductionEl = document.getElementById("reduction");
      const dimensionsEl = document.getElementById("dimensions");
      const formatEl = document.getElementById("format");
      const compressBtn = document.getElementById("compress-btn");
      const downloadBtn = document.getElementById("download-btn");
      const resetBtn = document.getElementById("reset-btn");

      let originalFile = null;
      let compressedBlob = null;

      // Update slider values display
      qualitySlider.addEventListener("input", function () {
        qualityValue.textContent = `${this.value}%`;
      });

      widthSlider.addEventListener("input", function () {
        widthValue.textContent = `${this.value}px`;
      });

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

      // Handle file processing
      function handleFileSelect(file) {
        // Check file type
        if (!file.type.match("image.*")) {
          alert("Please select an image file (JPG, PNG, WEBP)");
          return;
        }

        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          alert("File size exceeds 10MB limit");
          return;
        }

        originalFile = file;
        compressBtn.disabled = false;

        // Display original file info
        originalSizeEl.textContent = formatFileSize(file.size);
        formatEl.textContent = file.type.split("/")[1].toUpperCase();

        // Preview original image
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image();
          img.onload = function () {
            dimensionsEl.textContent = `${img.width} × ${img.height}px`;
            // Set width slider max to original image width
            widthSlider.max = img.width;
            widthSlider.value = Math.min(img.width, 1000);
            widthValue.textContent = `${widthSlider.value}px`;

            previewImage.src = e.target.result;
            previewContainer.style.display = "flex";
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

      // Compress image
      compressBtn.addEventListener("click", function () {
        if (!originalFile) return;

        const quality = parseInt(qualitySlider.value) / 100;
        const targetWidth = parseInt(widthSlider.value);
        const format =
          formatSelect.value === "auto"
            ? originalFile.type.split("/")[1]
            : formatSelect.value;

        compressImage(originalFile, targetWidth, quality, format)
          .then((blob) => {
            // Update UI with compressed image info
            const compressedSize = blob.size;
            const reduction = (
              ((originalFile.size - compressedSize) / originalFile.size) *
              100
            ).toFixed(1);

            compressedSizeEl.textContent = formatFileSize(compressedSize);
            reductionEl.textContent = `${reduction}% smaller`;

            // Enable download button
            downloadBtn.disabled = false;
            compressedBlob = blob;

            // Update preview
            const reader = new FileReader();
            reader.onload = function (e) {
              previewImage.src = e.target.result;
            };
            reader.readAsDataURL(blob);
          })
          .catch((error) => {
            console.error("Compression error:", error);
            alert("Error compressing image. Please try again.");
          });
      });

      // Download compressed image
      downloadBtn.addEventListener("click", function () {
        if (!compressedBlob) return;

        const url = URL.createObjectURL(compressedBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `compressed-${originalFile.name.replace(
          /\.[^/.]+$/,
          ""
        )}.${compressedBlob.type.split("/")[1]}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });

      // Reset tool
      resetBtn.addEventListener("click", function () {
        fileInput.value = "";
        originalFile = null;
        compressedBlob = null;
        previewContainer.style.display = "none";
        compressBtn.disabled = true;
        downloadBtn.disabled = true;
        qualitySlider.value = 80;
        qualityValue.textContent = "80%";
        widthSlider.value = 1000;
        widthValue.textContent = "1000px";
        formatSelect.value = "auto";
      });

      // Helper function to compress image
      function compressImage(file, targetWidth, quality, format) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
              // Calculate target height maintaining aspect ratio
              const aspectRatio = img.width / img.height;
              const targetHeight = Math.round(targetWidth / aspectRatio);

              // Create canvas
              const canvas = document.createElement("canvas");
              canvas.width = targetWidth;
              canvas.height = targetHeight;
              const ctx = canvas.getContext("2d");

              // Draw image on canvas
              ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

              // Convert to blob
              canvas.toBlob(
                (blob) => {
                  if (!blob) {
                    reject(new Error("Canvas toBlob failed"));
                    return;
                  }
                  resolve(blob);
                },
                `image/${format}`,
                quality
              );
            };
            img.onerror = reject;
            img.src = event.target.result;
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }

      // Helper function to format file size
      function formatFileSize(bytes) {
        if (bytes < 1024) return `${bytes} bytes`;
        else if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
        else return `${(bytes / 1048576).toFixed(1)} MB`;
      }