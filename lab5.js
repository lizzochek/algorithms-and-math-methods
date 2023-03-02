// Message in the number format
const message = [
  [5, 18, 15, 3, 18, 2, 0],
  [7, 15, 10, 9, 0, 2, 6, 22, 0],
  [18, 15, 6, 3, 11, 2, 17, 0],
];

// Message in string form for logging
const stringMessage = ['Долгова', 'Єлизавета', 'Олегівна'];

const result = [];

// Formula to count
const findC2 = (m, h, r, p) => (m * Math.pow(h, r)) % p;

// Iterate over all numbers in message and find c2
for (let i = 0; i < message.length; i++) {
  const res = [];
  for (let j = 0; j < message[i].length; j++) {
    const c2 = findC2(message[i][j], 59, 7, 79);
    res.push(c2);
    // Log result
    // console.log(`${stringMessage[i].charAt(j)} => c2 = ${c2}`)
  }
  result.push(res);
}

const c1 = 47;
const k2 = 5;

// Pow for large numbers
const pow = (base, exponent) => base ** exponent;
// Formula to count
const findD = (c1, c2, k2, p) =>
  (BigInt(c2) * pow(BigInt(c1), BigInt(79 - 1 - k2))) % BigInt(p);

const decryptedRes = [];
for (let i = 0; i < result.length; i++) {
  const decrypted = [];
  for (let j = 0; j < result[i].length; j++) {
    // Count formula
    const D = findD(c1, result[i][j], k2, 79);
    // Push resukt as number
    decrypted.push(Number(D));
  }
  decryptedRes.push(decrypted);
}

// console.log(decryptedRes);

// console.log('Resulting cryptograms:');
// for(let i = 0; i < result.length; i++) {
//     for(let j = 0; j < result[i].length; j++) {
//         console.log(`c = (${c1}, ${result[i][j]})`)
//     }
// }

console.log('Results:');
for (let i = 0; i < result.length; i++) {
  for (let j = 0; j < result[i].length; j++) {
    console.log(
      `${stringMessage[i].charAt(j)} => ${message[i][j]} => encrypted = ${
        result[i][j]
      } => decrypted = ${decryptedRes[i][j]}`
    );
  }
}
