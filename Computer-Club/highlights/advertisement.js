// List of ads/news with links
const ads = [
    {
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
    /*{
        title: "🚀 12th Executive Committee",
        text: "Notre Dame University Computer Club has announced our 12th Executive Committee members",
        img: "assets/img/executive/Executive-Committe.jpg",
        link: "committee.html"
    },
   {
        title: "📢 Club Registration Open",
        text: "Become a part of NDUB Computer Club and explore new opportunities!",
        img: "assets/img/cat-1.jpeg",
        link: "about.html"
    }*/
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

        // Start loader animation
        loader.style.width = "100%";

        // Auto close after 5s
        setTimeout(() => {
            popup.classList.remove("active");
            loader.style.width = "0%";
        }, 5000);
    }, 1000);
};

// Manual close
function closePopup() {
    const popup = document.getElementById("popup");
    const loader = document.getElementById("popup-loader");
    popup.classList.remove("active");
    loader.style.width = "0%";
}
