// Case Converter Functionality
      const textInput = document.getElementById("text-input");
      const convertBtn = document.getElementById("convert-btn");
      const clearBtn = document.getElementById("clear-btn");
      const copyBtn = document.getElementById("copy-btn");
      const caseOptions = document.querySelectorAll('input[name="case"]');

      // Convert text based on selected case
      function convertText() {
        const text = textInput.value;
        if (!text) return;

        const selectedCase = document.querySelector(
          'input[name="case"]:checked'
        ).value;

        let convertedText = "";

        switch (selectedCase) {
          case "uppercase":
            convertedText = text.toUpperCase();
            break;
          case "lowercase":
            convertedText = text.toLowerCase();
            break;
          case "titlecase":
            convertedText = text
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase());
            break;
          case "sentencecase":
            convertedText = text
              .toLowerCase()
              .replace(/(^\s*\w|[.!?]\s*\w)/g, (char) => char.toUpperCase());
            break;
          case "capitalizedcase":
            convertedText = text
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ");
            break;
          case "invertcase":
            convertedText = text
              .split("")
              .map((char) =>
                char === char.toUpperCase()
                  ? char.toLowerCase()
                  : char.toUpperCase()
              )
              .join("");
            break;
          default:
            convertedText = text;
        }

        textInput.value = convertedText;
      }

      // Clear text
      function clearText() {
        textInput.value = "";
      }

      // Copy text
      function copyText() {
        textInput.select();
        document.execCommand("copy");

        // Change button text temporarily
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';

        setTimeout(() => {
          copyBtn.innerHTML = originalText;
        }, 2000);
      }

      // Event listeners
      convertBtn.addEventListener("click", convertText);
      clearBtn.addEventListener("click", clearText);
      copyBtn.addEventListener("click", copyText);

      // Convert on case option change
      caseOptions.forEach((option) => {
        option.addEventListener("change", convertText);
      });

      // Convert when pressing Enter in textarea (but don't submit)
      textInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && e.ctrlKey) {
          convertText();
          e.preventDefault();
        }
      });