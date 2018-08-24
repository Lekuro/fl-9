const getClosestToZero = (...args) => {
  let indexClosest = 0;
  for (let i = 1; i < args.length; i++) {
    if (Math.abs(args[indexClosest]) > Math.abs(args[i])) {
      indexClosest = i;
    }
  }
  return args[indexClosest];
};
