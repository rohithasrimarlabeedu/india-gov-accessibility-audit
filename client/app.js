import {
    fetchProducts
} from "./api.js";


// ============================================
// APPLICATION STATE
// ============================================

let products = [];

let filteredProducts = [];


// ============================================
// DOM ELEMENTS
// ============================================

const searchInput =
    document.getElementById(
        "search-input"
    );

const categoryFilter =
    document.getElementById(
        "category-filter"
    );

const sortSelect =
    document.getElementById(
        "sort-select"
    );

const productGrid =
    document.getElementById(
        "product-grid"
    );

const loading =
    document.getElementById(
        "loading"
    );

const errorBanner =
    document.getElementById(
        "error-banner"
    );

const increaseFontButton =
    document.getElementById(
        "increase-font"
    );

const serviceForm =
    document.getElementById(
        "service-form"
    );


// ============================================
// LOADING STATE
// ============================================

function showLoading() {

    if (loading) {
        loading.hidden = false;
    }

    if (productGrid) {
        productGrid.innerHTML = "";
    }

    if (errorBanner) {
        errorBanner.hidden = true;
    }
}


// ============================================
// HIDE LOADING
// ============================================

function hideLoading() {

    if (loading) {
        loading.hidden = true;
    }
}


// ============================================
// SHOW ERROR
// ============================================

function showError(message) {

    hideLoading();

    if (!errorBanner) {
        return;
    }

    errorBanner.textContent =
        message;

    errorBanner.hidden = false;
}


// ============================================
// ESCAPE HTML
// ============================================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// ============================================
// RENDER PRODUCTS
// ============================================

function renderProducts(items) {

    if (!productGrid) {
        return;
    }


    if (items.length === 0) {

        productGrid.innerHTML = `
            <div class="empty-state">
                <h3>No results found</h3>
                <p>
                    Try another search term or category.
                </p>
            </div>
        `;

        return;
    }


    productGrid.innerHTML =
        items.map((product) => {

            const title =
                escapeHTML(product.title);

            const category =
                escapeHTML(product.category);

            const description =
                escapeHTML(
                    product.description
                );

            const image =
                escapeHTML(product.image);


            return `
                <article class="product-card">

                    <div class="product-image-wrapper">

                        <img
                            src="${image}"
                            alt="${title}"
                            class="product-image"
                            loading="lazy"
                        >

                    </div>


                    <div class="product-content">

                        <p class="product-category">
                            ${category}
                        </p>

                        <h3>
                            ${title}
                        </h3>

                        <p class="product-description">
                            ${description}
                        </p>

                        <div class="product-footer">

                            <strong>
                                ₹${Number(
                                    product.price
                                ).toFixed(2)}
                            </strong>

                            <button
                                type="button"
                                class="save-product"
                                data-id="${product.id}"
                                aria-label="Save ${title}"
                            >
                                Save
                            </button>

                        </div>

                    </div>

                </article>
            `;

        }).join("");


    attachSaveButtons();
}


// ============================================
// CATEGORY FILTER
// ============================================

function populateCategories() {

    if (!categoryFilter) {
        return;
    }


    const categories =
        [
            ...new Set(
                products.map(
                    product =>
                        product.category
                )
            )
        ]
        .sort();


    categoryFilter.innerHTML = `
        <option value="all">
            All Categories
        </option>
    `;


    categories.forEach(
        (category) => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                category;

            option.textContent =
                category;

            categoryFilter.appendChild(
                option
            );

        }
    );
}


// ============================================
// FILTER + SEARCH + SORT
// ============================================

