if (confirm(`Do you want to play a game?`)) {
  let userNumber, secretNumber, prizeAttempt, attempt;
  const maxAttempt = 3,
    prizeCoefficient = 3,
    rangeCoefficient = 2;
  do {
    let maxRange = 5,
      prizeTotal = 0,
      prizeAttemptMax = 10;
    do {
      secretNumber = Math.round(Math.random() * maxRange);
      attempt = maxAttempt;
      for (; attempt > 0; attempt--) {
        prizeAttempt = Math.floor(prizeAttemptMax / Math.pow(2, maxAttempt - attempt)); //2**(maxAttempt - i)
        userNumber = prompt(
          `Enter a number from 0 to ${maxRange}\n` +
            `Attempts left: ${attempt}\n` +
            `Total prize: ${prizeTotal}$\n` +
            `Possible prize on current attempt: ${prizeAttempt}$`
        );
        if (!isNaN(userNumber) && isFinite(userNumber)) {
          userNumber = parseFloat(userNumber);
        }
        if (userNumber === secretNumber) {
          prizeTotal += prizeAttempt;
          maxRange *= rangeCoefficient;
          prizeAttemptMax *= prizeCoefficient;
          break;
        }
      }
      if (attempt === 0) {
        break;
      }
    } while (confirm(`Congratulation! Your prize is: ${prizeTotal}$ Do you want to continue?`));
    alert(`Thank you for a game. Your prize is: ${prizeTotal}$`);
  } while (confirm(`Do you want to play a game again?`));
} else {
  alert(`You did not become a millionaire, but can.`);
}
