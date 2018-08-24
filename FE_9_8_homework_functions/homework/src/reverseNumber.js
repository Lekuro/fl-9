function reverseNumber(number) {
  let strNumber = parseInt(number).toString();
  let strReverseNumber = '';
  for (let i = strNumber.length - 1; i >= 0; i--) {
    strReverseNumber += strNumber[i];
  }
  return parseInt(strReverseNumber) * Math.sign(number);
}
