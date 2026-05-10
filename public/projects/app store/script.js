// Get the download button element
var downloadButton = document.querySelector(".download-button");

// Add a click event listener to the download button
downloadButton.addEventListener("click", function() {
  // Use the window.location.href property to redirect the user to the App Store
  window.location.href = "https://itunes.apple.com/us/app/my-app/id1234567890";
});
// Get the screenshot container element
var screenshotContainer = document.querySelector("#screenshots");

// Get all the screenshot elements
var screenshots = screenshotContainer.querySelectorAll("img");

// Set the initial index to 0
var currentIndex = 0;

// Add a click event listener to the screenshot container
screenshotContainer.addEventListener("click", function() {
  // Hide the current screenshot
  screenshots[currentIndex].style.display = "none";

  // Update the current index
  currentIndex++;

  // If we've reached the end of the screenshots, start over
  if (currentIndex >= screenshots.length) {
    currentIndex = 0;
  }

  // Show the next screenshot
  screenshots[currentIndex].style.display = "block";
});
