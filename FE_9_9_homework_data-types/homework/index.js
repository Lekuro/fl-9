const findType = argument => typeof argument;

const forEach = (array, callback) => {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
};

const map = (array, callback) => {
  let arrayNew = [];
  forEach(array, (element, i, array) => arrayNew.push(callback(element, i, array)));
  return arrayNew;
};

const filter = (array, callback) => {
  let arrayNew = [];
  forEach(array, (element, i, array) => {
    if (callback(element, i, array)) {
      arrayNew.push(element);
    }
  });
  return arrayNew;
};

const getAdultAppleLovers = array => {
  let arrNeeded = filter(array, el => el.age > 18 && el.favoriteFruit === 'apple');
  return map(arrNeeded, el => el.name);
};

const keys = obj => {
  let arrKeys = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      arrKeys.push(key);
    }
  }
  return arrKeys;
};

const values = obj => {
  let arrValues = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      arrValues.push(obj[key]);
    }
  }
  return arrValues;
};

const showFormattedDate = date => {
  let arrMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `It is ${date.getDate()} of ${arrMonth[date.getMonth()]}, ${date.getFullYear()}`;
};
