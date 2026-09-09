console.log("notice-details.js loaded");

const noticeDetails =
    document.getElementById("noticeDetails");

console.log("noticeDetails element:", noticeDetails);


// Load notice details

async function loadNoticeDetails() {

    console.log("loadNoticeDetails started");

    const params =
        new URLSearchParams(window.location.search);

    const id =
        params.get("id");

    console.log("Notice ID:", id);


    // Check if ID exists

    if (!id) {

        noticeDetails.innerHTML =
            "<p>Notice ID not found.</p>";

        return;
    }


    try {

        // API URL

        const url =
            `http://localhost:3000/api/notices/${id}`;

        console.log("Fetching:", url);


        // Fetch notice from backend

        const response =
            await fetch(url);

        console.log(
            "Response status:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "Notice not found"
            );

        }


        // Convert response to JSON

        const notice =
            await response.json();

        console.log(
            "Notice received:",
            notice
        );


        // Display notice

        noticeDetails.innerHTML = `

            <div class="notice-card">

                <h2>

                    ${notice.title}

                    ${
                        notice.isImportant
                            ? `
                                <span class="important-badge">
                                    📌 IMPORTANT
                                </span>
                            `
                            : ""
                    }

                </h2>


                <p class="notice-category">

                    Category:
                    ${notice.category}

                </p>


                <p>

                    ${notice.description}

                </p>


                <p class="notice-date">

                    Published:
                    ${formatDate(notice.publishDate)}

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
                                    href="http://localhost:3000${notice.attachment.url}"
                                    target="_blank"
                                >
                                    ${notice.attachment.name}
                                </a>

                            </p>
                        `
                        : ""
                }


                <button
                    onclick="goBack()"
                >

                    Back to Notices

                </button>

            </div>

        `;


    } catch (error) {

        console.error(
            "Error:",
            error
        );

        noticeDetails.innerHTML = `

            <p>
                Unable to load notice.
            </p>

        `;

    }

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


// Go back to notices page

function goBack() {

    window.history.back();

}


// Load notice when page opens

loadNoticeDetails();