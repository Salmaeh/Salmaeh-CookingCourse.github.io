//script.js
document.addEventListener('DOMContentLoaded', () => {
  const paymentForm = document.getElementById('payment-form');
  const nameField = document.getElementById('name');

  paymentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Check if the name contains numbers
      const nameValue = nameField.value.trim();
      const nameHasNumbers = /\d/.test(nameValue);

      if (nameHasNumbers) {
          alert('The name cannot contain numbers. Please enter a valid name.');
          return;
      }

      // Simulate payment processing
      alert('Payment Successful!');
      
      // Store payment status
      localStorage.setItem('paymentStatus', 'paid');
      
      // Redirect back to the landing page
      window.location.href = 'landing.html';
  });
});