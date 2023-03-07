// Pow for large numbers
const pow = (base, exponent) => base ** exponent;

const r1 = pow(784n, 223n) % 869n;
console.log(`r'=${r1}`);

//Find the greatest common diviser
function gcd(a, b) {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}

const n = 869;
const res = [];
for (let v = 0; v < n; v++) {
  if (gcd(v, n) === 1 && Number.isInteger(Math.sqrt(v % n))) {
    res.push(v);
  }
}
console.log(res);