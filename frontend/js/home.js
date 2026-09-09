const noticeContainer =
    document.getElementById("noticeContainer");

const noticeTicker =
    document.getElementById("noticeTicker");

const newNoticeSection =
    document.getElementById("newNoticeSection");


// Fetch notices from backend
async function loadNotices() {

    try {

        const response = await fetch(
            "/api/notices"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch notices");
        }

        const notices = await response.json();

        displayNotices(notices);

        displayNewNotice(notices);

    } catch (error) {

        console.error("Error loading notices:", error);

        noticeContainer.innerHTML =
            "<p>Unable to load notices.</p>";

    }
}


// Display latest notices
function displayNotices(notices) {

    noticeContainer.innerHTML = "";

    if (notices.length === 0) {

        noticeContainer.innerHTML =
            "<p>No notices available.</p>";

        return;
    }


    notices.forEach(notice => {

        const noticeCard =
            document.createElement("div");

        noticeCard.className = "notice-card";


        // Check if notice is new
        const isNew = isNoticeNew(notice.createdAt);


        if (isNew) {
            noticeCard.classList.add("new-notice");
        }


        noticeCard.innerHTML = `

            <h3>
    ${notice.title}
    
    ${
        notice.isImportant
            ? '<span class="important-badge">📌 IMPORTANT</span>'
            : ""
    }

    ${
        isNew
            ? '<span class="new-badge">NEW</span>'
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

        `;


        noticeContainer.appendChild(noticeCard);

    });

}


// Display new notice in ticker
function displayNewNotice(notices) {

    if (!noticeTicker || !newNoticeSection) {
        return;
    }


    const newNotices = notices.filter(notice =>
        isNoticeNew(notice.createdAt)
    );


    // No new notices
    if (newNotices.length === 0) {

        newNoticeSection.style.display = "none";

        return;
    }


    newNoticeSection.style.display = "flex";


    // Create ticker content
    let tickerContent = "";


    newNotices.forEach(notice => {

        tickerContent += `
            <a href="notice.html?id=${notice._id}">
                🆕 ${notice.title} — ${notice.description}
            </a>

            <span>
                &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;
            </span>
        `;

    });


    // Duplicate content for seamless scrolling
    noticeTicker.innerHTML =
        tickerContent + tickerContent;

}


// Check whether notice is new
function isNoticeNew(createdAt) {

    const createdTime =
        new Date(createdAt).getTime();

    const currentTime =
        new Date().getTime();


    const difference =
        currentTime - createdTime;


    // 24 hours
    const twentyFourHours =
        24 * 60 * 60 * 1000;


    return difference <= twentyFourHours;

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


// Load notices when page opens
loadNotices();