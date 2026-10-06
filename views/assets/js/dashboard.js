console.log("Dashboard JS cargado correctamente");

const welcomeMessage = document.getElementById("welcome-message");
const logoutBtn = document.getElementById("logout-btn");

async function cargarDashboard() {
    try {
        const response = await fetch("/dashboard");
        const data = await response.json();

        if (!response.ok) {
            window.location.href = "/";
            return;
        }

        const usuario = data.usuario;

        welcomeMessage.textContent =
            `Bienvenido ${usuario.nombre} ${usuario.apellido}`;

    } catch (error) {
        console.error("Error:", error);
        window.location.href = "/";
    }
}

logoutBtn.onclick = async () => {
    try {
        const response = await fetch("/logout", {
            method: "POST"
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || "Error al cerrar sesión");
            return;
        }

        window.location.href = "/";
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo conectar con el servidor.");
    }
};

cargarDashboard();
