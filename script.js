const generateBtn = document.getElementById('generateBtn');
const resetBtn = document.getElementById('resetBtn'); // Get the reset button element
const qrCodeContainer = document.getElementById('qrCodeContainer');
const ticketNumberContainer = document.getElementById('ticketNumberContainer');

// Initialize ticket number from localStorage
let currentTicketNumber = parseInt(localStorage.getItem('ticketNumber')) || 0;

generateBtn.addEventListener('click', () => {
    // Increment ticket number
    currentTicketNumber++;
    
    // Save updated ticket number to localStorage
    localStorage.setItem('ticketNumber', currentTicketNumber.toString());

    const qrCodeData = `https://queueify.github.io/tickets/${currentTicketNumber}`;
    
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

resetBtn.addEventListener('click', () => {
    // Reset ticket number and clear localStorage
    currentTicketNumber = 0;
    localStorage.setItem('ticketNumber', '0');

    // Clear displayed content
    qrCodeContainer.innerHTML = '';
    ticketNumberContainer.textContent = 'Queue Reset';

    // You might want to reset the QR code image as well
});

// Check URL parameters on page load
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const scannedTicketNumber = urlParams.get('ticketNumber');
    
    if (scannedTicketNumber) {
        ticketNumberContainer.textContent = `Scanned Ticket Number: ${scannedTicketNumber}`;
    }
});
