/*console.log("Dashboard JS cargado correctamente");

const logoutBtn = document.getElementById("logout-btn");
console.log("logoutBtn:", logoutBtn);

logoutBtn.addEventListener("click", async () => {

    console.log("Se ha pulsado Cerrar sesión");

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
});*/

console.log("Dashboard JS cargado correctamente");

const logoutBtn = document.getElementById("logout-btn");

console.log("logoutBtn:", logoutBtn);

logoutBtn.onclick = () => {
    console.log("CLICK FUNCIONA");
};
