// List of ads/news
const ads = [
    {
        title: "🚀 NDUB CSE Fest 2024",
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
        text: "Notre Dame University Computer Club have Announced our 12th Executive Committee member",
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

// Show popup after delay
window.onload = function () {
    setTimeout(() => {
        document.getElementById("popup").classList.add("active");
    }, 1000);
};

// Close popup
function closePopup() {
    document.getElementById("popup").classList.remove("active");
}