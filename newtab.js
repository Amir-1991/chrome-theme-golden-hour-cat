function getBackgroundImage() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    const aspectRatio = width / height;


    // Super Ultrawide / Ultrawide
    if (aspectRatio >= 2.0) {
        return "images/Firefly_2368x1008.jpg";
    }


    // 16:10
    // Typical range: 1.55 ~ 1.70
    if (aspectRatio >= 1.55 && aspectRatio < 1.70) {
        return "images/Firefly_7680x4800.jpg";
    }


    // 16:9 and everything else
    return "images/Firefly_7680x4320.jpg";
}


function applyBackground() {

    const image = getBackgroundImage();

    const background =
        document.getElementById("background");


    if (!background) {
        console.error(
            "Golden Hour Cat: #background element not found."
        );

        return;
    }


    background.style.backgroundImage =
        `url("${image}")`;
}


/* =========================================
   Clock
   ========================================= */

function updateClock() {

    const now = new Date();

    document.getElementById("clock").textContent =
        now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
}


/* =========================================
   Google Search
   ========================================= */

const searchForm =
    document.getElementById("search-form");

const searchInput =
    document.getElementById("search-input");

const clearButton =
    document.getElementById("clear-button");


searchForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const query =
            searchInput.value.trim();


        if (!query) {
            return;
        }


        if (
            query.startsWith("http://") ||
            query.startsWith("https://")
        ) {

            window.location.href = query;

            return;
        }


        window.location.href =
            "https://www.google.com/search?q=" +
            encodeURIComponent(query);
    }
);


searchInput.addEventListener(
    "input",
    function () {

        clearButton.style.display =
            searchInput.value.length > 0
                ? "block"
                : "none";
    }
);


clearButton.addEventListener(
    "click",
    function () {

        searchInput.value = "";

        clearButton.style.display = "none";

        searchInput.focus();
    }
);


/* =========================================
   Background + Clock
   ========================================= */

applyBackground();

updateClock();

setInterval(updateClock, 1000);


window.addEventListener(
    "resize",
    applyBackground
);