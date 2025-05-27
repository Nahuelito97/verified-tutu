async function verifyEmail() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');
    const type = params.get('type');

    const backendUrl = window.TUTU_CONFIG.backendUrl;

    const icon = document.getElementById('statusIcon');
    const title = document.getElementById('messageTitle');
    const text = document.getElementById('messageText');

    if (!code || !state || !type) {
        showError();
        return;
    }

    try {
        const response = await fetch(`${backendUrl}/api/email/verify-email?code=${code}&state=${state}&type=${type}`);
        if (response.ok) {
            icon.src = 'assets/email-success-icon.svg';
            title.textContent = '¡Verificación exitosa!';
            text.textContent = 'Tu dirección de correo ha sido verificada correctamente. Bienvenido a TUTU 🚗';
        } else {
            showError();
        }
    } catch (error) {
        showError();
    }
}

function showError() {
    const icon = document.getElementById('statusIcon');
    const title = document.getElementById('messageTitle');
    const text = document.getElementById('messageText');

    icon.src = 'assets/email-error-icon.svg';
    title.textContent = 'Verificación fallida';
    text.textContent = 'Lo sentimos, el enlace de verificación en el que hiciste clic ha expirado o se produjo un error de acceso. Por favor, solicitá un nuevo enlace para verificar tu correo';
}

verifyEmail();
  