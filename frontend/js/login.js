const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(
            "http://localhost:3000/api/admin/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            loginMessage.textContent = data.message;
            return;
        }

        // Save JWT token
        localStorage.setItem(
            "adminToken",
            data.token
        );

        // Save admin username
        localStorage.setItem(
            "adminUsername",
            data.admin.username
        );

        loginMessage.textContent =
            "Login successful!";

        // Go to dashboard
        window.location.href =
            "dashboard.html";

    } catch (error) {
        console.error("Login error:", error);

        loginMessage.textContent =
            "Unable to connect to server.";
    }
});