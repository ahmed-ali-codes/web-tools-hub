// Slug Generator Functionality
      const textInput = document.getElementById("text-input");
      const generateBtn = document.getElementById("generate-btn");
      const clearBtn = document.getElementById("clear-btn");
      const copyBtn = document.getElementById("copy-btn");
      const slugPreview = document.getElementById("slug-preview");
      const lowercaseOption = document.getElementById("lowercase");
      const removeStopwordsOption = document.getElementById("remove-stopwords");
      const trimSpecialOption = document.getElementById("trim-special");

      // Common words to remove if option is selected
      const stopWords = new Set([
        "a",
        "an",
        "the",
        "and",
        "or",
        "but",
        "of",
        "to",
        "in",
        "on",
        "at",
        "for",
        "by",
        "with",
        "as",
        "is",
        "are",
        "was",
        "were",
        "be",
        "been",
        "being",
      ]);

      // Generate slug from text
      function generateSlug() {
        let text = textInput.value.trim();
        if (!text) {
          slugPreview.textContent = "Your-generated-slug-will-appear-here";
          return;
        }

        // Convert to lowercase if option is checked
        if (lowercaseOption.checked) {
          text = text.toLowerCase();
        }

        // Remove special characters if option is checked
        if (trimSpecialOption.checked) {
          // Replace accented characters with their base form
          text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          // Remove all special characters except spaces and hyphens
          text = text.replace(/[^\w\s-]/g, "");
        }

        // Replace spaces with hyphens
        let slug = text.replace(/\s+/g, "-");

        // Remove stop words if option is checked
        if (removeStopwordsOption.checked) {
          slug = slug
            .split("-")
            .filter((word) => !stopWords.has(word))
            .join("-");
        }

        // Remove consecutive hyphens and trim hyphens from ends
        slug = slug.replace(/-+/g, "-").replace(/^-+|-+$/g, "");

        slugPreview.textContent = slug || "empty-slug";
      }

      // Clear text
      function clearText() {
        textInput.value = "";
        slugPreview.textContent = "Your-generated-slug-will-appear-here";
      }

      // Copy slug
      function copySlug() {
        const slug = slugPreview.textContent;
        if (
          slug === "Your-generated-slug-will-appear-here" ||
          slug === "empty-slug"
        )
          return;

        navigator.clipboard
          .writeText(slug)
          .then(() => {
            // Change button text temporarily
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';

            setTimeout(() => {
              copyBtn.innerHTML = originalText;
            }, 2000);
          })
          .catch((err) => {
            console.error("Failed to copy slug: ", err);
          });
      }

      // Event listeners
      generateBtn.addEventListener("click", generateSlug);
      clearBtn.addEventListener("click", clearText);
      copyBtn.addEventListener("click", copySlug);

      // Generate slug on option change
      lowercaseOption.addEventListener("change", generateSlug);
      removeStopwordsOption.addEventListener("change", generateSlug);
      trimSpecialOption.addEventListener("change", generateSlug);

      // Generate slug while typing (with slight delay for performance)
      let typingTimer;
      textInput.addEventListener("input", function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(generateSlug, 500);
      });

      // Generate slug when pressing Enter in textarea (but don't submit)
      textInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && e.ctrlKey) {
          generateSlug();
          e.preventDefault();
        }
      });

      // Generate initial slug if there's any text already
      if (textInput.value.trim()) {
        generateSlug();
      }