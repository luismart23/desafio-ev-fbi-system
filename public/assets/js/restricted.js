document.addEventListener('DOMContentLoaded', async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        alert('No estás autorizado para acceder a esta página.');
        window.location.href = '/';
        return;
    }

    try {
        const response = await fetch('/auth/restricted', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            throw new Error('No autorizado');
        }

        const data = await response.text();
        document.getElementById('restricted-content').innerHTML = data;

        console.log('Acceso a la ruta restringida');
    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
        window.location.href = '/';
    }
});