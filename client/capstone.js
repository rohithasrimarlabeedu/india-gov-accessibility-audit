import { services } from "./capstone-data.js";

const state = {
    services: [...services],
    filteredServices: [...services],
    currentUser: JSON.parse(localStorage.getItem("capstoneUser")) || null
};

const elements = {
    serviceGrid: document.getElementById("service-grid"),
    search: document.getElementById("capstone-search"),
    category: document.getElementById("capstone-category"),
    sort: document.getElementById("capstone-sort"),
    loginButton: document.getElementById("login-button"),
    logoutButton: document.getElementById("logout-button"),
    authMessage: document.getElementById("auth-message"),
    serviceForm: document.getElementById("service-form"),
    serviceName: document.getElementById("service-name"),
    serviceCategory: document.getElementById("service-category"),
    serviceDescription: document.getElementById("service-description"),
    serviceId: document.getElementById("service-id")
};

function saveServices() {
    localStorage.setItem(
        "capstoneServices",
        JSON.stringify(state.services)
    );
}

function loadServices() {
    const saved = localStorage.getItem("capstoneServices");

    if (saved) {
        state.services = JSON.parse(saved);
        state.filteredServices = [...state.services];
    }
}

function renderServices() {
    if (!elements.serviceGrid) return;

    if (state.filteredServices.length === 0) {
        elements.serviceGrid.innerHTML =
            "<p>No services found.</p>";
        return;
    }

    elements.serviceGrid.innerHTML =
        state.filteredServices.map(service => `
            <article class="service-card">
                <span class="service-status">${service.status}</span>
                <h3>${escapeHTML(service.name)}</h3>
                <p><strong>${escapeHTML(service.category)}</strong></p>
                <p>${escapeHTML(service.description)}</p>

                <div class="service-actions">
                    <button
                        type="button"
                        onclick="editService(${service.id})">
                        Edit
                    </button>

                    <button
                        type="button"
                        onclick="deleteService(${service.id})">
                        Delete
                    </button>
                </div>
            </article>
        `).join("");
}

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function filterServices() {
    const searchValue =
        elements.search?.value.toLowerCase() || "";

    const categoryValue =
        elements.category?.value || "All";

    state.filteredServices = state.services.filter(service => {
        const matchesSearch =
            service.name.toLowerCase().includes(searchValue) ||
            service.description.toLowerCase().includes(searchValue);

        const matchesCategory =
            categoryValue === "All" ||
            service.category === categoryValue;

        return matchesSearch && matchesCategory;
    });

    sortServices();
}

function sortServices() {
    const sortValue =
        elements.sort?.value || "default";

    if (sortValue === "name-asc") {
        state.filteredServices.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    if (sortValue === "name-desc") {
        state.filteredServices.sort((a, b) =>
            b.name.localeCompare(a.name)
        );
    }

    renderServices();
}

function populateCategories() {
    if (!elements.category) return;

    const categories = [
        ...new Set(state.services.map(service => service.category))
    ];

    elements.category.innerHTML =
        `<option value="All">All Categories</option>` +
        categories.map(category =>
            `<option value="${escapeHTML(category)}">
                ${escapeHTML(category)}
            </option>`
        ).join("");
}

function updateAuthUI() {
    if (!elements.authMessage) return;

    if (state.currentUser) {
        elements.authMessage.textContent =
            `Welcome, ${state.currentUser.name}!`;

        if (elements.loginButton) {
            elements.loginButton.hidden = true;
        }

        if (elements.logoutButton) {
            elements.logoutButton.hidden = false;
        }

        if (elements.serviceForm) {
            elements.serviceForm.hidden = false;
        }
    } else {
        elements.authMessage.textContent =
            "Please log in to manage services.";

        if (elements.loginButton) {
            elements.loginButton.hidden = false;
        }

        if (elements.logoutButton) {
            elements.logoutButton.hidden = true;
        }

        if (elements.serviceForm) {
            elements.serviceForm.hidden = true;
        }
    }
}

function login() {
    const name = prompt("Enter your name:");

    if (!name || !name.trim()) {
        return;
    }

    state.currentUser = {
        name: name.trim(),
        loginTime: new Date().toISOString()
    };

    localStorage.setItem(
        "capstoneUser",
        JSON.stringify(state.currentUser)
    );

    updateAuthUI();
}

function logout() {
    state.currentUser = null;
    localStorage.removeItem("capstoneUser");
    updateAuthUI();
}

function addService(event) {
    event.preventDefault();

    if (!state.currentUser) {
        alert("Please log in first.");
        return;
    }

    const name = elements.serviceName.value.trim();
    const category = elements.serviceCategory.value.trim();
    const description =
        elements.serviceDescription.value.trim();

    if (!name || !category || !description) {
        alert("Please complete all fields.");
        return;
    }

    const id = Date.now();

    state.services.push({
        id,
        name,
        category,
        description,
        status: "Available"
    });

    saveServices();
    populateCategories();
    filterServices();

    elements.serviceForm.reset();

    alert("Service added successfully.");
}

window.editService = function(id) {
    if (!state.currentUser) {
        alert("Please log in first.");
        return;
    }

    const service =
        state.services.find(item => item.id === id);

    if (!service) return;

    const newName =
        prompt("Enter new service name:", service.name);

    if (!newName || !newName.trim()) return;

    const newDescription =
        prompt(
            "Enter new description:",
            service.description
        );

    if (!newDescription || !newDescription.trim()) return;

    service.name = newName.trim();
    service.description = newDescription.trim();

    saveServices();
    filterServices();
};

window.deleteService = function(id) {
    if (!state.currentUser) {
        alert("Please log in first.");
        return;
    }

    const service =
        state.services.find(item => item.id === id);

    if (!service) return;

    const confirmed =
        confirm(`Delete "${service.name}"?`);

    if (!confirmed) return;

    state.services =
        state.services.filter(item => item.id !== id);

    saveServices();
    populateCategories();
    filterServices();
};

elements.search?.addEventListener(
    "input",
    filterServices
);

elements.category?.addEventListener(
    "change",
    filterServices
);

elements.sort?.addEventListener(
    "change",
    sortServices
);

elements.loginButton?.addEventListener(
    "click",
    login
);

elements.logoutButton?.addEventListener(
    "click",
    logout
);

elements.serviceForm?.addEventListener(
    "submit",
    addService
);

loadServices();
populateCategories();
updateAuthUI();
filterServices();