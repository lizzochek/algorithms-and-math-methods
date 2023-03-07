const M3 = Math.pow(52164, 3);
const m = (M3 + 9) % 78;
console.log(`m=${m}`);

// Pow for large numbers
const pow = (base, exponent) => base ** exponent;
const S = pow(BigInt(m), BigInt(223)) % BigInt(869);
console.log(`S=${Number(S)}`);

const m1 = pow(S, 7n) % 869n;
console.log(`m'=${m1}`);

const r = (pow(18n, 12n) % 79n) % 13n;
console.log(`r=${r}`);

const v = ((Math.pow(18, 3) * 21) % 79) % 13;
console.log(`v=${v}`);
