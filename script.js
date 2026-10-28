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

const shoppingForm = document.getElementById("shoppingForm");

if (shoppingForm) {
    shoppingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const price = Number(document.getElementById("itemPrice").value);
        const quantity = Number(document.getElementById("quantity").value);
        const shipping = Number(document.getElementById("shipping").value);
        const discount = Number(document.getElementById("discount").value);

        if (
            !Number.isFinite(price) ||
            !Number.isFinite(quantity) ||
            !Number.isFinite(shipping) ||
            !Number.isFinite(discount) ||
            price < 0 ||
            quantity < 1 ||
            !Number.isInteger(quantity) ||
            shipping < 0 ||
            discount < 0 ||
            discount > 100
        ) {
            alert("Please enter valid shopping details.");
            return;
        }

        const subtotal = price * quantity;
        const discountAmount = subtotal * (discount / 100);
        const finalTotal = subtotal - discountAmount + shipping;

        const rupiah = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        });

        document.getElementById("subtotal").textContent =
            rupiah.format(subtotal);

        document.getElementById("discountAmount").textContent =
            rupiah.format(discountAmount);

        document.getElementById("shippingCost").textContent =
            rupiah.format(shipping);

        document.getElementById("finalTotal").textContent =
            rupiah.format(finalTotal);
    });

    shoppingForm.addEventListener("reset", function () {
        document.getElementById("subtotal").textContent = "Rp0";
        document.getElementById("discountAmount").textContent = "Rp0";
        document.getElementById("shippingCost").textContent = "Rp0";
        document.getElementById("finalTotal").textContent = "Rp0";
    });
}
