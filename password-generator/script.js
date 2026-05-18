// Password Generator Functionality
      const passwordField = document.getElementById("password");
      const copyBtn = document.getElementById("copy-btn");
      const generateBtn = document.getElementById("generate-btn");
      const lengthSlider = document.getElementById("length");
      const lengthValue = document.getElementById("length-value");
      const uppercaseCheckbox = document.getElementById("uppercase");
      const lowercaseCheckbox = document.getElementById("lowercase");
      const numbersCheckbox = document.getElementById("numbers");
      const symbolsCheckbox = document.getElementById("symbols");
      const strengthText = document.getElementById("strength-text");
      const meterBar = document.getElementById("meter-bar");

      // Character sets
      const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
      const numberChars = "0123456789";
      const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

      // Update length display
      lengthSlider.addEventListener("input", function () {
        lengthValue.textContent = this.value;
      });

      // Generate password
      generateBtn.addEventListener("click", generatePassword);

      // Copy password
      copyBtn.addEventListener("click", function () {
        if (!passwordField.value) return;

        passwordField.select();
        document.execCommand("copy");

        // Change icon temporarily to show success
        const icon = this.querySelector("i");
        icon.classList.remove("fa-copy");
        icon.classList.add("fa-check");

        setTimeout(() => {
          icon.classList.remove("fa-check");
          icon.classList.add("fa-copy");
        }, 2000);
      });

      function generatePassword() {
        let charset = "";
        let password = "";

        // Build character set based on selected options
        if (uppercaseCheckbox.checked) charset += uppercaseChars;
        if (lowercaseCheckbox.checked) charset += lowercaseChars;
        if (numbersCheckbox.checked) charset += numberChars;
        if (symbolsCheckbox.checked) charset += symbolChars;

        // Check if at least one character set is selected
        if (!charset) {
          alert("Please select at least one character type");
          return;
        }

        // Generate password
        const length = parseInt(lengthSlider.value);
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * charset.length);
          password += charset[randomIndex];
        }

        // Display password
        passwordField.value = password;

        // Calculate and display strength
        updatePasswordStrength(password);
      }

      function updatePasswordStrength(password) {
        let strength = 0;
        const length = password.length;

        // Length contributes to strength
        strength += Math.min(length * 3, 60); // Max 60 points for length

        // Character variety contributes to strength
        const tests = [
          { regex: /[A-Z]/, points: 5 },
          { regex: /[a-z]/, points: 5 },
          { regex: /[0-9]/, points: 5 },
          { regex: /[^A-Za-z0-9]/, points: 10 },
        ];

        tests.forEach((test) => {
          if (test.regex.test(password)) {
            strength += test.points;
          }
        });

        // Determine strength level
        let strengthLevel = "";
        let strengthPercent = 0;

        if (strength < 30) {
          strengthLevel = "Very Weak";
          strengthPercent = 25;
          meterBar.style.backgroundColor = "#e74c3c";
        } else if (strength < 50) {
          strengthLevel = "Weak";
          strengthPercent = 40;
          meterBar.style.backgroundColor = "#e67e22";
        } else if (strength < 70) {
          strengthLevel = "Good";
          strengthPercent = 65;
          meterBar.style.backgroundColor = "#f1c40f";
        } else if (strength < 85) {
          strengthLevel = "Strong";
          strengthPercent = 85;
          meterBar.style.backgroundColor = "#2ecc71";
        } else {
          strengthLevel = "Very Strong";
          strengthPercent = 100;
          meterBar.style.backgroundColor = "#27ae60";
        }

        // Update display
        strengthText.textContent = strengthLevel;
        meterBar.style.width = strengthPercent + "%";
      }

      // Generate a password on page load
      window.addEventListener("load", generatePassword);