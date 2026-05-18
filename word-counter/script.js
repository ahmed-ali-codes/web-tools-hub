// Word Counter Functionality
      const textInput = document.getElementById("text-input");
      const wordCount = document.getElementById("word-count");
      const characterCount = document.getElementById("character-count");
      const characterNoSpaces = document.getElementById("character-no-spaces");
      const sentenceCount = document.getElementById("sentence-count");
      const paragraphCount = document.getElementById("paragraph-count");
      const readingTime = document.getElementById("reading-time");
      const clearBtn = document.getElementById("clear-btn");
      const copyBtn = document.getElementById("copy-btn");

      // Count words, characters, etc.
      function countText() {
        const text = textInput.value;

        // Word count (counts words separated by whitespace)
        const words = text.trim() === "" ? [] : text.trim().split(/\s+/);
        wordCount.textContent = words.length;

        // Character counts
        characterCount.textContent = text.length;
        characterNoSpaces.textContent = text.replace(/\s+/g, "").length;

        // Sentence count (counts sentences ending with .!? followed by space or end)
        const sentences = text.split(/[.!?]+(?=\s|$)/).filter(Boolean);
        sentenceCount.textContent = sentences.length;

        // Paragraph count (counts blocks of text separated by line breaks)
        const paragraphs = text.split(/\n+/).filter((p) => p.trim() !== "");
        paragraphCount.textContent = paragraphs.length || 1;

        // Reading time (average reading speed: 200 words per minute)
        const minutes = Math.ceil(words.length / 200);
        readingTime.textContent = minutes;
      }

      // Clear text
      function clearText() {
        textInput.value = "";
        countText();
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
      textInput.addEventListener("input", countText);
      clearBtn.addEventListener("click", clearText);
      copyBtn.addEventListener("click", copyText);

      // Initialize
      countText();