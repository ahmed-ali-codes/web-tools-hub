// PDF Merger Functionality
      const { PDFDocument } = PDFLib;
      const uploadArea = document.getElementById("upload-area");
      const fileInput = document.getElementById("file-input");
      const fileList = document.getElementById("file-list");
      const mergeBtn = document.getElementById("merge-btn");
      const clearBtn = document.getElementById("clear-btn");
      const downloadBtn = document.getElementById("download-btn");
      const outputName = document.getElementById("output-name");
      const pageOrder = document.getElementById("page-order");

      let files = [];
      let mergedPdfBytes = null;

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
          handleFileSelect(e.dataTransfer.files);
        }
      });

      fileInput.addEventListener("change", function () {
        if (this.files.length) {
          handleFileSelect(this.files);
        }
      });

      // Handle file processing
      function handleFileSelect(selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles[i];

          // Check file type
          if (file.type !== "application/pdf") {
            alert("Please select only PDF files");
            continue;
          }

          // Check file size (max 20MB)
          if (file.size > 20 * 1024 * 1024) {
            alert(`File "${file.name}" exceeds 20MB limit`);
            continue;
          }

          files.push(file);
        }

        updateFileList();
      }

      // Update the file list display
      function updateFileList() {
        fileList.innerHTML = "";

        if (files.length === 0) {
          mergeBtn.disabled = true;
          downloadBtn.style.display = "none";
          return;
        }

        mergeBtn.disabled = false;

        files.forEach((file, index) => {
          const fileItem = document.createElement("div");
          fileItem.className = "file-item";
          fileItem.draggable = true;
          fileItem.dataset.index = index;

          fileItem.innerHTML = `
            <div class="file-info">
              <i class="fas fa-file-pdf file-icon"></i>
              <span>${file.name} (${formatFileSize(file.size)})</span>
            </div>
            <div class="file-actions">
              <button class="file-action-btn move-up" title="Move up">
                <i class="fas fa-arrow-up"></i>
              </button>
              <button class="file-action-btn move-down" title="Move down">
                <i class="fas fa-arrow-down"></i>
              </button>
              <button class="file-action-btn remove-file" title="Remove">
                <i class="fas fa-times"></i>
              </button>
            </div>
          `;

          fileList.appendChild(fileItem);
        });

        // Add event listeners for file actions
        document.querySelectorAll(".remove-file").forEach((btn) => {
          btn.addEventListener("click", function () {
            const index = parseInt(this.closest(".file-item").dataset.index);
            files.splice(index, 1);
            updateFileList();
          });
        });

        document.querySelectorAll(".move-up").forEach((btn) => {
          btn.addEventListener("click", function () {
            const index = parseInt(this.closest(".file-item").dataset.index);
            if (index > 0) {
              [files[index], files[index - 1]] = [
                files[index - 1],
                files[index],
              ];
              updateFileList();
            }
          });
        });

        document.querySelectorAll(".move-down").forEach((btn) => {
          btn.addEventListener("click", function () {
            const index = parseInt(this.closest(".file-item").dataset.index);
            if (index < files.length - 1) {
              [files[index], files[index + 1]] = [
                files[index + 1],
                files[index],
              ];
              updateFileList();
            }
          });
        });

        // Drag and drop reordering
        if (pageOrder.value === "custom") {
          setupDragAndDrop();
        }
      }

      // Setup drag and drop reordering
      function setupDragAndDrop() {
        const items = document.querySelectorAll(".file-item");

        items.forEach((item) => {
          item.addEventListener("dragstart", function () {
            this.classList.add("dragging");
          });

          item.addEventListener("dragend", function () {
            this.classList.remove("dragging");
          });
        });

        fileList.addEventListener("dragover", function (e) {
          e.preventDefault();
          const draggingItem = document.querySelector(".dragging");
          const afterElement = getDragAfterElement(this, e.clientY);

          if (afterElement) {
            this.insertBefore(draggingItem, afterElement);
          } else {
            this.appendChild(draggingItem);
          }
        });

        fileList.addEventListener("drop", function (e) {
          e.preventDefault();
          const items = Array.from(this.children);
          const newFiles = [];

          items.forEach((item) => {
            const index = parseInt(item.dataset.index);
            newFiles.push(files[index]);
          });

          files = newFiles;
          updateFileList();
        });
      }

      function getDragAfterElement(container, y) {
        const draggableElements = [
          ...container.querySelectorAll(".file-item:not(.dragging)"),
        ];

        return draggableElements.reduce(
          (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
              return { offset: offset, element: child };
            } else {
              return closest;
            }
          },
          { offset: Number.NEGATIVE_INFINITY }
        ).element;
      }

      // Merge PDFs with actual functionality
      mergeBtn.addEventListener("click", async function () {
        if (files.length < 2) {
          alert("Please select at least 2 PDF files to merge");
          return;
        }

        mergeBtn.disabled = true;
        mergeBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Merging...';

        try {
          const mergedPdf = await PDFDocument.create();

          // Process files in order
          for (const file of files) {
            const fileBytes = await readFileAsArrayBuffer(file);
            const pdfDoc = await PDFDocument.load(fileBytes);
            const pages = await mergedPdf.copyPages(
              pdfDoc,
              pdfDoc.getPageIndices()
            );
            pages.forEach((page) => mergedPdf.addPage(page));
          }

          mergedPdfBytes = await mergedPdf.save();
          downloadBtn.style.display = "inline-block";
          alert(
            "PDFs merged successfully! Click Download to get your merged file."
          );
        } catch (error) {
          console.error("Error merging PDFs:", error);
          alert("Error merging PDFs. Please try again.");
        } finally {
          mergeBtn.disabled = false;
          mergeBtn.innerHTML = '<i class="fas fa-object-group"></i> Merge PDFs';
        }
      });

      // Download merged PDF
      downloadBtn.addEventListener("click", function () {
        if (!mergedPdfBytes) return;

        const filename = outputName.value || "merged-document.pdf";
        download(mergedPdfBytes, filename, "application/pdf");
      });

      // Helper function to read file as ArrayBuffer
      function readFileAsArrayBuffer(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsArrayBuffer(file);
        });
      }

      // Clear all files
      clearBtn.addEventListener("click", function () {
        files = [];
        mergedPdfBytes = null;
        updateFileList();
        downloadBtn.style.display = "none";
        outputName.value = "";
      });

      // Handle page order change
      pageOrder.addEventListener("change", function () {
        if (this.value === "reverse") {
          files.reverse();
          updateFileList();
        } else if (this.value === "custom") {
          setupDragAndDrop();
        }
      });

      // Helper function to format file size
      function formatFileSize(bytes) {
        if (bytes < 1024) return `${bytes} bytes`;
        else if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
        else return `${(bytes / 1048576).toFixed(1)} MB`;
      }