
if (!localStorage.getItem('userId')) {
    localStorage.setItem('userId', 'user-' + Math.random().toString(36).substring(2, 10));
  }
  const currentUserId = localStorage.getItem('userId');
  
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('challengeForm');
    const challengeList = document.getElementById('challengeList');
    const balanceButton = document.querySelector('.balance-button');
    const balanceModal = document.getElementById('balanceModal');
    const balanceCloseBtn = document.querySelector('.close-button');
  
    const challengePopup = document.getElementById('challengePopup');
    const challengePopupContent = document.getElementById('challengePopupContent');
    const challengePopupClose = document.getElementById('challengePopupClose');
  
    const acceptModal = document.getElementById('acceptChallengeModal');
    const acceptClose = document.getElementById('acceptClose');
    const minNum = document.getElementById('minNum');
    const maxNum = document.getElementById('maxNum');
    const challengeGuess = document.getElementById('challengeGuess');
    const submitGuess = document.getElementById('submitGuess');
  
    let currentOdds = null;
  
    
    const now = Date.now();
const savedChallenges = JSON.parse(localStorage.getItem('challenges')) || [];

// Keep only challenges younger than 5 minutes
const freshChallenges = savedChallenges.filter(ch => now - ch.createdAt < 5 * 60 * 1000);

// Update localStorage in case any old ones were removed
localStorage.setItem('challenges', JSON.stringify(freshChallenges));

// Render only fresh challenges
freshChallenges.forEach(renderChallenge);
  
    
    form.addEventListener('submit', (e) => {
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
  
      const challenge = {
        amount,
        odds,
        creator: currentUserId,
        createdAt: Date.now() 
      };
      savedChallenges.push(challenge);
      localStorage.setItem('challenges', JSON.stringify(savedChallenges));
  
      renderChallenge(challenge);
      form.reset();
    });
  
   
    function renderChallenge({ amount, odds, creator }) {
      const box = document.createElement('div');
      box.className = 'challenge-box';
      box.innerHTML = `
        <strong>Anonymous Challenge Created</strong><br />
        Amount: <span>${amount}</span><br />
        Odds: <span>${odds}</span>
      `;
  
      box.addEventListener('click', () => {
        let popupHTML = `
          <h2>Challenge Details</h2>
          <p>Amount: <strong>${amount}</strong></p>
          <p>Odds: <strong>${odds}</strong></p>
        `;
      
        if (creator !== currentUserId) {
          popupHTML += `<button id="acceptChallengeBtn">Accept Challenge</button>`;
        } else {
          popupHTML += `<p style="color: gray;">You created this challenge.</p>`;
        }
      
        challengePopupContent.innerHTML = popupHTML;
        challengePopup.style.display = 'flex';
      
        if (creator !== currentUserId) {
          setTimeout(() => {
            const acceptBtn = document.getElementById('acceptChallengeBtn');
            if (acceptBtn) {
              acceptBtn.addEventListener('click', () => {
                challengePopup.style.display = 'none';
      
                const oddsParts = odds.split('/');
                currentOdds = parseInt(oddsParts[1]);
                minNum.textContent = 1;
                maxNum.textContent = currentOdds;
                challengeGuess.value = '';
                challengeGuess.setAttribute('max', currentOdds);
                acceptModal.style.display = 'flex';
              });
            }
          }, 0);
        }
      });
  
      challengeList.appendChild(box);
    }
  
    challengePopupClose.addEventListener('click', () => {
      challengePopup.style.display = 'none';
    });
  
    window.addEventListener('click', (e) => {
      if (e.target === challengePopup) {
        challengePopup.style.display = 'none';
      }
      if (e.target === acceptModal) {
        acceptModal.style.display = 'none';
      }
      if (e.target === balanceModal) {
        balanceModal.style.display = 'none';
      }
    });
  
 
    if (balanceButton && balanceModal && balanceCloseBtn) {
      balanceButton.addEventListener('click', () => {
        balanceModal.style.display = 'flex';
      });
  
      balanceCloseBtn.addEventListener('click', () => {
        balanceModal.style.display = 'none';
      });
    }
  
  
    acceptClose.addEventListener('click', () => {
      acceptModal.style.display = 'none';
    });
  
  
    submitGuess.addEventListener('click', () => {
      const guess = parseInt(challengeGuess.value);
      if (!guess || guess < 1 || guess > currentOdds) {
        alert(`Please enter a number between 1 and ${currentOdds}.`);
        return;
      }
  
      alert(`You guessed: ${guess}. Odds were 1/${currentOdds}.`);
      acceptModal.style.display = 'none';
    });
  });