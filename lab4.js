const p = 79;
const phiP = 78;
const canonicNums = [2, 3, 13];

//Find the greatest common diviser
// Function from previous lab used
function gcd(a, b) {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}

// Function for BigInt pow
const pow = (base, exponent) => base ** exponent;

const findRoots = (p, phiP, canonicNums) => {
  // Define array for results
  const results = [];
  // Find powers phi / qi
  const pows = canonicNums.map((el) => phiP / el);

  // Try numbers in range [2, p-1]
  for (let a = 2; a < p; a++) {
    // Check whether GCD is 1
    if (gcd(p, a) != 1) continue;

    // Find a ^ (phi / qi)
    let aPows = pows.map((el) => pow(BigInt(a), BigInt(el)));
    // Fiind whether conditions are satisfied
    let condition = aPows.find((el) => el % BigInt(p) === 1n);
    // If conditions are not satisfied, skip this a
    if (condition) continue;
    // Add the suitable a values to result
    else results.push(a);
  }
  return results;
};

const res = findRoots(p, phiP, canonicNums);
console.log(res);

const findOtherRoots = (phiP, arr) => {
  const result = [];
  arr.forEach((element) => {
    for (let k = 1; k < phiP; k++) {
      let power = pow(BigInt(element), BigInt(k))
      if (gcd(k, phiP) === 1 && !result.includes(power) && power <= phiP) {
        result.push(Number(power));
      }
    }
  });
  return result;
};

const roots = findOtherRoots(phiP, res);
console.log(roots);