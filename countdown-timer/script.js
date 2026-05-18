// Countdown Timer Functionality
      const hoursInput = document.getElementById("hours");
      const minutesInput = document.getElementById("minutes");
      const secondsInput = document.getElementById("seconds");
      const displayTimer = document.getElementById("display-timer");
      const displayLabel = document.getElementById("display-label");
      const startBtn = document.getElementById("start-btn");
      const pauseBtn = document.getElementById("pause-btn");
      const resetBtn = document.getElementById("reset-btn");

      let countdown;
      let totalSeconds = 0;
      let isRunning = false;
      let remainingSeconds = 0;

      // Format time as MM:SS or HH:MM:SS
      function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
          return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
        }
        return `${minutes.toString().padStart(2, "0")}:${secs
          .toString()
          .padStart(2, "0")}`;
      }

      // Update timer display
      function updateDisplay(seconds) {
        displayTimer.textContent = formatTime(seconds);
      }

      // Start the countdown
      function startTimer() {
        if (!isRunning) {
          // If timer was paused, use remainingSeconds
          // Otherwise calculate new total from inputs
          if (remainingSeconds <= 0) {
            const hours = parseInt(hoursInput.value) || 0;
            const minutes = parseInt(minutesInput.value) || 0;
            const seconds = parseInt(secondsInput.value) || 0;

            totalSeconds = hours * 3600 + minutes * 60 + seconds;
            remainingSeconds = totalSeconds;
          }

          if (remainingSeconds <= 0) {
            alert("Please set a valid time duration");
            return;
          }

          isRunning = true;
          startBtn.disabled = true;
          pauseBtn.disabled = false;
          hoursInput.disabled = true;
          minutesInput.disabled = true;
          secondsInput.disabled = true;

          countdown = setInterval(() => {
            remainingSeconds--;
            updateDisplay(remainingSeconds);

            if (remainingSeconds <= 0) {
              clearInterval(countdown);
              isRunning = false;
              startBtn.disabled = false;
              pauseBtn.disabled = true;
              displayTimer.textContent = "Time's up!";
              // Play sound when timer completes
              const audio = new Audio(
                "https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3"
              );
              audio.play();
            }
          }, 1000);
        }
      }

      // Pause the countdown
      function pauseTimer() {
        if (isRunning) {
          clearInterval(countdown);
          isRunning = false;
          startBtn.disabled = false;
          pauseBtn.disabled = true;
        }
      }

      // Reset the countdown
      function resetTimer() {
        clearInterval(countdown);
        isRunning = false;
        remainingSeconds = 0;
        totalSeconds = 0;
        hoursInput.value = "0";
        minutesInput.value = "10";
        secondsInput.value = "0";
        updateDisplay(10 * 60); // Reset to 10:00 display
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        hoursInput.disabled = false;
        minutesInput.disabled = false;
        secondsInput.disabled = false;
        displayLabel.textContent = "Countdown to your event";
      }

      // Initialize display with default values
      updateDisplay(10 * 60);

      // Event listeners
      startBtn.addEventListener("click", startTimer);
      pauseBtn.addEventListener("click", pauseTimer);
      resetBtn.addEventListener("click", resetTimer);

      // Update display when inputs change
      [hoursInput, minutesInput, secondsInput].forEach((input) => {
        input.addEventListener("input", function () {
          if (this.value < 0) this.value = 0;
          if (this.id === "minutes" || this.id === "seconds") {
            if (this.value > 59) this.value = 59;
          }

          const hours = parseInt(hoursInput.value) || 0;
          const minutes = parseInt(minutesInput.value) || 0;
          const seconds = parseInt(secondsInput.value) || 0;

          updateDisplay(hours * 3600 + minutes * 60 + seconds);
        });
      });