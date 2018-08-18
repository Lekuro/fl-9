let price = parseFloat(prompt(`Please enter the price`, ``));
let discount = parseFloat(prompt(`Please enter the discount`, ``));
price = Math.floor(price * 100) / 100;
discount = Math.floor(discount * 100) / 100;
if (price >= 0 && discount >= 0 && discount <= 100) {
  let discountPrice = (price - price * discount / 100).toFixed(2) * 1;
  let saved = (price - discountPrice).toFixed(2) * 1;
  console.log(
    `Price without discount: ${price}\n` +
      `Discount: ${discount}%\n` +
      `Price with discount: ${discountPrice}\n` +
      `Saved: -${saved}\n`
  );
} else {
  console.log(`Invalid data`);
}