function updateProducts() {

    const searchTerm =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const selectedCategory =
        categoryFilter
            ? categoryFilter.value
            : "all";


    const selectedSort =
        sortSelect
            ? sortSelect.value
            : "default";


    filteredProducts =
        products.filter(
            (product) => {

                const matchesSearch =
                    product.title
                        .toLowerCase()
                        .includes(searchTerm);


                const matchesCategory =
                    selectedCategory === "all" ||
                    product.category ===
                        selectedCategory;


                return (
                    matchesSearch &&
                    matchesCategory
                );
            }
        );


    if (
        selectedSort ===
        "name-asc"
    ) {

        filteredProducts.sort(
            (a, b) =>
                a.title.localeCompare(
                    b.title
                )
        );

    }


    if (
        selectedSort ===
        "name-desc"
    ) {

        filteredProducts.sort(
            (a, b) =>
                b.title.localeCompare(
                    a.title
                )
        );

    }


    if (
        selectedSort ===
        "price-low"
    ) {

        filteredProducts.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    if (
        selectedSort ===
        "price-high"
    ) {

        filteredProducts.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    renderProducts(
        filteredProducts
    );
}


// ============================================
// LOCAL STORAGE
// ============================================

function getSavedProducts() {

    try {

        const saved =
            localStorage.getItem(
                "savedProducts"
            );


        return saved
            ? JSON.parse(saved)
            : [];

    } catch (error) {

        console.error(
            "Unable to read saved products:",
            error
        );

        return [];
    }
}


function saveProduct(productId) {

    const savedProducts =
        getSavedProducts();


    if (
        !savedProducts.includes(
            productId
        )
    ) {

        savedProducts.push(
            productId
        );

        localStorage.setItem(
            "savedProducts",
            JSON.stringify(
                savedProducts
            )
        );

    }
}


function attachSaveButtons() {

    const buttons =
        document.querySelectorAll(
            ".save-product"
        );


    const savedProducts =
        getSavedProducts();


    buttons.forEach(
        (button) => {

            const id =
                Number(
                    button.dataset.id
                );


            if (
                savedProducts.includes(id)
            ) {

                button.textContent =
                    "Saved";

                button.setAttribute(
                    "aria-label",
                    "Product already saved"
                );

            }


            button.addEventListener(
                "click",
                () => {

                    saveProduct(id);

                    button.textContent =
                        "Saved";

                    button.setAttribute(
                        "aria-label",
                        "Product already saved"
                    );

                }
            );

        }
    );
}


// ============================================
// FONT SIZE PREFERENCE
// ============================================

function loadFontPreference() {

    const savedSize =
        localStorage.getItem(
            "fontSizePreference"
        );


    if (
        savedSize ===
        "large"
    ) {

        document.body.classList.add(
            "large-text"
        );

    }
}


function increaseFontSize() {

    document.body.classList.add(
        "large-text"
    );


    localStorage.setItem(
        "fontSizePreference",
        "large"
    );
}


// ============================================
// FORM VALIDATION
// ============================================

function handleFormSubmit(
    event
) {

    event.preventDefault();


    if (
        !serviceForm.checkValidity()
    ) {

        serviceForm.reportValidity();

        return;
    }


    alert(
        "Application submitted successfully."
    );


    serviceForm.reset();
}


// ============================================
// ACCESSIBILITY MODAL
// ============================================

function setupAccessibilityModal() {

    const openButton =
        document.getElementById(
            "open-modal"
        );


    const closeButton =
        document.getElementById(
            "close-modal"
        );


    const modal =
        document.getElementById(
            "accessibility-modal"
        );


    if (
        !openButton ||
        !closeButton ||
        !modal
    ) {

        return;
    }


    function openModal() {

        modal.hidden = false;

        document.body.style.overflow =
            "hidden";


        closeButton.focus();
    }


    function closeModal() {

        modal.hidden = true;

        document.body.style.overflow =
            "";


        openButton.focus();
    }


    openButton.addEventListener(
        "click",
        openModal
    );


    closeButton.addEventListener(
        "click",
        closeModal
    );


    modal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === modal
            ) {

                closeModal();

            }

        }
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                !modal.hidden
            ) {

                closeModal();

            }

        }
    );
}


// ============================================
// API DATA LOADING
// ============================================

async function loadProducts() {

    showLoading();


    try {

        products =
            await fetchProducts();


        filteredProducts =
            [...products];


        populateCategories();

        renderProducts(
            filteredProducts
        );


        hideLoading();


    } catch (error) {

        console.error(
            "API error:",
            error
        );


        showError(
            "We could not load the live service data. Please check your internet connection and try again."
        );

    }
}


// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            updateProducts
        );

    }


    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            updateProducts
        );

    }


    if (sortSelect) {

        sortSelect.addEventListener(
            "change",
            updateProducts
        );

    }


    if (increaseFontButton) {

        increaseFontButton.addEventListener(
            "click",
            increaseFontSize
        );

    }


    if (serviceForm) {

        serviceForm.addEventListener(
            "submit",
            handleFormSubmit
        );

    }
}


// ============================================
// INITIALIZE APPLICATION
// ============================================

async function initializeApp() {

    loadFontPreference();

    setupEventListeners();

    setupAccessibilityModal();

    await loadProducts();

}


// START APPLICATION

initializeApp();