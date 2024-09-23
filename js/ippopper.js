const ipToggle = document.getElementById('ipToggle');
const ipPopper = document.getElementById('ipPopper');
const ipList = document.getElementById('ipList');
let popperInstance = null;

function createPopper() {
    popperInstance = Popper.createPopper(ipToggle, ipPopper, {
        placement: 'bottom-end',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 10],
                },
            },
        ],
    });
}

async function fetchIPs() {
    try {
        const response = await fetch('/ips/websupportsk.txt');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const text = await response.text();
        const ips = text.trim().split('\n');

        ipList.innerHTML = '';
        
        ips.forEach(ip => {
            const li = document.createElement('li');
            li.textContent = ip;
            ipList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching IPs:', error);
        ipList.innerHTML = '<li>Error loading IPs</li>';
    }
}

function togglePopper() {
    if (ipPopper.classList.contains('hidden')) {
        fetchIPs();
        ipPopper.classList.remove('hidden');
        createPopper();
    } else {
        ipPopper.classList.add('hidden');
        if (popperInstance) {
            popperInstance.destroy();
            popperInstance = null;
        }
    }
}

ipToggle.addEventListener('click', togglePopper);
