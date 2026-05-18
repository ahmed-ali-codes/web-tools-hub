// Image Compressor Functionality
      const uploadArea = document.getElementById("upload-area");
      const fileInput = document.getElementById("file-input");
      const previewContainer = document.getElementById("preview-container");
      const previewImage = document.getElementById("preview-image");
      const outputFormat = document.getElementById("output-format");
      const qualitySlider = document.getElementById("quality");
      const qualityValue = document.getElementById("quality-value");
      const compressBtn = document.getElementById("compress-btn");
      const downloadBtn = document.getElementById("download-btn");
      const resetBtn = document.getElementById("reset-btn");
      const compressionInfo = document.getElementById("compression-info");
      const originalSizeEl = document.getElementById("original-size");
      const compressedSizeEl = document.getElementById("compressed-size");
      const savingsEl = document.getElementById("savings");

      let currentFile = null;
      let originalFileSize = 0;
      let compressedBlob = null;

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

        currentFile = file;
        originalFileSize = file.size;

        // Preview image
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image();
          img.onload = function () {
            previewImage.src = e.target.result;
            previewContainer.style.display = "flex";

            // Set default format to match input
            const format = file.name.split(".").pop().toLowerCase();
            if (
              format === "jpg" ||
              format === "jpeg" ||
              format === "png" ||
              format === "webp"
            ) {
              outputFormat.value = format === "jpeg" ? "jpg" : format;
            }
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);

        // Enable compress button
        compressBtn.disabled = false;
      }

      // Compress image
      compressBtn.addEventListener("click", function () {
        if (!currentFile) return;

        compressBtn.disabled = true;
        compressBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Compressing...';

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

            // Determine output format
            let format = outputFormat.value;
            if (format === "auto") {
              const ext = currentFile.name.split(".").pop().toLowerCase();
              format = ext === "jpeg" ? "jpg" : ext;
            }

            // Set mime type and quality
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
              default:
                mimeType = "image/jpeg";
            }

            const quality = parseInt(qualitySlider.value) / 100;

            // Convert to blob
            canvas.toBlob(
              function (blob) {
                compressedBlob = blob;

                // Show compression info
                originalSizeEl.textContent = formatFileSize(originalFileSize);
                compressedSizeEl.textContent = formatFileSize(blob.size);

                const savings = (
                  ((originalFileSize - blob.size) / originalFileSize) *
                  100
                ).toFixed(1);
                savingsEl.textContent = `${savings}% smaller`;

                compressionInfo.style.display = "block";
                downloadBtn.style.display = "inline-block";
                compressBtn.disabled = false;
                compressBtn.innerHTML =
                  '<i class="fas fa-compress-alt"></i> Compress Image';
              },
              mimeType,
              quality
            );
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(currentFile);
      });

      // Download compressed image
      downloadBtn.addEventListener("click", function () {
        if (!compressedBlob) return;

        const originalName = currentFile.name.split(".").shift();
        let extension;
        switch (outputFormat.value) {
          case "jpg":
            extension = "jpg";
            break;
          case "png":
            extension = "png";
            break;
          case "webp":
            extension = "webp";
            break;
          default:
            extension = currentFile.name.split(".").pop();
        }
        const newFilename = `${originalName}-compressed.${extension}`;

        const url = URL.createObjectURL(compressedBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = newFilename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });

      // Reset tool
      resetBtn.addEventListener("click", function () {
        fileInput.value = "";
        previewContainer.style.display = "none";
        compressionInfo.style.display = "none";
        downloadBtn.style.display = "none";
        compressBtn.disabled = true;
        currentFile = null;
        compressedBlob = null;
        originalFileSize = 0;
        outputFormat.value = "auto";
        qualitySlider.value = "80";
        qualityValue.textContent = "80%";
      });

      // Helper function to format file size
      function formatFileSize(bytes) {
        if (bytes < 1024) return `${bytes} bytes`;
        else if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
        else return `${(bytes / 1048576).toFixed(1)} MB`;
      }