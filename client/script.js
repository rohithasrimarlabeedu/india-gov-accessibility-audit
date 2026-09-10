const increaseFontButton = document.getElementById("increase-font");

increaseFontButton.addEventListener("click", function () {
    document.body.classList.toggle("large-text");

    const isLargeText = document.body.classList.contains("large-text");

    increaseFontButton.setAttribute(
        "aria-label",
        isLargeText
            ? "Return to normal text size"
            : "Increase text size"
    );

    increaseFontButton.textContent = isLargeText ? "A-" : "A+";
});