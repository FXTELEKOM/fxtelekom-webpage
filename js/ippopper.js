function showTooltip(event) {
    const button = event.currentTarget;
    const ipsUrl = button.getAttribute('data-ips-url');
    const tooltipId = `popper-${ipsUrl.split('/').pop().split('.')[0]}`;
    const tooltip = document.getElementById(tooltipId);
    const isVisible = !tooltip.classList.contains('hidden');

    if (isVisible) {
        tooltip.classList.add('hidden');
        document.removeEventListener('click', handleClickOutside);
        return;
    }

    fetch(ipsUrl)
        .then(response => response.text())
        .then(data => {
            const ipList = data.split('\n').filter(line => line.trim() !== '');
            tooltip.innerHTML = `
                <h4 class="text-lg font-semibold mb-2">IP Addresses</h4>
                <ul class="list-disc list-inside">
                    ${ipList.map(ip => `<li>${ip}</li>`).join('')}
                </ul>`;
            tooltip.classList.remove('hidden');

            Popper.createPopper(button, tooltip, {
                placement: 'bottom',
            });

            const handleClickOutside = (e) => {
                if (!button.contains(e.target) && !tooltip.contains(e.target)) {
                    tooltip.classList.add('hidden');
                    document.removeEventListener('click', handleClickOutside);
                }
            };

            document.addEventListener('click', handleClickOutside);
        })
        .catch(error => {
            console.error('Error fetching IPs:', error);
            tooltip.innerHTML = '<p>Error loading IP addresses.</p>';
            tooltip.classList.remove('hidden');
        });
}
