// Instagram Downloader Functionality
      const instagramUrlInput = document.getElementById("instagram-url");
      const fetchBtn = document.getElementById("fetch-btn");
      const resultContainer = document.getElementById("result-container");
      const mediaPreview = document.getElementById("media-preview");
      const downloadHdBtn = document.getElementById("download-hd");
      const downloadSdBtn = document.getElementById("download-sd");
      const downloadAudioBtn = document.getElementById("download-audio");
      const newBtn = document.getElementById("new-btn");

      // Mock media data (in a real app, this would come from your backend API)
      const mockMedia = {
        photo: {
          hd: "https://example.com/photo-hd.jpg",
          sd: "https://example.com/photo-sd.jpg",
          type: "image",
        },
        video: {
          hd: "https://example.com/video-hd.mp4",
          sd: "https://example.com/video-sd.mp4",
          audio: "https://example.com/audio.mp3",
          type: "video",
        },
        reel: {
          hd: "https://example.com/reel-hd.mp4",
          sd: "https://example.com/reel-sd.mp4",
          audio: "https://example.com/reel-audio.mp3",
          type: "video",
        },
      };

      // Fetch media from Instagram
      fetchBtn.addEventListener("click", function () {
        const url = instagramUrlInput.value.trim();
        const mediaType = document.querySelector(
          'input[name="media-type"]:checked'
        ).value;

        if (!url) {
          alert("Please enter an Instagram URL");
          return;
        }

        // Validate Instagram URL
        if (!url.includes("instagram.com")) {
          alert("Please enter a valid Instagram URL");
          return;
        }

        // Show loading state
        fetchBtn.disabled = true;
        fetchBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Fetching...';

        // Simulate API call (in a real app, this would call your backend)
        setTimeout(() => {
          // Determine media type if auto-detect
          const detectedType =
            mediaType === "auto"
              ? url.includes("/reel/")
                ? "reel"
                : url.includes("/tv/")
                ? "video"
                : "photo"
              : mediaType;

          // Display media preview
          displayMediaPreview(detectedType);

          // Show results
          resultContainer.style.display = "block";

          // Reset button
          fetchBtn.disabled = false;
          fetchBtn.innerHTML = '<i class="fas fa-download"></i> Fetch Media';

          // Scroll to results
          resultContainer.scrollIntoView({ behavior: "smooth" });
        }, 1500);
      });

      // Display media preview
      function displayMediaPreview(type) {
        mediaPreview.innerHTML = "";

        const media = mockMedia[type] || mockMedia.photo;

        if (media.type === "image") {
          const img = document.createElement("img");
          img.src = media.hd;
          img.alt = "Instagram Photo";
          mediaPreview.appendChild(img);

          // Enable relevant download buttons
          downloadHdBtn.disabled = false;
          downloadSdBtn.disabled = false;
          downloadAudioBtn.disabled = true;
        } else {
          const video = document.createElement("video");
          video.src = media.hd;
          video.controls = true;
          video.autoplay = true;
          video.muted = true;
          mediaPreview.appendChild(video);

          // Enable all download buttons
          downloadHdBtn.disabled = false;
          downloadSdBtn.disabled = false;
          downloadAudioBtn.disabled = false;
        }
      }

      // Download buttons
      downloadHdBtn.addEventListener("click", function () {
        alert("HD download would start here in a real implementation");
      });

      downloadSdBtn.addEventListener("click", function () {
        alert("SD download would start here in a real implementation");
      });

      downloadAudioBtn.addEventListener("click", function () {
        alert("Audio download would start here in a real implementation");
      });

      // Reset form for new download
      newBtn.addEventListener("click", function () {
        instagramUrlInput.value = "";
        resultContainer.style.display = "none";
        downloadHdBtn.disabled = true;
        downloadSdBtn.disabled = true;
        downloadAudioBtn.disabled = true;
        instagramUrlInput.focus();
      });