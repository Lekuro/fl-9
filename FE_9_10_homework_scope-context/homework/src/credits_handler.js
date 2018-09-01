const newHistory = (operation, amount, time) => ({
  operationType: operation,
  credits: amount,
  operationTime: time
});
function userCard(number) {
  const interest = 1.005,
    accuracyOfRounding = 2;
  let key = number,
    balance = 100,
    transactionLimit = 100,
    historyLogs = [];
  return {
    getCardOptions: () => ({ key, balance, transactionLimit, historyLogs }),
    putCredits: amountOfCredits => {
      balance += amountOfCredits;
      historyLogs.push(newHistory('Received credits', amountOfCredits, new Date().toLocaleString('en-GB')));
    },
    takeCredits: amountOfCredits => {
      if (transactionLimit > amountOfCredits && balance > amountOfCredits) {
        balance -= amountOfCredits;
        historyLogs.push(newHistory('Withdrawal of credits', amountOfCredits, new Date().toLocaleString('en-GB')));
        return true;
      } else {
        console.log('sorry you cannot take the credit');
        return false;
      }
    },
    setTransactionLimit: amountOfCredits => {
      transactionLimit = amountOfCredits;
      historyLogs.push(newHistory('Transaction limit change', amountOfCredits, new Date().toLocaleString('en-GB')));
    },
    transferCredits(amountOfCredits, objCard) {
      let taxedAmount = (amountOfCredits * interest).toFixed(accuracyOfRounding) * 1;
      if (this.takeCredits(taxedAmount)) {
        objCard.putCredits(amountOfCredits);
      }
    }
  };
}
function UserAccount(str) {
  const maxRangeOfCard = 3;
  this.name = str;
  this.cards = [];
  this.addCard = () => {
    if (this.cards.length < maxRangeOfCard) {
      this.cards.push(userCard(this.cards.length + 1));
    }
  };
  this.getCardByKey = number => this.cards[number - 1];
}
