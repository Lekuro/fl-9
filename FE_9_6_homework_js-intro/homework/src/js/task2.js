let a = parseFloat(prompt(`Please enter the first side of your triangle`, ``));
let b = parseFloat(prompt(`Please enter the second side of your triangle`, ``));
let angleDegrees = parseFloat(prompt(`Please enter the angle between these sides`, ``));
let square, perimeter, c;
const oneDegreeHasRadians = 0.017453292519943;
const maxAngle = 180;
let angleRadians = angleDegrees * oneDegreeHasRadians;
if (a > 0 && b > 0 && angleDegrees > 0 && angleDegrees < maxAngle) {
  c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(angleRadians)).toFixed(2) * 1;
  perimeter = (a + b + c).toFixed(2) * 1;
  square = (a * b * Math.sin(angleRadians) / 2).toFixed(2) * 1;
  console.log(`c length: ${c}\n` + `Triangle square: ${square}\n` + `Triangle perimeter: ${perimeter}\n`);
} else {
  console.log('Invalid data!');
}
