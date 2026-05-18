// PDF Compressor Functionality
      const uploadArea = document.getElementById("upload-area");
      const fileInput = document.getElementById("file-input");
      const previewContainer = document.getElementById("preview-container");
      const fileNameEl = document.getElementById("file-name");
      const originalSizeEl = document.getElementById("original-size");
      const pageCountEl = document.getElementById("page-count");
      const compressBtn = document.getElementById("compress-btn");
      const resetBtn = document.getElementById("reset-btn");
      const downloadBtn = document.getElementById("download-btn");
      const compressionResult = document.getElementById("compression-result");
      const compressedSizeEl = document.getElementById("compressed-size");
      const savingsEl = document.getElementById("savings");

      let originalFile = null;
      let originalFileSize = 0;
      let compressedPdfBytes = null;

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
      async function handleFileSelect(file) {
        // Check file type
        if (file.type !== "application/pdf") {
          alert("Please select a PDF file");
          return;
        }

        // Check file size (max 25MB)
        if (file.size > 25 * 1024 * 1024) {
          alert("File size exceeds 25MB limit");
          return;
        }

        originalFile = file;
        originalFileSize = file.size;

        // Display file info
        fileNameEl.textContent = file.name;
        originalSizeEl.textContent = formatFileSize(file.size);

        try {
          const fileBytes = await readFileAsArrayBuffer(file);
          const pdfDoc = await PDFLib.PDFDocument.load(fileBytes);
          pageCountEl.textContent = pdfDoc.getPageCount();

          previewContainer.style.display = "block";
          compressionResult.style.display = "none";
          downloadBtn.style.display = "none";
          compressBtn.disabled = false;
        } catch (error) {
          alert("Error loading PDF file. Please try again.");
          console.error("PDF loading error:", error);
        }
      }

      // Enhanced compression function
      async function compressPdfWithPercentage(
        fileBytes,
        targetReduction,
        method
      ) {
        let pdfDoc = await PDFLib.PDFDocument.load(fileBytes);
        let pages = pdfDoc.getPages();
        let originalSize = fileBytes.byteLength;

        // First pass - basic compression
        let compressedBytes = await pdfDoc.save({
          useObjectStreams: true,
          useCompression: true,
        });

        // Check if we've reached target
        let currentReduction = 1 - compressedBytes.byteLength / originalSize;
        if (currentReduction >= targetReduction / 100) {
          return compressedBytes;
        }

        // Second pass - more aggressive if needed
        if (method === "aggressive") {
          pdfDoc = await PDFLib.PDFDocument.load(compressedBytes);
          pages = pdfDoc.getPages();

          // Reduce font sizes (but keep readable)
          pages.forEach((page) => {
            const currentSize = page.getFontSize();
            if (currentSize > 8) {
              page.setFontSize(Math.max(8, currentSize * 0.85));
            }
          });

          // Additional compression options
          compressedBytes = await pdfDoc.save({
            useObjectStreams: true,
            useCompression: true,
            // These options help reduce size but may affect quality
            // removeDefaultInstance: true,
            // saveInternalStreams: false
          });

          currentReduction = 1 - compressedBytes.byteLength / originalSize;
          if (currentReduction >= targetReduction / 100) {
            return compressedBytes;
          }

          // Third pass - extreme measures for high targets
          if (targetReduction >= 60) {
            pdfDoc = await PDFLib.PDFDocument.load(compressedBytes);
            pages = pdfDoc.getPages();

            // Additional size reduction techniques
            pages.forEach((page) => {
              // Further reduce font sizes for very high compression
              if (targetReduction >= 70) {
                const currentSize = page.getFontSize();
                if (currentSize > 6) {
                  page.setFontSize(Math.max(6, currentSize * 0.8));
                }
              }
            });

            compressedBytes = await pdfDoc.save({
              useObjectStreams: true,
              useCompression: true,
              // More aggressive options
              // saveInternalStreams: false,
              // preserveAnnotations: false
            });
          }
        }

        return compressedBytes;
      }

      // Compress button handler
      compressBtn.addEventListener("click", async function () {
        if (!originalFile) return;

        compressBtn.disabled = true;
        compressBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Compressing...';

        try {
          const fileBytes = await readFileAsArrayBuffer(originalFile);
          const targetReduction = parseInt(
            document.getElementById("compression-percent").value
          );
          const method = document.getElementById("compression-method").value;

          compressedPdfBytes = await compressPdfWithPercentage(
            fileBytes,
            targetReduction,
            method
          );

          // Show results
          const compressedSize = compressedPdfBytes.byteLength;
          const savings = (
            ((originalFileSize - compressedSize) / originalFileSize) *
            100
          ).toFixed(1);

          compressedSizeEl.textContent = formatFileSize(compressedSize);
          savingsEl.textContent = `${savings}% smaller`;

          compressionResult.style.display = "block";
          downloadBtn.style.display = "inline-block";

          // Show warning for high compression
          if (targetReduction > 60 && savings < targetReduction * 0.9) {
            alert(
              "Note: This PDF couldn't be compressed as much as requested without significant quality loss. Try the 'Aggressive' mode for better results."
            );
          }
        } catch (error) {
          alert(
            "Error compressing PDF. Please try a lower compression setting."
          );
          console.error("Compression error:", error);
        } finally {
          compressBtn.disabled = false;
          compressBtn.innerHTML =
            '<i class="fas fa-compress-alt"></i> Compress PDF';
        }
      });

      // Download compressed PDF
      downloadBtn.addEventListener("click", function () {
        if (!compressedPdfBytes) return;

        const originalName = originalFile.name.replace(".pdf", "");
        const newFilename = `${originalName}-compressed.pdf`;

        const blob = new Blob([compressedPdfBytes], {
          type: "application/pdf",
        });
        saveAs(blob, newFilename);
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
        pageCountEl.textContent = "-";
        compressedSizeEl.textContent = "-";
        savingsEl.textContent = "-";
        originalFile = null;
        originalFileSize = 0;
        compressedPdfBytes = null;

        // Reset compression settings
        document.getElementById("compression-method").value = "balanced";
        document.getElementById("compression-percent").value = "50";
        document.getElementById("compression-value").textContent = "50%";

        // Reset presets
        document.querySelectorAll(".quality-preset").forEach((preset) => {
          preset.classList.remove("active");
        });
        document
          .querySelector('.quality-preset[data-value="50"]')
          .classList.add("active");
      });

      // Slider and preset handlers
      document
        .getElementById("compression-percent")
        .addEventListener("input", function () {
          document.getElementById(
            "compression-value"
          ).textContent = `${this.value}%`;
          updateActivePreset(this.value);
        });

      document.querySelectorAll(".quality-preset").forEach((preset) => {
        preset.addEventListener("click", function () {
          const value = this.getAttribute("data-value");
          document.getElementById("compression-percent").value = value;
          document.getElementById(
            "compression-value"
          ).textContent = `${value}%`;

          document.querySelectorAll(".quality-preset").forEach((p) => {
            p.classList.toggle("active", p === this);
          });
        });
      });

      function updateActivePreset(value) {
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

        if (closestPreset && smallestDiff <= 10) {
          closestPreset.classList.add("active");
        }
      }

      // Helper function to read file as ArrayBuffer
      function readFileAsArrayBuffer(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsArrayBuffer(file);
        });
      }

      // Helper function to format file size
      function formatFileSize(bytes) {
        if (bytes < 1024) return `${bytes} bytes`;
        else if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
        else return `${(bytes / 1048576).toFixed(1)} MB`;
      }