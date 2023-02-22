// Test division method

const num = 20789;
const p = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139,
];

const testDivision = (num, p) => {
  for (let i = 0; i < p.length; i++) {
    if (num % p[i] === 0) return false;
  }
  return true;
};

const result = testDivision(num, p);
console.log(`The tested number is frime: ${result}`);

// Rabin-Miller's algorithm

//Find the greatest common diviser
function gcd(a, b) {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}
const res = gcd(20789, 3);
console.log(`GCD: ${res}`)

// Find modulo (basic way - needs additional testing ?)
const pow = (base, exponent) => base ** exponent;
const powResult = pow(5570n, 5197n);
console.log(powResult % 20789n);