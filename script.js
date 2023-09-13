document.addEventListener("DOMContentLoaded", function () {
    const playButton = document.getElementById("playButton");
    const player = document.getElementById("player");
    let videoIds = [];

    // Function to fetch and parse the CSV file
    function fetchCSVAndParse() {
        fetch("./youtube_url.csv") // Replace with the actual path to your CSV file
            .then((response) => response.text())
            .then((data) => {
                // Split the CSV data into an array of video IDs
                videoIds = data.split("\n").map((line) => line.trim());

                // Remove any empty elements
                videoIds = videoIds.filter((id) => id.length > 0);
            })
            .catch((error) => {
                console.error("Error loading CSV file:", error);
            });
    }

    // Function to embed a random YouTube video
    function embedRandomVideo() {
        if (videoIds.length === 0) {
            console.error("No video IDs loaded from CSV.");
            return;
        }

        const randomIndex = Math.floor(Math.random() * videoIds.length);
        const randomVideoId = videoIds[randomIndex];

        // Create an iframe to embed the YouTube video with a larger size
        const iframe = document.createElement("iframe");
        iframe.width = "1000"; // Set the width to your preferred value
        iframe.height = "550"; // Set the height to your preferred value
        iframe.src = `https://www.youtube.com/embed/${randomVideoId}`;
        iframe.frameBorder = "0";
        iframe.allowFullScreen = true;

        // Clear any previous content in the player div and append the iframe
        player.innerHTML = "";
        player.appendChild(iframe);
    }

    // Add a click event listener to the play button
    playButton.addEventListener("click", embedRandomVideo);

    // Fetch and parse the CSV file when the page loads
    fetchCSVAndParse();
});