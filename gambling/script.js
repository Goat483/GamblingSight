const form = document.getElementById('challengeForm');
const challengeList = document.getElementById('challengeList');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const amount = document.getElementById('amount').value.trim();
  const odds = document.getElementById('odds').value.trim();
  const rulesChecked = document.getElementById('rulesCheck').checked;

  if (!rulesChecked) {
    alert("You must agree to the rules before creating a challenge.");
    return;
  }

  if (amount === '' || odds === '') {
    alert("Please fill in both fields.");
    return;
  }

  const challengeBox = document.createElement('div');
  challengeBox.className = 'challenge-box';
  challengeBox.innerHTML = `
    <strong> Anonymous Challenge Created</strong><br />
    Amount: <span>${amount}</span><br />
    Odds: <span>${odds}</span>
  `;

  challengeList.appendChild(challengeBox);

  // Optionally clear inputs:
  form.reset();
});

// --------------------------
// Modal Functionality
// --------------------------
document.addEventListener('DOMContentLoaded', () => {
  const balanceButton = document.querySelector('.balance-button');
  const modal = document.getElementById('balanceModal');
  const closeBtn = document.querySelector('.close-button');

  if (balanceButton && modal && closeBtn) {
    balanceButton.addEventListener('click', () => {
      modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  } else {
    console.log('Modal elements not found.');
  }
});