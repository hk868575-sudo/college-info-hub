const noticesContainer = document.getElementById("noticesContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const searchButton = document.getElementById("searchButton");


// Load notices
async function loadNotices() {

    try {

        const search = searchInput.value.trim();
        const category = categoryFilter.value;

        let url = "/api/notices";

        const params = new URLSearchParams();

        if (search) {
            params.append("search", search);
        }

        if (category) {
            params.append("category", category);
        }

        if (params.toString()) {
            url += "?" + params.toString();
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch notices");
        }

        const notices = await response.json();

        displayNotices(notices);

    } catch (error) {

        console.error("Error loading notices:", error);

        noticesContainer.innerHTML =
            "<p>Unable to load notices.</p>";
    }
}


// Display notices
function displayNotices(notices) {

    noticesContainer.innerHTML = "";

    if (notices.length === 0) {

        noticesContainer.innerHTML =
            "<p>No notices found.</p>";

        return;
    }

    notices.forEach(notice => {

        const noticeCard = document.createElement("div");

        noticeCard.className = "notice-card";

        noticeCard.innerHTML = `
            <h3>
            ${notice.title}

            ${
                 notice.isImportant
                ? '<span class="important-badge">📌 IMPORTANT</span>'
                : ""
            }
            </h3>

            <p class="notice-category">
                Category: ${notice.category}
            </p>

            <p>
                ${notice.description}
            </p>

            <p class="notice-date">
                Published: ${formatDate(notice.publishDate)}
            </p>
            ${
                notice.eventDate
                    ? `<p class="notice-date">
                        Event Date: ${formatDate(notice.eventDate)}
                    </p>`
                    : ""
            }
            <button
                class="details-button"
                onclick="viewNotice('${notice._id}')">
                View Details
            </button>
        `;

        noticesContainer.appendChild(noticeCard);
    });
}


// Open notice details page
function viewNotice(id) {

    window.location.href = `notice.html?id=${id}`;
}


// Format date
function formatDate(date) {

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );
}


// Search button
searchButton.addEventListener("click", loadNotices);


// Search when pressing Enter
searchInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        loadNotices();
    }

});


// Load all notices when page opens
loadNotices();