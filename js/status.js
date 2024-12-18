async function updateServiceStatusWithPingTime(serviceId, apiUrl) {
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

async function updateServiceStatusWithStatus(serviceId, apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const status = data.status;
        const serviceElement = document.getElementById(serviceId);
        const pingTimeElement = serviceElement.querySelector('span');
        const statusIndicator = serviceElement.querySelector('status-indicator');

        pingTimeElement.textContent = '';

        statusIndicator.removeAttribute('positive');
        statusIndicator.removeAttribute('intermediary');
        statusIndicator.removeAttribute('negative');

        if (status === 'ok') {
            pingTimeElement.textContent = 'Online';
            statusIndicator.setAttribute('positive', '');
        } else if (status === 'degraded') {
            pingTimeElement.textContent = 'Limitált';
            statusIndicator.setAttribute('intermediary', '');
        } else if (status === 'error') {
            pingTimeElement.textContent = 'Offline';
            statusIndicator.setAttribute('negative', '');
        } else {
            pingTimeElement.textContent = 'Ismeretlen állapot';
        }

    } catch (error) {
        console.error(`Error fetching data for ${serviceId}:`, error);
    }
}

function initServices() {
    const services = [
        { id: 'service-1', url: 'https://api.fxtelekom.org/status/cloudflare', updateFunction: updateServiceStatusWithPingTime },
        { id: 'service-2', url: 'https://api.fxtelekom.org/status/gcore', updateFunction: updateServiceStatusWithPingTime },
        { id: 'service-3', url: 'https://api.fxtelekom.org/status/valve-cs2', updateFunction: updateServiceStatusWithPingTime },
        { id: 'service-4', url: 'https://api.fxtelekom.org/status/tarkov', updateFunction: updateServiceStatusWithPingTime },
        { id: 'service-5', url: 'https://api.fxtelekom.org/status/websupportsk', updateFunction: updateServiceStatusWithPingTime },
        { id: 'service-6', url: 'https://api.fxtelekom.org/status/hunt', updateFunction: updateServiceStatusWithPingTime },
        { id: 'service-7', url: 'https://api.fxtelekom.org/status/service/wireguard', updateFunction: updateServiceStatusWithStatus },
        { id: 'service-8', url: 'https://api.fxtelekom.org/status/service/dns/1', updateFunction: updateServiceStatusWithStatus },
        { id: 'service-9', url: 'https://api.fxtelekom.org/status/service/dns/2', updateFunction: updateServiceStatusWithStatus },
        { id: 'service-10', url: 'https://api.fxtelekom.org/status/fastly', updateFunction: updateServiceStatusWithPingTime },
        { id: 'service-11', url: 'https://api.fxtelekom.org/status/github', updateFunction: updateServiceStatusWithPingTime },
        { id: 'service-12', url: 'https://api.fxtelekom.org/status/gfn', updateFunction: updateServiceStatusWithPingTime }
    ];

    services.forEach(service => {
        service.updateFunction(service.id, service.url);
    });
}

initServices();

setInterval(initServices, 8000);
