// Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();

          const targetId = this.getAttribute("href");
          if (targetId === "#") return;

          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 70,
              behavior: "smooth",
            });
          }
        });
      });

      // Live Tester Functionality
      const tabs = document.querySelectorAll(".tab");
      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          // Remove active class from all tabs and editors
          document
            .querySelectorAll(".tab")
            .forEach((t) => t.classList.remove("active"));
          document
            .querySelectorAll(".editor")
            .forEach((e) => e.classList.remove("active"));

          // Add active class to clicked tab and corresponding editor
          tab.classList.add("active");
          const target = tab.getAttribute("data-target");
          document.getElementById(`${target}-editor`).classList.add("active");
        });
      });

      const htmlEditor = document.getElementById("html");
      const cssEditor = document.getElementById("css");
      const jsEditor = document.getElementById("js");
      const previewFrame = document.getElementById("preview");
      const resetBtn = document.getElementById("reset-btn");

      // Debounce function to prevent excessive updates
      function debounce(func, wait) {
        let timeout;
        return function () {
          const context = this,
            args = arguments;
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            func.apply(context, args);
          }, wait);
        };
      }

      function updatePreview() {
        const htmlCode = htmlEditor.value;
        const cssCode = `<link rel="stylesheet" href="style.css" />`;
        const jsCode = `<script>${jsEditor.value}<\/script>`;
        const completeCode = `${htmlCode}\n${cssCode}\n${jsCode}`;

        previewFrame.contentDocument.open();
        previewFrame.contentDocument.write(completeCode);
        previewFrame.contentDocument.close();
      }

      // Update preview on input with debounce
      const debouncedUpdate = debounce(updatePreview, 300);

      htmlEditor.addEventListener("input", debouncedUpdate);
      cssEditor.addEventListener("input", debouncedUpdate);
      jsEditor.addEventListener("input", debouncedUpdate);

      // Reset button click
      resetBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to reset all code editors?")) {
          htmlEditor.value = `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>Edit this code to see live changes</p>
</body>
</html>`;

          cssEditor.value = `body {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 50px;
  color: #3498db;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}`;

          jsEditor.value = `document.querySelector('h1').addEventListener('click', function() {
  this.style.color = '#' + Math.floor(Math.random()*16777215).toString(16);
});`;

          updatePreview();
        }
      });

      // Initial preview
      window.addEventListener("load", updatePreview);