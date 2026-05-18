// Base64 Converter Functionality
      const uploadArea = document.getElementById("upload-area");
      const fileInput = document.getElementById("file-input");
      const previewContainer = document.getElementById("preview-container");
      const previewImage = document.getElementById("preview-image");
      const base64Output = document.getElementById("base64-output");
      const fileNameEl = document.getElementById("file-name");
      const fileSizeEl = document.getElementById("file-size");
      const dimensionsEl = document.getElementById("dimensions");
      const mimeTypeEl = document.getElementById("mime-type");
      const convertBtn = document.getElementById("convert-btn");
      const copyBtn = document.getElementById("copy-btn");
      const resetBtn = document.getElementById("reset-btn");

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

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert("File size exceeds 5MB limit");
          return;
        }

        // Display file info
        fileNameEl.textContent = file.name;
        fileSizeEl.textContent = formatFileSize(file.size);
        mimeTypeEl.textContent = file.type;

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

      // Convert to Base64
      convertBtn.addEventListener("click", function () {
        if (!fileInput.files.length) return;

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
          base64Output.value = event.target.result;
          copyBtn.disabled = false;
        };

        reader.onerror = function (error) {
          console.error("Error converting file:", error);
          alert("Error converting image to Base64. Please try again.");
        };

        reader.readAsDataURL(file);
      });

      // Copy Base64 to clipboard
      copyBtn.addEventListener("click", function () {
        if (!base64Output.value) return;

        base64Output.select();
        document.execCommand("copy");

        // Change button text temporarily
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';

        setTimeout(() => {
          copyBtn.innerHTML = originalText;
        }, 2000);
      });

      // Reset tool
      resetBtn.addEventListener("click", function () {
        fileInput.value = "";
        previewContainer.style.display = "none";
        base64Output.value = "";
        convertBtn.disabled = true;
        copyBtn.disabled = true;
        fileNameEl.textContent = "-";
        fileSizeEl.textContent = "-";
        dimensionsEl.textContent = "-";
        mimeTypeEl.textContent = "-";
      });

      // Helper function to format file size
      function formatFileSize(bytes) {
        if (bytes < 1024) return `${bytes} bytes`;
        else if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
        else return `${(bytes / 1048576).toFixed(1)} MB`;
      }