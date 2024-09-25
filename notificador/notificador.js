document.getElementById('notificationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const topic = document.getElementById('topic').value; // Obtendo o valor do tópico do usuário
    const message = document.getElementById('message').value;

    const url = `https://ntfy.sh/${topic}`; // Construindo a URL com o tópico fornecido pelo usuário

    fetch(url, {
        method: 'POST',
        body: message
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('response').textContent = 'Notificação enviada com sucesso!';
            document.getElementById('message').value = '';
        } else {
            document.getElementById('response').textContent = 'Falha ao enviar notificação.';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('response').textContent = 'Ocorreu um erro ao enviar a notificação.';
    });
});
