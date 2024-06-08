document.addEventListener('DOMContentLoaded', () => {
    const link = document.querySelector('a[href="/restricted"]');

    if (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const token = sessionStorage.getItem('token');
            if (!token) {
                alert('No estás autorizado para acceder a esta ruta.');
                return;
            }
            fetch('/auth/restricted', {
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('No autorizado');
                    }
                    return response.text();
                })
                .then(data => {
                    document.body.innerHTML = data;
                })
                .catch(error => {
                    alert(error.message);
                });
        });
    }
});
