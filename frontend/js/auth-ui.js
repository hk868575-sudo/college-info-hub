function updateAdminUI() {

    const adminStatus =
        document.getElementById("adminStatus");

    const navAdminArea =
        document.getElementById("navAdminArea");

    const token =
        localStorage.getItem("adminToken");

    const username =
        localStorage.getItem("adminUsername");


    // Admin is logged in
    if (token && username) {

        if (adminStatus) {
            adminStatus.innerHTML = `
                <span class="logged-in-badge">
                    <span class="status-dot"></span>
                    Logged in as <strong>${username}</strong>
                </span>
            `;
        }


        if (navAdminArea) {
            navAdminArea.innerHTML = `
                <a
                    href="admin/dashboard.html"
                    class="admin-dashboard-button"
                >
                    ⚙ Dashboard
                </a>

                <button
                    id="logoutButton"
                    class="logout-button"
                >
                    Logout
                </button>
            `;


            const logoutButton =
                document.getElementById("logoutButton");

            logoutButton.addEventListener(
                "click",
                function () {

                    localStorage.removeItem("adminToken");
                    localStorage.removeItem("adminUsername");

                    window.location.reload();

                }
            );
        }

    }

    // Admin is NOT logged in
    else {

        if (adminStatus) {
            adminStatus.innerHTML = `
                <span class="admin-guest-badge">
                    🔐 Admin Portal
                </span>
            `;
        }


        if (navAdminArea) {
            navAdminArea.innerHTML = `
                <a
                    href="admin/login.html"
                    class="admin-login-button"
                >
                    🔐 Admin Login
                </a>
            `;
        }

    }

}


// Run when page loads
updateAdminUI();