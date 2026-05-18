// Image Resizer Functionality
      const uploadArea = document.getElementById("upload-area");
      const fileInput = document.getElementById("file-input");
      const widthInput = document.getElementById("width-input");
      const heightInput = document.getElementById("height-input");
      const aspectRatioSelect = document.getElementById("aspect-ratio");
      const formatSelect = document.getElementById("format-select");
      const previewContainer = document.getElementById("preview-container");
      const previewImage = document.getElementById("preview-image");
      const originalSizeEl = document.getElementById("original-size");
      const originalDimensionsEl = document.getElementById(
        "original-dimensions"
      );
      const newDimensionsEl = document.getElementById("new-dimensions");
      const formatEl = document.getElementById("format");
      const resizeBtn = document.getElementById("resize-btn");
      const downloadBtn = document.getElementById("download-btn");
      const resetBtn = document.getElementById("reset-btn");

      let originalFile = null;
      let resizedBlob = null;
      let originalAspectRatio = 1;

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

      // Maintain aspect ratio when width changes
      widthInput.addEventListener("input", function () {
        if (aspectRatioSelect.value === "yes" && originalAspectRatio) {
          heightInput.value = Math.round(this.value / originalAspectRatio);
        }
      });

      // Maintain aspect ratio when height changes
      heightInput.addEventListener("input", function () {
        if (aspectRatioSelect.value === "yes" && originalAspectRatio) {
          widthInput.value = Math.round(this.value * originalAspectRatio);
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
        resizeBtn.disabled = false;

        // Display original file info
        originalSizeEl.textContent = formatFileSize(file.size);
        formatEl.textContent = file.type.split("/")[1].toUpperCase();

        // Preview original image
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image();
          img.onload = function () {
            originalDimensionsEl.textContent = `${img.width} × ${img.height}px`;
            originalAspectRatio = img.width / img.height;

            // Set default dimensions (50% of original)
            widthInput.value = Math.round(img.width / 2);
            if (aspectRatioSelect.value === "yes") {
              heightInput.value = Math.round(img.height / 2);
            }

            previewImage.src = e.target.result;
            previewContainer.style.display = "flex";
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

      // Resize image
      resizeBtn.addEventListener("click", function () {
        if (!originalFile) return;

        const targetWidth = parseInt(widthInput.value);
        const targetHeight = parseInt(heightInput.value);
        const format =
          formatSelect.value === "auto"
            ? originalFile.type.split("/")[1]
            : formatSelect.value;

        resizeImage(originalFile, targetWidth, targetHeight, format)
          .then((blob) => {
            // Update UI with resized image info
            newDimensionsEl.textContent = `${targetWidth} × ${targetHeight}px`;

            // Enable download button
            downloadBtn.disabled = false;
            resizedBlob = blob;

            // Update preview
            const reader = new FileReader();
            reader.onload = function (e) {
              previewImage.src = e.target.result;
            };
            reader.readAsDataURL(blob);
          })
          .catch((error) => {
            console.error("Resizing error:", error);
            alert("Error resizing image. Please try again.");
          });
      });

      // Download resized image
      downloadBtn.addEventListener("click", function () {
        if (!resizedBlob) return;

        const url = URL.createObjectURL(resizedBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `resized-${originalFile.name.replace(/\.[^/.]+$/, "")}.${
          resizedBlob.type.split("/")[1]
        }`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });

      // Reset tool
      resetBtn.addEventListener("click", function () {
        fileInput.value = "";
        originalFile = null;
        resizedBlob = null;
        previewContainer.style.display = "none";
        resizeBtn.disabled = true;
        downloadBtn.disabled = true;
        widthInput.value = "800";
        heightInput.value = "600";
        formatSelect.value = "auto";
        aspectRatioSelect.value = "yes";
        originalSizeEl.textContent = "-";
        originalDimensionsEl.textContent = "-";
        newDimensionsEl.textContent = "-";
        formatEl.textContent = "-";
      });

      // Helper function to resize image
      function resizeImage(file, targetWidth, targetHeight, format) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
              // Create canvas
              const canvas = document.createElement("canvas");
              canvas.width = targetWidth;
              canvas.height = targetHeight;
              const ctx = canvas.getContext("2d");

              // Use high-quality image scaling
              ctx.imageSmoothingQuality = "high";

              // Draw image on canvas
              ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

              // Convert to blob with quality based on format
              let quality = 0.92; // Default quality
              if (format === "jpeg" || format === "jpg") {
                quality = 0.92;
              } else if (format === "webp") {
                quality = 0.9;
              }

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