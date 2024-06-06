document.addEventListener('DOMContentLoaded', function () {
    const data = {
        "copyright": "Lóránd Fényes",
        "date": "2024-06-06",
        "explanation": "Magnificent spiral galaxy NGC 4565 is viewed edge-on from planet Earth. Also known as the Needle Galaxy for its narrow profile, bright NGC 4565 is a stop on many telescopic tours of the northern sky, in the faint but well-groomed constellation Coma Berenices. This sharp, colorful image reveals the galaxy's boxy, bulging central core cut by obscuring dust lanes that lace NGC 4565's thin galactic plane. NGC 4565 itself lies about 40 million light-years distant and spans some 100,000 light-years. Easily spotted with small telescopes, sky enthusiasts consider NGC 4565 to be a prominent celestial masterpiece Messier missed.",
        "hdurl": "https://apod.nasa.gov/apod/image/2406/278_lorand_fenyes_ngc4565.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "NGC 4565: Galaxy on Edge",
        "url": "https://apod.nasa.gov/apod/image/2406/278_lorand_fenyes_ngc4565_1024.jpg"
    };

    document.getElementById('title').textContent = data.title;
    document.getElementById('date').textContent = data.date;
    document.getElementById('explanation').textContent = data.explanation;
    document.getElementById('copyright').textContent = `© ${data.copyright}`;
    document.getElementById('image').src = data.url;
});
