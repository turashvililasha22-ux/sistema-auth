const form = document.getElementById("auth-form");

const nameContainer = document.getElementById("name-container");
const nombreInput = document.getElementById("nombre");
const apellidoInput = document.getElementById("apellido");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const formTitle = document.getElementById("form-title");
const formDescription = document.getElementById("form-description");

const submitBtn = document.getElementById("submit-btn");
const toggleBtn = document.getElementById("toggle-btn");

const message = document.getElementById("message");
const googleBtn = document.querySelector(".google-btn");

let isRegister = false;

// Cambiar entre Login y Registro
toggleBtn.addEventListener("click", () => {
    isRegister = !isRegister;

    if (isRegister) {
        formTitle.textContent = "Crear cuenta";
        formDescription.textContent = "Regístrate para comenzar.";

        nameContainer.style.display = "block";

        nombreInput.required = true;
        apellidoInput.required = true;

        submitBtn.textContent = "Registrarse";
        toggleBtn.textContent = "Iniciar sesión";
    } else {
        formTitle.textContent = "Iniciar sesión";
        formDescription.textContent = "Accede a tu cuenta para continuar.";

        nameContainer.style.display = "none";

        nombreInput.required = false;
        apellidoInput.required = false;

        submitBtn.textContent = "Iniciar sesión";
        toggleBtn.textContent = "Crear cuenta";
    }

    message.textContent = "";

});

// Enviar formulario
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = nombreInput.value.trim();
    const apellido = apellidoInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    message.textContent = "Procesando...";

    try {
        const url = isRegister ? "/register" : "/login";

        const datos = isRegister
            ? {
                nombre,
                apellido,
                email,
                password
            }
            : {
                email,
                password
            };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        const data = await response.json();

        if (!response.ok) {
            message.textContent = data.error || "Ha ocurrido un error.";
            return;
        }

        message.textContent = data.mensaje;

        // Después de registrarse o iniciar sesión
        window.location.href = "/dashboard.html";

    } catch (error) {
        console.error("Error:", error);

        message.textContent =
            "No se pudo conectar con el servidor. Inténtalo de nuevo.";
    }

});
googleBtn.addEventListener("click", () => {
    window.location.href = "/auth/google";
});