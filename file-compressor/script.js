// File Compressor Functionality
      const uploadArea = document.getElementById("upload-area");
      const fileInput = document.getElementById("file-input");
      const previewContainer = document.getElementById("preview-container");
      const fileNameEl = document.getElementById("file-name");
      const originalSizeEl = document.getElementById("original-size");
      const fileTypeEl = document.getElementById("file-type");
      const fileContentsEl = document.getElementById("file-contents");
      const fileListContainer = document.getElementById("file-list");
      const fileItemsEl = document.getElementById("file-items");
      const compressBtn = document.getElementById("compress-btn");
      const resetBtn = document.getElementById("reset-btn");
      const downloadBtn = document.getElementById("download-btn");
      const compressionResult = document.getElementById("compression-result");
      const compressedSizeEl = document.getElementById("compressed-size");
      const savingsEl = document.getElementById("savings");

      let originalFile = null;
      let originalFileSize = 0;
      let compressedFileBlob = null;
      let fileEntries = [];

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
        const validExtensions = [".zip", ".rar", ".7z", ".tar", ".gz"];
        const fileExt = "." + file.name.split(".").pop().toLowerCase();

        if (!validExtensions.includes(fileExt)) {
          alert(
            "Please select a supported archive file (ZIP, RAR, 7Z, TAR, GZ)"
          );
          return;
        }

        // Check file size (max 100MB)
        if (file.size > 100 * 1024 * 1024) {
          alert("File size exceeds 100MB limit");
          return;
        }

        originalFile = file;
        originalFileSize = file.size;

        // Display file info
        fileNameEl.textContent = file.name;
        originalSizeEl.textContent = formatFileSize(file.size);
        fileTypeEl.textContent = fileExt.toUpperCase().replace(".", "");

        // For demo purposes, we'll simulate reading the archive
        // In a real implementation, you would use a library like JSZip or similar
        simulateArchiveReading(file);

        previewContainer.style.display = "block";
        compressionResult.style.display = "none";
        downloadBtn.style.display = "none";
        compressBtn.disabled = false;
      }

      // Simulate reading archive contents (demo only)
      function simulateArchiveReading(file) {
        // Clear previous entries
        fileEntries = [];
        fileItemsEl.innerHTML = "";

        // Generate random file entries for demo
        const fileCount = Math.floor(Math.random() * 10) + 1;
        let totalSize = 0;

        for (let i = 0; i < fileCount; i++) {
          const fileName = `file${i + 1}.${
            i % 3 === 0 ? "txt" : i % 3 === 1 ? "jpg" : "pdf"
          }`;
          const fileSize = Math.floor(Math.random() * 500000) + 1000;
          totalSize += fileSize;

          fileEntries.push({
            name: fileName,
            size: fileSize,
          });

          // Add to UI
          const fileItem = document.createElement("div");
          fileItem.className = "file-item";
          fileItem.innerHTML = `
                    <span><i class="fas fa-file file-icon"></i>${fileName}</span>
                    <span>${formatFileSize(fileSize)}</span>
                `;
          fileItemsEl.appendChild(fileItem);
        }

        fileContentsEl.textContent = `${fileCount} files`;
        fileListContainer.style.display = "block";
      }

      // Compress button handler
      compressBtn.addEventListener("click", async function () {
        if (!originalFile) return;

        compressBtn.disabled = true;
        compressBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Compressing...';

        try {
          const outputFormat = document.getElementById("output-format").value;
          const compressionLevel = parseInt(
            document.getElementById("compression-level").value
          );
          const compressionMethod =
            document.getElementById("compression-method").value;

          // Simulate compression delay
          await new Promise((resolve) => setTimeout(resolve, 2000));

          // Calculate simulated compression based on settings
          let compressionRatio = 0.3 + 0.6 * (compressionLevel / 9);
          if (compressionMethod === "lzma") compressionRatio *= 0.9;
          if (compressionMethod === "ppmd") compressionRatio *= 0.85;
          if (compressionMethod === "bzip2") compressionRatio *= 0.95;

          // Create simulated compressed file
          const compressedSize = Math.max(
            1000,
            Math.floor(originalFileSize * compressionRatio)
          );
          compressedFileBlob = new Blob(["Simulated compressed archive data"], {
            type: "application/zip",
          });

          // Show results
          compressedSizeEl.textContent = formatFileSize(compressedSize);
          const savingsPercent = (
            ((originalFileSize - compressedSize) / originalFileSize) *
            100
          ).toFixed(1);
          savingsEl.textContent = `${savingsPercent}% smaller`;

          compressionResult.style.display = "block";
          downloadBtn.style.display = "inline-block";
        } catch (error) {
          alert("Error compressing file. Please try again.");
          console.error("Compression error:", error);
        } finally {
          compressBtn.disabled = false;
          compressBtn.innerHTML =
            '<i class="fas fa-compress-alt"></i> Compress File';
        }
      });

      // Download compressed file
      downloadBtn.addEventListener("click", function () {
        if (!compressedFileBlob) return;

        const originalName = originalFile.name.replace(/\.[^/.]+$/, "");
        const outputFormat = document.getElementById("output-format").value;
        const newFilename = `${originalName}-compressed.${outputFormat}`;

        saveAs(compressedFileBlob, newFilename);
      });

      // Reset tool
      resetBtn.addEventListener("click", function () {
        fileInput.value = "";
        previewContainer.style.display = "none";
        compressionResult.style.display = "none";
        downloadBtn.style.display = "none";
        compressBtn.disabled = true;
        fileNameEl.textContent = "-";
        originalSizeEl.textContent = "-";
        fileTypeEl.textContent = "-";
        fileContentsEl.textContent = "-";
        fileListContainer.style.display = "none";
        fileItemsEl.innerHTML = "";
        originalFile = null;
        originalFileSize = 0;
        compressedFileBlob = null;
        fileEntries = [];

        // Reset compression settings
        document.getElementById("output-format").value = "zip";
        document.getElementById("compression-level").value = "5";
        document.getElementById("compression-value").textContent = "5 (Medium)";
        document.getElementById("compression-method").value = "deflate";

        // Reset presets
        document.querySelectorAll(".compression-preset").forEach((preset) => {
          preset.classList.remove("active");
        });
        document
          .querySelector('.compression-preset[data-value="5"]')
          .classList.add("active");
      });

      // Compression level slider and preset handlers
      document
        .getElementById("compression-level")
        .addEventListener("input", function () {
          const level = parseInt(this.value);
          let levelText = "";

          if (level <= 2) levelText = `${level} (Fastest)`;
          else if (level <= 4) levelText = `${level} (Fast)`;
          else if (level <= 6) levelText = `${level} (Medium)`;
          else if (level <= 8) levelText = `${level} (High)`;
          else levelText = `${level} (Maximum)`;

          document.getElementById("compression-value").textContent = levelText;
          updateActiveCompressionPreset(level);
        });

      document.querySelectorAll(".compression-preset").forEach((preset) => {
        preset.addEventListener("click", function () {
          const value = this.getAttribute("data-value");
          document.getElementById("compression-level").value = value;

          const level = parseInt(value);
          let levelText = "";

          if (level <= 2) levelText = `${level} (Fastest)`;
          else if (level <= 4) levelText = `${level} (Fast)`;
          else if (level <= 6) levelText = `${level} (Medium)`;
          else if (level <= 8) levelText = `${level} (High)`;
          else levelText = `${level} (Maximum)`;

          document.getElementById("compression-value").textContent = levelText;

          document.querySelectorAll(".compression-preset").forEach((p) => {
            p.classList.toggle("active", p === this);
          });
        });
      });

      function updateActiveCompressionPreset(value) {
        let closestPreset = null;
        let smallestDiff = Infinity;

        document.querySelectorAll(".compression-preset").forEach((preset) => {
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