document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM is fully loaded!");

  const main = document.getElementById("main-container");
  const slider = document.querySelector(".slider");
  const prev = document.getElementById("btn-left-click");
  const next = document.getElementById("btn-right-click");
  let index = 1;
  let autoPlayInterval;

  // automatically move the last slide to the left side on load
  const lastSlide = slider.lastElementChild;
  const clone = lastSlide.cloneNode(true);
  slider.insertBefore(clone, slider.firstElementChild);
  slider.removeChild(lastSlide);

  // JSON STARTS HERE

  // fetch("ad-config.json?v=" + new Date().getTime()) // Prevent caching
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     showFetchSuccess(); // Call function when fetch is successful
  //     // Set ClickTag
  //     window.clickTag = data.clickTag;

  //     // Update all clickable elements
  //     document.querySelectorAll(".cta-button a, .logo a").forEach((link) => {
  //       link.href = data.clickTag;
  //       link.target = "_blank"; // Open in new tab
  //       link.rel = "noopener noreferrer"; // Security best practice
  //     });

  //     // Populate Videos
  //     data.videos.forEach((video, index) => {
  //       let videoElement = document.getElementById(`video-${index + 1}`);
  //       if (videoElement) {
  //         videoElement.poster = video.poster;
  //         videoElement.querySelector("source").src = video.src;
  //         videoElement.load(); // Reload video source
  //       }
  //     });

  //     // Populate Slides (Text & Prices)
  //     data.slides.forEach((slide, index) => {
  //       let slideContainer = document.querySelector(
  //         `.slide${index + 1}-content`
  //       );
  //       if (slideContainer) {
  //         slideContainer.innerHTML = `
  //         <div class="text1">${slide.brand}</div>
  //         <div class="text2">${slide.title}</div>
  //         <div class="text3">${slide.price} <span>${slide.tax}</span></div>
  //         ${
  //           slide.originalPrice
  //             ? `<div class="text4">Originalpreis: <span class="price-orig">${slide.originalPrice}</span> <span class="price-discount">${slide.discount}</span></div>`
  //             : ""
  //         }
  //       `;
  //       }
  //     });

  //     // Set Logo
  //     let logoAnchor = document.querySelector(".logo a");
  //     let logoImg = document.querySelector(".logo img");
  //     if (logoAnchor && logoImg) {
  //       logoAnchor.href = data.logo.href;
  //       logoImg.src = data.logo.src;
  //     }

  //     // Set CTA Button
  //     let ctaButton = document.querySelector(".cta-button a");
  //     if (ctaButton) {
  //       ctaButton.href = data.ctaButton.href;
  //       ctaButton.innerHTML = `${data.ctaButton.text} <img src="${data.ctaButton.icon}" />`;
  //     }
  //   })
  //   .catch((error) => console.error("Error loading JSON:", error));

  ///// JSON ENDS HERE

  function showFetchSuccess() {
    main.style.display = "block";
  }
  main.style.display = "block";
  function updateSlides() {
    const slides = document.querySelectorAll(".slide");
    slides.forEach((slide, i) => {
      slide.classList.remove("active", "inactive");
      if (i === 1) {
        slide.classList.add("active"); // Center active
      } else {
        slide.classList.add("inactive");
      }
    });

    let containerWidth = 300;
    let activeWidth = 130;
    let inactiveWidth = 68;
    let gap = 7;
    let totalInactiveWidth = inactiveWidth * 2 + gap * 2; // Width of 2 inactive slides + gaps
    let translateX =
      -(index * (inactiveWidth + gap)) +
      (containerWidth - activeWidth - totalInactiveWidth);

    slider.style.transform = `translateX(${translateX}px)`;
  }

  function disableControls() {
    prev.style.pointerEvents = "none";
    next.style.pointerEvents = "none";
  }
  function enableControls() {
    prev.style.pointerEvents = "auto";
    next.style.pointerEvents = "auto";
  }

  function detectSlides() {
    const activeSlide = document.querySelector(".slide.active");
    const dots = document.querySelectorAll(".lines");
    const contents = document.querySelectorAll(".slides-content");

    dots.forEach((dot) => dot.classList.remove("enable"));
    contents.forEach((content) => content.classList.remove("visible"));
    if (activeSlide) {
      dots[activeSlide.dataset.slide - 1].classList.add("enable");
      contents[activeSlide.dataset.slide - 1].classList.add("visible");
      setTimeout(() => {
        enableControls();
      }, 500);
    }

    if (activeSlide.dataset.slide == 1) {
      const vid1 = document.querySelector("#video-1");
      setTimeout(function () {
        vid1.play();
      }, 100);
    } else if (activeSlide.dataset.slide == 2) {
      // console.log(activeSlide.dataset.slide);
      const vid2 = document.querySelector("#video-2");
      setTimeout(function () {
        vid2.play();
      }, 100);
    } else if (activeSlide.dataset.slide == 3) {
      const vid3 = document.querySelector("#video-3");
      setTimeout(function () {
        vid3.play();
      }, 100);
    } else if (activeSlide.dataset.slide == 4) {
      const vid4 = document.querySelector("#video-4");
      setTimeout(function () {
        vid4.play();
      }, 100);
    }

    setTimeout(() => {
      document.querySelectorAll(".lazy-video").forEach((video) => {
        if (video.closest(".active")) {
          // console.log("video play");

          if (!video.src) {
            video.src = video.dataset.src;
          }
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });

      // console.log("Active slide:", document.querySelector(".active"));
    }, 100); // Small delay to allow class changes
  }
  function moveSlide(direction) {
    const slides = document.querySelectorAll(".slide");
    const activeIndex = [...slides].findIndex((slide) =>
      slide.classList.contains("active")
    );

    pauseAllVideos();

    disableControls();

    let nextActiveIndex;
    if (direction === 1) {
      nextActiveIndex = (activeIndex + 1) % slides.length; // Move to the next slide
    } else {
      nextActiveIndex = (activeIndex - 1 + slides.length) % slides.length; // Move to the previous slide
    }

    // Apply the resizing and active state before the transition starts
    slides.forEach((slide, index) => {
      slide.classList.remove("active", "inactive");
      if (index === nextActiveIndex) {
        slide.classList.add("active"); // Set the next active slide
      } else {
        slide.classList.add("inactive");
      }
    });
    // Add transition for smooth sliding effect
    slider.style.transition = "transform 0.5s ease-in-out";

    if (direction === 1) {
      // Move the first slide to the end without jumping
      const firstSlide = slider.firstElementChild;
      const clone = firstSlide.cloneNode(true);
      slider.appendChild(clone); // Append cloned slide at the end
      slider.style.transform = `translateX(-130px)`; // Start shifted

      setTimeout(() => {
        slider.style.transition = "transform 0.5s ease-in-out"; // Re-enable transition
        detectSlides();
      }, 50);

      setTimeout(() => {
        // Remove the first slide (which is now at the end)
        slider.removeChild(firstSlide);
        slider.style.transition = "none";
        slider.style.transform = "translateX(-55px)";
        updateSlides();
      }, 500); // Wait for the transition duration
    } else {
      // Move the last slide to the front without jumping
      const lastSlide = slider.lastElementChild;
      const clone = lastSlide.cloneNode(true);
      slider.insertBefore(clone, slider.firstElementChild);
      slider.style.transition = "none"; // Disable transition for an instant shift
      slider.style.transform = `translateX(-130px)`; // Start shifted

      setTimeout(() => {
        updateSlides();
        slider.style.transition = "transform 0.5s ease-in-out"; // Re-enable transition
        slider.style.transform = "translateX(-55px)";
        detectSlides();
      }, 50);

      setTimeout(() => {
        slider.removeChild(lastSlide);
      }, 500); // Wait for the transition duration
    }
  }

  function pauseAllVideos() {
    let videos = document.querySelectorAll("video"); // Select all video elements
    videos.forEach((video) => video.pause()); // Pause each video
  }

  // Function to start autoplay
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      moveSlide(1);
    }, 2000); // Change slide every 2 seconds
  }

  // Function to stop autoplay
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  next.addEventListener("click", () => {
    moveSlide(1);
    stopAutoPlay();
  });
  prev.addEventListener("click", () => {
    moveSlide(-1);
    stopAutoPlay();
  });

  updateSlides();
  detectSlides();

  // Start autoplay initially
  // startAutoPlay();

  function applyEllipsis() {
    const element = document.querySelector(".text2");

    if (!element) return; // Prevent errors if the element is missing

    const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
    const maxHeight = lineHeight * 2; // Maximum allowed height for 2 lines

    console.log("Scroll Height:", element.scrollHeight);
    console.log("Max Height:", maxHeight);

    // Check if text will exceed two lines (before it fully overflows into 3rd line)
    if (element.scrollHeight <= maxHeight - lineHeight / 2) {
      console.log("Applying ellipsis...");
      let text = element.innerText;

      while (element.scrollHeight > maxHeight && text.length > 0) {
        text = text.slice(0, -1); // Remove last character
        element.innerText = text + "..."; // Append ellipsis
      }
    }
  }
  // applyEllipsis();
});
