const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Credenciales inválidas');
        }

        // Esperar la respuesta como HTML
        const data = await response.text();

        // Mostrar la respuesta HTML en el contenedor
        document.getElementById('content-container').innerHTML = data;

        console.log('Inicio de sesión exitoso');
    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginFormSubmit);
    }
});
