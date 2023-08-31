const generateBtn = document.getElementById('generateBtn');
const qrCodeContainer = document.getElementById('qrCodeContainer');
const ticketNumberContainer = document.getElementById('ticketNumberContainer');

// Initialize ticket number from localStorage
let currentTicketNumber = parseInt(localStorage.getItem('ticketNumber')) || 0;

generateBtn.addEventListener('click', () => {
    // Increment ticket number
    currentTicketNumber++;
    
    // Save updated ticket number to localStorage
    localStorage.setItem('ticketNumber', currentTicketNumber.toString());

    const qrCodeData = `https://your-website.com/tickets/${currentTicketNumber}`;
    
    // Clear existing content
    qrCodeContainer.innerHTML = '';
    ticketNumberContainer.textContent = '';
    
    // Create QR code image element
    const qrCodeImg = document.createElement('img');
    qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCodeData)}`;
    qrCodeImg.alt = 'QR Code';
    qrCodeContainer.appendChild(qrCodeImg);
    
    // Display ticket number
    ticketNumberContainer.textContent = `Your Ticket Number: ${currentTicketNumber}`;
});

// Check URL parameters on page load
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const scannedTicketNumber = urlParams.get('ticketNumber');
    
    if (scannedTicketNumber) {
        ticketNumberContainer.textContent = `Scanned Ticket Number: ${scannedTicketNumber}`;
    }
});
