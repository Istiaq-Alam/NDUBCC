// List of ads/news with links
const ads = [
    {
        title: "💡 Think Like a Coder!",
        text: "Join our seminar: 'Think Like a Coder – An Introduction to Competitive Programming'. Learn problem-solving skills, coding techniques, and how to get started with contests. Open for all NDUB students!",
        img: "highlights/TLCoder.png",   // add a poster/banner image here
        link: "highlights.html"  // replace with event page link
    },
    /*{
        title: "🎉 Congratulations to Our New Leaders!",
        text: "We are delighted to announce the newly selected Moderator of NDUB Computer Club. Let's welcome them with pride!",
        img: "highlights/mod.png",
        link: "https://www.facebook.com/share/p/1Bp6JGWQ5P/"  // link to event page
    },
    {
        title: "🎉 Congratulations to Our New Leaders!",
        text: "We are delighted to announce the newly selected Co-Moderator of NDUB Computer Club. Let's welcome them with pride!",
        img: "highlights/co-mod.png",
        link: "https://www.facebook.com/share/p/1Bp6JGWQ5P/"  // link to event page
    },
    {
        title: "🚀 12th Executive Committee",
        text: "Notre Dame University Computer Club has announced our 12th Executive Committee members",
        img: "assets/img/executive/Executive-Committe.jpg",
        link: "committee.html"
    },*/
   {
        title: "📢 Club Registration Open",
        text: "Become a part of NDUB Computer Club and explore new opportunities!",
        img: "assets/img/NDUBCC-Logo.png",
        link: "joinnow.html"
    }
];

// Pick random ad
const randomAd = ads[Math.floor(Math.random() * ads.length)];

// Insert ad content
document.getElementById("popup-img").src = randomAd.img;
document.getElementById("popup-title").innerText = randomAd.title;
document.getElementById("popup-text").innerText = randomAd.text;
document.getElementById("popup-link").href = randomAd.link;


// Show popup on page load
window.onload = function () {
    setTimeout(() => {
        const popup = document.getElementById("popup");
        const loader = document.getElementById("popup-loader");

        popup.classList.add("active");

        let totalTime = 5000; // total auto-close time
        let remainingTime = totalTime;
        let startTime;
        let timer;

        // function to start timer
        function startTimer() {
            startTime = Date.now();
            loader.style.transition = `width ${remainingTime}ms linear`;
            loader.style.width = "100%";

            timer = setTimeout(() => {
                popup.classList.remove("active");
                loader.style.width = "0%";
            }, remainingTime);
        }

        // function to pause timer
        function pauseTimer() {
            clearTimeout(timer);
            remainingTime -= Date.now() - startTime;

            // stop loader progress
            const computedWidth = getComputedStyle(loader).width;
            loader.style.transition = "none";
            loader.style.width = computedWidth; // freeze width
        }

        // start the countdown
        startTimer();

        const popupCard = document.getElementById("popup-box");

        // pause on hover (only card)
        popupCard.addEventListener("mouseenter", pauseTimer);

        // resume on mouse leave (only card)
        popupCard.addEventListener("mouseleave", startTimer);


    }, 1000);
};


// Manual close
function closePopup() {
    const popup = document.getElementById("popup");
    const loader = document.getElementById("popup-loader");
    popup.classList.remove("active");
    loader.style.width = "0%";
}
