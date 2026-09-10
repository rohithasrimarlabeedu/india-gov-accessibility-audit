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


const openModalButton = document.getElementById("open-modal");
const closeModalButton = document.getElementById("close-modal");
const accessibilityModal = document.getElementById("accessibility-modal");

let previouslyFocusedElement = null;


openModalButton.addEventListener("click", function () {
    previouslyFocusedElement = document.activeElement;

    accessibilityModal.hidden = false;

    closeModalButton.focus();
});


closeModalButton.addEventListener("click", function () {
    accessibilityModal.hidden = true;

    if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
    }
});


document.addEventListener("keydown", function (event) {

    if (event.key === "Escape" && !accessibilityModal.hidden) {
        accessibilityModal.hidden = true;

        if (previouslyFocusedElement) {
            previouslyFocusedElement.focus();
        }
    }

});


const serviceForm = document.getElementById("service-form");

serviceForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!serviceForm.checkValidity()) {
        serviceForm.reportValidity();
        return;
    }

    alert("Application submitted successfully.");
});