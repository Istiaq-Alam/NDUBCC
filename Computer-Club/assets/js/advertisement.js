// List of ads/news
const ads = [
    {
        title: "🚀 NDUB CSE Fest 2023",
        text: "Join our biggest annual event full of seminars, coding challenges, and workshops!",
        img: "assets/img/Fest.webp"
    },
    {
        title: "💻 Coding Bootcamp",
        text: "Register now for our intensive bootcamp and level up your web development skills.",
        img: "assets/img/carousel-1.jpg"
    },
    {
        title: "🚀 12th Executive Committee",
        text: "Notre Dame University Computer Club has announced our 12th Executive Committee members",
        img: "assets/img/executive/Executive-Committe.jpg"
    },
    {
        title: "📢 Club Registration Open",
        text: "Become a part of NDUB Computer Club and explore new opportunities!",
        img: "assets/img/cat-1.jpeg"
    }
];

// Select a random ad
const randomAd = ads[Math.floor(Math.random() * ads.length)];

// Insert ad content
document.getElementById("popup-img").src = randomAd.img;
document.getElementById("popup-title").innerText = randomAd.title;
document.getElementById("popup-text").innerText = randomAd.text;

// Show popup on page load
window.onload = function () {
    setTimeout(() => {
        const popup = document.getElementById("popup");
        const loader = document.getElementById("popup-loader");

        popup.classList.add("active");

        // Start loader animation
        loader.style.width = "100%";

        // Auto close after 5 seconds
        setTimeout(() => {
            popup.classList.remove("active");
            loader.style.width = "0%";
        }, 5000);
    }, 1000);
};

// Manual close (if user clicks X)
function closePopup() {
    const popup = document.getElementById("popup");
    const loader = document.getElementById("popup-loader");
    popup.classList.remove("active");
    loader.style.width = "0%";
}
