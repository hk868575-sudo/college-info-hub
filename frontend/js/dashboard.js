const adminNoticesContainer =
    document.getElementById("adminNoticesContainer");

const noticeCount =
    document.getElementById("noticeCount");

const addNoticeButton =
    document.getElementById("addNoticeButton");

const logoutButton =
    document.getElementById("logoutButton");

const welcomeMessage =
    document.getElementById("welcomeMessage");

const adminUsername =
    localStorage.getItem("adminUsername");

if (adminUsername) {
    welcomeMessage.textContent =
        `Welcome, ${adminUsername}`;
}


// Check login

const token =
    localStorage.getItem("adminToken");

if (!token) {
    window.location.href = "login.html";
}


// Handle browser Back button / cached page

window.addEventListener("pageshow", function () {

    const currentToken =
        localStorage.getItem("adminToken");

    if (!currentToken) {
        window.location.replace("login.html");
    }

});


// Load all notices

async function loadNotices() {

    try {

        const response = await fetch(
            "/api/notices?includeExpired=true&includeArchived=true"
        );

        const notices = await response.json();

        noticeCount.textContent =
            `Total Notices: ${notices.length}`;

        displayNotices(notices);

    } catch (error) {

        console.error("Error loading notices:", error);

        adminNoticesContainer.innerHTML =
            "<p>Unable to load notices.</p>";

    }

}


// Display notices

function displayNotices(notices) {

    adminNoticesContainer.innerHTML = "";

    if (notices.length === 0) {

        adminNoticesContainer.innerHTML =
            "<p>No notices available.</p>";

        return;
    }


    notices.forEach(notice => {

        const noticeCard =
            document.createElement("div");

        noticeCard.className = "notice-card";


        // Check whether notice is expired

        const isExpired =
            notice.expiryDate &&
            new Date(notice.expiryDate) < new Date();


        noticeCard.innerHTML = `

            <h3>

                ${notice.title}

                ${
                    notice.isImportant
                        ? '<span class="important-badge">📌 IMPORTANT</span>'
                        : ""
                }

                ${
                    isExpired
                        ? '<span class="expired-badge">🔴 EXPIRED</span>'
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
                    ? `
                        <p class="notice-date">

                            Event Date:
                            ${formatDate(notice.eventDate)}

                        </p>
                    `
                    : ""
            }


            ${
                notice.expiryDate
                    ? `
                        <p class="notice-date">

                            Expiry Date:
                            ${formatDate(notice.expiryDate)}

                        </p>
                    `
                    : ""
            }


            ${
                notice.attachment &&
                notice.attachment.url
                    ? `
                        <p class="notice-attachment">

                            📎 Attachment:

                            <a
                                href="${notice.attachment.url}"
                                target="_blank"
                            >
                                ${notice.attachment.name}
                            </a>

                        </p>
                    `
                    : ""
            }


            <button
                onclick="viewNotice('${notice._id}')"
            >
                View
            </button>


            <button
                onclick="editNotice('${notice._id}')"
            >
                Edit
            </button>


            ${
                notice.isArchived

                    ? `
                        <button
                            onclick="restoreNotice('${notice._id}')"
                        >
                            Restore
                        </button>
                    `

                    : `
                        <button
                            onclick="archiveNotice('${notice._id}')"
                        >
                            Archive
                        </button>
                    `
            }


            <button
                onclick="deleteNotice('${notice._id}')"
            >
                Delete
            </button>

        `;


        adminNoticesContainer.appendChild(noticeCard);

    });

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


// Add Notice

addNoticeButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "notice-form.html";

    }
);


// Edit Notice

function editNotice(id) {

    window.location.href =
        `notice-form.html?id=${id}`;

}


// View Notice

function viewNotice(id) {

    window.location.href =
        `../notice.html?id=${id}`;

}


// Archive Notice

async function archiveNotice(id) {

    const confirmArchive =
        confirm(
            "Are you sure you want to archive this notice?"
        );

    if (!confirmArchive) {
        return;
    }


    try {

        const response = await fetch(

            `/api/notices/${id}/archive`,

            {
                method: "PUT",

                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }

        );


        const data =
            await response.json();


        if (!response.ok) {

            alert(data.message);

            return;

        }


        alert(
            "Notice archived successfully!"
        );


        loadNotices();


    } catch (error) {

        console.error(
            "Archive error:",
            error
        );

        alert(
            "Unable to archive notice."
        );

    }

}


// Restore Notice

async function restoreNotice(id) {

    const confirmRestore =
        confirm(
            "Are you sure you want to restore this notice?"
        );

    if (!confirmRestore) {
        return;
    }


    try {

        const response = await fetch(

            `/api/notices/${id}/restore`,

            {
                method: "PUT",

                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }

        );


        const data =
            await response.json();


        if (!response.ok) {

            alert(data.message);

            return;

        }


        alert(
            "Notice restored successfully!"
        );


        loadNotices();


    } catch (error) {

        console.error(
            "Restore error:",
            error
        );

        alert(
            "Unable to restore notice."
        );

    }

}


// Delete Notice

async function deleteNotice(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this notice?"
        );

    if (!confirmDelete) {
        return;
    }


    try {

        const response = await fetch(

            `/api/notices/${id}`,

            {
                method: "DELETE",

                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }

        );


        const data =
            await response.json();


        if (!response.ok) {

            alert(data.message);

            return;

        }


        alert(
            "Notice deleted successfully!"
        );


        loadNotices();


    } catch (error) {

        console.error(
            "Delete error:",
            error
        );

        alert(
            "Unable to delete notice."
        );

    }

}


// Logout

logoutButton.addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "adminToken"
        );

        localStorage.removeItem(
            "adminUsername"
        );

        window.location.href =
            "login.html";

    }
);


// Load notices

loadNotices();