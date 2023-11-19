function initialize() {
    var earth = new WE.map('earth_div');
    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a href="https://www.openstreetmap.org/copyright">©️ OpenStreetMap contributors</a>'
    }).addTo(earth);
    

    var issIcon = WE.marker([0, 0], 'https://media.wheretheiss.at/v/423aa9eb/img/iss.png', 168, 120).addTo(earth);
    const endPoint = 'https://api.wheretheiss.at/v1/satellites/25544';
    let flagPrimeira = true;

    async function getISS() {
        const response = await fetch(endPoint);
        const data = await response.json();

        const {
            latitude,
            longitude,
            altitude,
            velocity
        } = data;

        const altitudeMilhas = altitude * 0.621371;
        const velocityMilhas = velocity * 0.621371;

        issIcon.setLatLng([latitude, longitude]);
        earth.setView([latitude, longitude]);

        if (flagPrimeira) {
            earth.setView([latitude, longitude], 2.5);
            flagPrimeira = false;
        }

        document.getElementById('lat').textContent = latitude.toFixed(3);
        document.getElementById('lon').textContent = longitude.toFixed(3);
        document.getElementById('alt').textContent = altitude.toFixed(2);
        document.getElementById('vel').textContent = velocity.toFixed(2);

        // Exibe as distâncias em milhas
        document.getElementById('pesAltitude').textContent = altitudeMilhas.toFixed(2);
        document.getElementById('milhasVelocidade').textContent = velocityMilhas.toFixed(2);
    }

    getISS();
    setInterval(getISS, 10000);
}