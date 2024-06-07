document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api.nasa.gov/planetary/apod?api_key=X')
        .then(response => response.json())
        .then(data => {
            document.getElementById('title').textContent = data.title;
            document.getElementById('date').textContent = data.date;
            document.getElementById('explanation').textContent = data.explanation;
            document.getElementById('copyright').textContent = `© ${data.copyright}`;
            document.getElementById('image').src = data.url;
        })
        .catch(error => console.error('Erro ao buscar imagem da NASA:', error));
});
