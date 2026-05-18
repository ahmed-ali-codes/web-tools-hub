// Video Converter Functionality
      const uploadArea = document.getElementById("upload-area");
      const fileInput = document.getElementById("file-input");
      const previewContainer = document.getElementById("preview-container");
      const fileNameEl = document.getElementById("file-name");
      const fileSizeEl = document.getElementById("file-size");
      const fileDurationEl = document.getElementById("file-duration");
      const fileFormatEl = document.getElementById("file-format");
      const fileResolutionEl = document.getElementById("file-resolution");
      const videoPlayer = document.getElementById("video-player");
      const convertBtn = document.getElementById("convert-btn");
      const resetBtn = document.getElementById("reset-btn");
      const downloadBtn = document.getElementById("download-btn");
      const conversionResult = document.getElementById("conversion-result");
      const outputFormatDisplay = document.getElementById(
        "output-format-display"
      );
      const outputResolutionEl = document.getElementById("output-resolution");
      const outputSizeEl = document.getElementById("output-size");
      const outputFormatSelect = document.getElementById("output-format");
      const qualitySlider = document.getElementById("quality-value");
      const qualityDisplay = document.getElementById("quality-display");
      const resolutionOptions = document.querySelectorAll(".resolution-option");

      let videoFile = null;
      let videoFileSize = 0;
      let originalWidth = 0;
      let originalHeight = 0;
      let convertedVideoBlob = null;

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
        const validExtensions = [
          ".mp4",
          ".avi",
          ".mov",
          ".mkv",
          ".wmv",
          ".flv",
        ];
        const fileExt = "." + file.name.split(".").pop().toLowerCase();

        if (!validExtensions.includes(fileExt)) {
          alert(
            "Please select a supported video file (MP4, AVI, MOV, MKV, WMV, FLV)"
          );
          return;
        }

        // Check file size (max 100MB)
        if (file.size > 100 * 1024 * 1024) {
          alert("File size exceeds 100MB limit");
          return;
        }

        videoFile = file;
        videoFileSize = file.size;

        // Display file info
        fileNameEl.textContent = file.name;
        fileSizeEl.textContent = formatFileSize(file.size);
        fileFormatEl.textContent = fileExt.toUpperCase().replace(".", "");

        // Create object URL for video player
        const videoURL = URL.createObjectURL(file);
        videoPlayer.src = videoURL;
        videoPlayer.style.display = "block";

        // Get metadata once loaded
        videoPlayer.onloadedmetadata = function () {
          fileDurationEl.textContent = formatDuration(videoPlayer.duration);
          originalWidth = videoPlayer.videoWidth;
          originalHeight = videoPlayer.videoHeight;
          fileResolutionEl.textContent = `${originalWidth}×${originalHeight}`;

          // Update resolution options to include original dimensions
          document.querySelector(
            '.resolution-option[data-width="original"]'
          ).textContent = `Original (${originalWidth}×${originalHeight})`;
        };

        previewContainer.style.display = "block";
        conversionResult.style.display = "none";
        downloadBtn.style.display = "none";
        convertBtn.disabled = false;
      }

      // Convert button handler
      convertBtn.addEventListener("click", async function () {
        if (!videoFile) return;

        convertBtn.disabled = true;
        convertBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Converting...';

        try {
          const outputFormat = outputFormatSelect.value;
          const quality = parseInt(qualitySlider.value);
          const frameRate = document.getElementById("frame-rate").value;

          // Get selected resolution
          let selectedResolution = null;
          document.querySelectorAll(".resolution-option").forEach((option) => {
            if (option.classList.contains("active")) {
              selectedResolution = option.getAttribute("data-width");
            }
          });

          let outputWidth, outputHeight;
          if (selectedResolution === "original") {
            outputWidth = originalWidth;
            outputHeight = originalHeight;
          } else {
            outputWidth = parseInt(selectedResolution);
            // Calculate height maintaining aspect ratio
            const aspectRatio = originalWidth / originalHeight;
            outputHeight = Math.round(outputWidth / aspectRatio);
          }

          // Simulate conversion delay
          await new Promise((resolve) => setTimeout(resolve, 2000));

          // Calculate simulated output size based on quality and resolution
          let sizeFactor =
            (quality / 10) *
            (outputWidth / originalWidth) *
            (outputHeight / originalHeight);
          if (frameRate !== "original") sizeFactor *= 1.2; // Higher frame rate = larger file

          const outputSize = Math.max(
            100000,
            Math.floor(videoFileSize * sizeFactor)
          );

          // Create simulated converted file
          convertedVideoBlob = new Blob(["Simulated converted video data"], {
            type: `video/${outputFormat === "mp4" ? "mp4" : outputFormat}`,
          });

          // Show results
          outputFormatDisplay.textContent = outputFormat.toUpperCase();
          outputResolutionEl.textContent = `${outputWidth}×${outputHeight}`;
          outputSizeEl.textContent = formatFileSize(outputSize);

          conversionResult.style.display = "block";
          downloadBtn.style.display = "inline-block";
        } catch (error) {
          alert("Error converting video. Please try again.");
          console.error("Conversion error:", error);
        } finally {
          convertBtn.disabled = false;
          convertBtn.innerHTML =
            '<i class="fas fa-exchange-alt"></i> Convert Video';
        }
      });

      // Download converted video
      downloadBtn.addEventListener("click", function () {
        if (!convertedVideoBlob) return;

        const originalName = videoFile.name.replace(/\.[^/.]+$/, "");
        const outputFormat = outputFormatSelect.value;
        const newFilename = `${originalName}-converted.${outputFormat}`;

        saveAs(convertedVideoBlob, newFilename);
      });

      // Reset tool
      resetBtn.addEventListener("click", function () {
        fileInput.value = "";
        previewContainer.style.display = "none";
        conversionResult.style.display = "none";
        downloadBtn.style.display = "none";
        convertBtn.disabled = true;
        fileNameEl.textContent = "-";
        fileSizeEl.textContent = "-";
        fileDurationEl.textContent = "-";
        fileFormatEl.textContent = "-";
        fileResolutionEl.textContent = "-";
        videoPlayer.src = "";
        videoPlayer.style.display = "none";
        outputFormatDisplay.textContent = "-";
        outputResolutionEl.textContent = "-";
        outputSizeEl.textContent = "-";
        videoFile = null;
        videoFileSize = 0;
        originalWidth = 0;
        originalHeight = 0;
        convertedVideoBlob = null;

        // Reset conversion settings
        outputFormatSelect.value = "mp4";
        qualitySlider.value = "7";
        qualityDisplay.textContent = "7 (Good)";
        document.getElementById("frame-rate").value = "original";

        // Reset presets
        document.querySelectorAll(".quality-preset").forEach((preset) => {
          preset.classList.remove("active");
        });
        document
          .querySelector('.quality-preset[data-value="7"]')
          .classList.add("active");

        // Reset resolution options
        document.querySelectorAll(".resolution-option").forEach((option) => {
          option.classList.remove("active");
        });
        document
          .querySelector('.resolution-option[data-width="1920"]')
          .classList.add("active");
      });

      // Resolution option handlers
      resolutionOptions.forEach((option) => {
        option.addEventListener("click", function () {
          resolutionOptions.forEach((opt) => opt.classList.remove("active"));
          this.classList.add("active");
        });
      });

      // Quality slider and preset handlers
      qualitySlider.addEventListener("input", function () {
        const quality = parseInt(this.value);
        let qualityText = "";

        if (quality <= 3) qualityText = `${quality} (Low)`;
        else if (quality <= 5) qualityText = `${quality} (Medium)`;
        else if (quality <= 8) qualityText = `${quality} (Good)`;
        else if (quality <= 9) qualityText = `${quality} (High)`;
        else qualityText = `${quality} (Best)`;

        qualityDisplay.textContent = qualityText;
        updateActiveQualityPreset(quality);
      });

      document.querySelectorAll(".quality-preset").forEach((preset) => {
        preset.addEventListener("click", function () {
          const value = this.getAttribute("data-value");
          qualitySlider.value = value;

          const quality = parseInt(value);
          let qualityText = "";

          if (quality <= 3) qualityText = `${quality} (Low)`;
          else if (quality <= 5) qualityText = `${quality} (Medium)`;
          else if (quality <= 8) qualityText = `${quality} (Good)`;
          else if (quality <= 9) qualityText = `${quality} (High)`;
          else qualityText = `${quality} (Best)`;

          qualityDisplay.textContent = qualityText;

          document.querySelectorAll(".quality-preset").forEach((p) => {
            p.classList.toggle("active", p === this);
          });
        });
      });

      function updateActiveQualityPreset(value) {
        let closestPreset = null;
        let smallestDiff = Infinity;

        document.querySelectorAll(".quality-preset").forEach((preset) => {
          const presetValue = parseInt(preset.getAttribute("data-value"));
          const diff = Math.abs(presetValue - value);

          if (diff < smallestDiff) {
            smallestDiff = diff;
            closestPreset = preset;
          }
          preset.classList.remove("active");
        });

        if (closestPreset && smallestDiff <= 1) {
          closestPreset.classList.add("active");
        }
      }

      // Helper function to format file size
      function formatFileSize(bytes) {
        if (bytes < 1024) return `${bytes} bytes`;
        else if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
        else return `${(bytes / 1048576).toFixed(1)} MB`;
      }

      // Helper function to format duration
      function formatDuration(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
      }