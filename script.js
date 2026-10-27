// Light/dark mode for the profile website.
// The selected theme is saved so it remains active across all pages and refreshes.
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("profileTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

function updateThemeButton() {
    const isDark = document.body.classList.contains("dark-mode");
    themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.setAttribute("aria-pressed", String(isDark));
}

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("profileTheme", isDark ? "dark" : "light");
    updateThemeButton();
});

updateThemeButton();