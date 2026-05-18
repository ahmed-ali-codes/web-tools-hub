// Lorem Ipsum Generator Functionality
      const generateBtn = document.getElementById("generate-btn");
      const copyBtn = document.getElementById("copy-btn");
      const clearBtn = document.getElementById("clear-btn");
      const amountInput = document.getElementById("amount");
      const typeSelect = document.getElementById("type");
      const startWithSelect = document.getElementById("start-with");
      const outputTextarea = document.getElementById("output");

      // Standard Lorem Ipsum text
      const loremText = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.",
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
        "Consectetur, adipisci velit, sed quia non numquam eius modi tempora.",
        "Ut labore et dolore magnam aliquam quaerat voluptatem.",
        "Quis autem vel eum iure reprehenderit qui in ea voluptate velit.",
      ];

      // Generate Lorem Ipsum text
      function generateLorem() {
        const amount = parseInt(amountInput.value);
        const type = typeSelect.value;
        const startWith = startWithSelect.value;
        let result = "";

        if (startWith === "lorem") {
          result = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
        }

        if (type === "paragraphs") {
          for (let i = 0; i < amount; i++) {
            const paragraph =
              loremText[Math.floor(Math.random() * loremText.length)];
            result += paragraph + " ";
            // Add some more random sentences to make paragraphs longer
            const extraSentences = Math.floor(Math.random() * 3) + 2;
            for (let j = 0; j < extraSentences; j++) {
              const extra =
                loremText[Math.floor(Math.random() * loremText.length)];
              result += extra + " ";
            }
            result += "\n\n";
          }
        } else if (type === "sentences") {
          for (let i = 0; i < amount; i++) {
            const sentence =
              loremText[Math.floor(Math.random() * loremText.length)];
            result += sentence + " ";
          }
        } else if (type === "words") {
          const words = [
            "Lorem",
            "ipsum",
            "dolor",
            "sit",
            "amet",
            "consectetur",
            "adipiscing",
            "elit",
            "sed",
            "do",
            "eiusmod",
            "tempor",
            "incididunt",
            "ut",
            "labore",
            "et",
            "dolore",
            "magna",
            "aliqua",
          ];
          for (let i = 0; i < amount; i++) {
            const word = words[Math.floor(Math.random() * words.length)];
            result += word + " ";
          }
        }

        outputTextarea.value = result.trim();
      }

      // Copy to clipboard
      copyBtn.addEventListener("click", function () {
        if (!outputTextarea.value) return;

        outputTextarea.select();
        document.execCommand("copy");

        // Change button text temporarily
        const icon = this.querySelector("i");
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Copied!';

        setTimeout(() => {
          this.innerHTML = originalText;
        }, 2000);
      });

      // Clear output
      clearBtn.addEventListener("click", function () {
        outputTextarea.value = "";
      });

      // Generate on button click
      generateBtn.addEventListener("click", generateLorem);

      // Generate on page load
      window.addEventListener("load", generateLorem);