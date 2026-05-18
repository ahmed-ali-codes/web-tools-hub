// Space Remover Functionality
      const textInput = document.getElementById("text-input");
      const removeBtn = document.getElementById("remove-btn");
      const clearBtn = document.getElementById("clear-btn");
      const copyBtn = document.getElementById("copy-btn");
      const removalOptions = document.querySelectorAll(
        'input[name="removal-type"]'
      );

      // Remove extra spaces based on selected option
      function removeExtraSpaces() {
        const text = textInput.value;
        if (!text) return;

        const selectedOption = document.querySelector(
          'input[name="removal-type"]:checked'
        ).value;

        let cleanedText = text;

        switch (selectedOption) {
          case "all":
            // Remove all extra spaces (multiple spaces, line breaks, leading/trailing)
            cleanedText = text
              .replace(/\s+/g, " ") // Replace multiple spaces with single space
              .replace(/(\r\n|\n|\r)+/gm, "\n") // Normalize line breaks
              .trim(); // Remove leading/trailing spaces
            break;
          case "linebreaks":
            // Remove extra line breaks but keep single line breaks
            cleanedText = text
              .replace(/(\r\n|\n|\r)+/gm, "\n") // Normalize and reduce line breaks
              .trim();
            break;
          case "leading-trailing":
            // Only remove leading and trailing spaces
            cleanedText = text.trim();
            break;
          default:
            cleanedText = text;
        }

        textInput.value = cleanedText;
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
      removeBtn.addEventListener("click", removeExtraSpaces);
      clearBtn.addEventListener("click", clearText);
      copyBtn.addEventListener("click", copyText);

      // Remove spaces on option change
      removalOptions.forEach((option) => {
        option.addEventListener("change", removeExtraSpaces);
      });

      // Process when pressing Enter in textarea (but don't submit)
      textInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && e.ctrlKey) {
          removeExtraSpaces();
          e.preventDefault();
        }
      });