// Audio Converter Functionality
      const uploadArea = document.getElementById("upload-area");
      const fileInput = document.getElementById("file-input");
      const previewContainer = document.getElementById("preview-container");
      const fileNameEl = document.getElementById("file-name");
      const fileSizeEl = document.getElementById("file-size");
      const fileDurationEl = document.getElementById("file-duration");
      const fileFormatEl = document.getElementById("file-format");
      const audioPlayer = document.getElementById("audio-player");
      const convertBtn = document.getElementById("convert-btn");
      const resetBtn = document.getElementById("reset-btn");
      const downloadBtn = document.getElementById("download-btn");
      const conversionResult = document.getElementById("conversion-result");
      const outputFormatDisplay = document.getElementById(
        "output-format-display"
      );
      const outputSizeEl = document.getElementById("output-size");
      const outputFormatSelect = document.getElementById("output-format");
      const bitrateSlider = document.getElementById("bitrate-value");
      const bitrateDisplay = document.getElementById("bitrate-display");

      let audioFile = null;
      let audioFileSize = 0;
      let convertedAudioBlob = null;

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
        if (
          !file.type.startsWith("audio/") &&
          !file.name.match(/\.(mp3|wav|aac|flac|ogg|m4a)$/i)
        ) {
          alert("Please select an audio file (MP3, WAV, AAC, FLAC, OGG)");
          return;
        }

        // Check file size (max 25MB)
        if (file.size > 25 * 1024 * 1024) {
          alert("File size exceeds 25MB limit");
          return;
        }

        audioFile = file;
        audioFileSize = file.size;

        // Display file info
        fileNameEl.textContent = file.name;
        fileSizeEl.textContent = formatFileSize(file.size);

        // Get file extension/format
        const fileExt = file.name.split(".").pop().toLowerCase();
        fileFormatEl.textContent = fileExt.toUpperCase();

        // Create object URL for audio player
        const audioURL = URL.createObjectURL(file);
        audioPlayer.src = audioURL;
        audioPlayer.style.display = "block";

        // Get duration once metadata is loaded
        audioPlayer.onloadedmetadata = function () {
          fileDurationEl.textContent = formatDuration(audioPlayer.duration);
        };

        previewContainer.style.display = "block";
        conversionResult.style.display = "none";
        downloadBtn.style.display = "none";
        convertBtn.disabled = false;
      }

      // Convert button handler
      convertBtn.addEventListener("click", async function () {
        if (!audioFile) return;

        convertBtn.disabled = true;
        convertBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Converting...';

        try {
          // In a real implementation, you would use a Web Audio API or server-side processing
          // This is a simulation of the conversion process
          const outputFormat = outputFormatSelect.value;
          const bitrate = parseInt(bitrateSlider.value);

          // Simulate conversion delay
          await new Promise((resolve) => setTimeout(resolve, 1500));

          // In a real app, you would process the audio file here
          // For demo purposes, we'll just create a dummy blob
          convertedAudioBlob = new Blob(["Simulated converted audio file"], {
            type: `audio/${outputFormat === "mp3" ? "mpeg" : outputFormat}`,
          });

          // Show results
          outputFormatDisplay.textContent = outputFormat.toUpperCase();
          outputSizeEl.textContent = formatFileSize(convertedAudioBlob.size);

          conversionResult.style.display = "block";
          downloadBtn.style.display = "inline-block";
        } catch (error) {
          alert("Error converting audio. Please try again.");
          console.error("Conversion error:", error);
        } finally {
          convertBtn.disabled = false;
          convertBtn.innerHTML =
            '<i class="fas fa-exchange-alt"></i> Convert Audio';
        }
      });

      // Download converted audio
      downloadBtn.addEventListener("click", function () {
        if (!convertedAudioBlob) return;

        const originalName = audioFile.name.replace(/\.[^/.]+$/, "");
        const outputFormat = outputFormatSelect.value;
        const newFilename = `${originalName}-converted.${outputFormat}`;

        saveAs(convertedAudioBlob, newFilename);
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
        audioPlayer.src = "";
        audioPlayer.style.display = "none";
        outputFormatDisplay.textContent = "-";
        outputSizeEl.textContent = "-";
        audioFile = null;
        audioFileSize = 0;
        convertedAudioBlob = null;

        // Reset conversion settings
        outputFormatSelect.value = "mp3";
        bitrateSlider.value = "192";
        bitrateDisplay.textContent = "192 kbps";

        // Reset presets
        document.querySelectorAll(".quality-preset").forEach((preset) => {
          preset.classList.remove("active");
        });
        document
          .querySelector('.quality-preset[data-value="192"]')
          .classList.add("active");
      });

      // Bitrate slider and preset handlers
      bitrateSlider.addEventListener("input", function () {
        bitrateDisplay.textContent = `${this.value} kbps`;
        updateActiveBitratePreset(this.value);
      });

      document.querySelectorAll(".quality-preset").forEach((preset) => {
        preset.addEventListener("click", function () {
          const value = this.getAttribute("data-value");
          bitrateSlider.value = value;
          bitrateDisplay.textContent = `${value} kbps`;

          document.querySelectorAll(".quality-preset").forEach((p) => {
            p.classList.toggle("active", p === this);
          });
        });
      });

      function updateActiveBitratePreset(value) {
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

        if (closestPreset && smallestDiff <= 32) {
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