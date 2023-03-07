// Message in the number format
const messages = [
  [5, 18, 15, 3, 18, 2, 0, 7, 15],
  [10, 9, 0, 2, 6, 22, 0, 18, 15],
  [6, 3, 11, 2, 17, 0],
];

const encrypt = (messages, e, n) => {
  // Resulting array
  const encrypted = [];
  for (let i = 0; i < messages.length; i++) {
    let y = [];
    for (let j = 0; j < messages[i].length; j++) {
      // Iterate over message and count y by formula
      y.push(Math.pow(messages[i][j], e) % n);
    }
    encrypted.push(y);
  }
  return encrypted;
};

const res = encrypt(messages, 7, 869);
console.log(res);

// Pow for large numbers
const pow = (base, exponent) => base ** exponent;

const decrypt = (encrypted, key, n) => {
  const decrypted = [];
  for (let i = 0; i < encrypted.length; i++) {
    let x = [];
    for (let j = 0; j < encrypted[i].length; j++) {
      // Calculate formula using BigInt for correct calculations
      let calc = pow(BigInt(encrypted[i][j]), BigInt(key)) % BigInt(n);
      x.push(Number(calc));
    }
    decrypted.push(x);
  }
  return decrypted;
};

const decrypted = decrypt(res, 223, 869);
console.log(decrypted);
