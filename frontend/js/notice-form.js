const noticeForm = document.getElementById("noticeForm");
const formTitle = document.getElementById("formTitle");
const formMessage = document.getElementById("formMessage");
const cancelButton = document.getElementById("cancelButton");


// Check admin login
const token = localStorage.getItem("adminToken");

if (!token) {
    window.location.href = "login.html";
}

window.addEventListener("pageshow", function () {

    const currentToken =
        localStorage.getItem("adminToken");

    if (!currentToken) {
        window.location.replace("login.html");
    }

});

// Check whether this is Add or Edit
const params = new URLSearchParams(window.location.search);
const noticeId = params.get("id");


// If editing, load existing notice
if (noticeId) {
    formTitle.textContent = "Edit Notice";
    loadNotice();
}


// Load notice for editing
async function loadNotice() {

    try {

        const response = await fetch(
            `http://localhost:3000/api/notices/${noticeId}`
        );

        if (!response.ok) {
            throw new Error("Notice not found");
        }

        const notice = await response.json();

        document.getElementById("title").value =
            notice.title;

        document.getElementById("category").value =
            notice.category;

        document.getElementById("description").value =
            notice.description;

        document.getElementById("publishDate").value =
            notice.publishDate.split("T")[0];
        
        if (notice.eventDate) {

            document.getElementById("eventDate").value =
                notice.eventDate.split("T")[0];
            
        }

        if (notice.expiryDate) {

            document.getElementById("expiryDate").value =
                notice.expiryDate.split("T")[0];
        
        }

        document.getElementById("isImportant").checked =
            notice.isImportant || false;

    } catch (error) {

        console.error("Error:", error);

        formMessage.textContent =
            "Unable to load notice.";

    }
}


// Submit form
noticeForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    const title =
        document.getElementById("title").value;

    const category =
        document.getElementById("category").value;

    const description =
        document.getElementById("description").value;

    const publishDate =
        document.getElementById("publishDate").value;

    const eventDate =
        document.getElementById("eventDate").value;

    const expiryDate =
        document.getElementById("expiryDate").value;

    const attachment =
        document.getElementById("attachment").files[0];
    
    if (attachment) {
            console.log("Selected file:", attachment.name);
            console.log("File type:", attachment.type);
            console.log("File size:", attachment.size);
    }

    const isImportant =
        document.getElementById("isImportant").checked;

        const formData = new FormData();

        formData.append("title", title);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("publishDate", publishDate);
        formData.append("eventDate", eventDate || "");
        formData.append("expiryDate", expiryDate || "");
        formData.append("isImportant", isImportant);
        
        if (attachment) {
            formData.append("attachment", attachment);
        }


    try {

        let url =
            "http://localhost:3000/api/notices";

        let method = "POST";


        // Edit existing notice
        if (noticeId) {

            url =
                `http://localhost:3000/api/notices/${noticeId}`;

            method = "PUT";
        }


        const response = await fetch(
            url,
            {
                method: method,

                headers: {
                    "Authorization": `Bearer ${token}`
                },

                body: formData
            }
        );


        const data = await response.json();


        if (!response.ok) {

            formMessage.textContent =
                data.message || "Something went wrong.";

            return;
        }


        formMessage.textContent =
            noticeId
                ? "Notice updated successfully!"
                : "Notice created successfully!";


        // Go back to dashboard after short delay
        setTimeout(function () {

            window.location.href = "dashboard.html";

        }, 1000);


    } catch (error) {

        console.error("Error:", error);

        formMessage.textContent =
            "Unable to connect to server.";

    }

});


// Cancel button
cancelButton.addEventListener("click", function () {

    window.location.href = "dashboard.html";

});