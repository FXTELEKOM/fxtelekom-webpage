async function updateServiceStatus(serviceId, apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        const pingTime = parseFloat(data.ping_time);
        
        const serviceElement = document.getElementById(serviceId);
        const pingTimeElement = serviceElement.querySelector('span');
        const statusIndicator = serviceElement.querySelector('status-indicator');

        pingTimeElement.textContent = `${pingTime}ms`;

        statusIndicator.removeAttribute('positive');
        statusIndicator.removeAttribute('intermediary');
        statusIndicator.removeAttribute('negative');

        if (pingTime < 35) {
            statusIndicator.setAttribute('positive', '');
        } else if (pingTime >= 35 && pingTime < 70) {
            statusIndicator.setAttribute('intermediary', '');
        } else {
            statusIndicator.setAttribute('negative', '');
        }

    } catch (error) {
        console.error(`Error fetching data for ${serviceId}:`, error);
    }
}

function initServices() {
    const services = [
        { id: 'service-1', url: 'https://api.fxtelekom.org/status/cloudflare' },
        { id: 'service-2', url: 'https://api.fxtelekom.org/status/gcore' },
        { id: 'service-3', url: 'https://api.fxtelekom.org/status/valve-cs2' },
        { id: 'service-4', url: 'https://api.fxtelekom.org/status/tarkov' },
        { id: 'service-5', url: 'https://api.fxtelekom.org/status/websupportsk' },
        { id: 'service-6', url: 'https://api.fxtelekom.org/status/hunt' }
    ];

    services.forEach(service => {
        updateServiceStatus(service.id, service.url);
    });
}

initServices();

setInterval(initServices, 60000);
