let login = prompt(`Please enter your login`, ``);
if (!login) {
  alert(`Canceled`);
} else if (login.length < 4) {
  alert(`I don't know any users having name length less than 4 symbols`);
} else if (login !== `User`) {
  alert(`I don’t know you`);
} else {
  let password = prompt(`Please enter your password`, ``);
  if (!password) {
    alert(`Canceled`);
  } else if (password !== `SuperUser`) {
    alert(`Wrong password`);
  } else {
    if (new Date().getHours() < 20.0) {
      alert(`Good day!`);
    } else {
      alert(`Good evening!`);
    }
  }
}
