// URL Shortener Functionality
      const originalUrlInput = document.getElementById("original-url");
      const customAliasInput = document.getElementById("custom-alias");
      const shortenBtn = document.getElementById("shorten-btn");
      const resultContainer = document.getElementById("result-container");
      const originalUrlDisplay = document.getElementById(
        "original-url-display"
      );
      const shortUrlDisplay = document.getElementById("short-url-display");
      const copyBtn = document.getElementById("copy-btn");
      const newBtn = document.getElementById("new-btn");

      // Mock API endpoint (in a real app, this would be your backend)
      const API_ENDPOINT = "https://api.ecotrustia.com/shorten";

      // Generate random string for URL alias
      function generateRandomAlias(length = 6) {
        const chars =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
      }

      // Shorten URL
      shortenBtn.addEventListener("click", function () {
        const longUrl = originalUrlInput.value.trim();
        const customAlias = customAliasInput.value.trim();

        if (!longUrl) {
          alert("Please enter a URL to shorten");
          return;
        }

        // Validate URL format
        try {
          new URL(longUrl);
        } catch (e) {
          alert("Please enter a valid URL (include http:// or https://)");
          return;
        }

        // Generate short URL (in a real app, this would call your API)
        const alias = customAlias || generateRandomAlias();
        const shortUrl = `https://ecotrustia.link/${alias}`;

        // Display results
        originalUrlDisplay.textContent = longUrl;
        shortUrlDisplay.textContent = shortUrl;
        resultContainer.style.display = "block";

        // Scroll to results
        resultContainer.scrollIntoView({ behavior: "smooth" });
      });

      // Copy short URL to clipboard
      copyBtn.addEventListener("click", function () {
        const shortUrl = shortUrlDisplay.textContent;

        navigator.clipboard
          .writeText(shortUrl)
          .then(() => {
            // Change button text temporarily
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';

            setTimeout(() => {
              copyBtn.innerHTML = originalText;
            }, 2000);
          })
          .catch((err) => {
            console.error("Failed to copy: ", err);
            alert("Failed to copy URL to clipboard");
          });
      });

      // Reset form for new URL
      newBtn.addEventListener("click", function () {
        originalUrlInput.value = "";
        customAliasInput.value = "";
        resultContainer.style.display = "none";
        originalUrlInput.focus();
      });