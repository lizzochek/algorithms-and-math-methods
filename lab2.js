// Text to encrypt: ДолговаД

// Importing helpers
const { modAddition } = require('./helpers-lab2');

// Entry data

// Binary code of the entry text that has to be encrypted
const B = '1100010011001110110010111100001111001110110000101100000011000100';

// First set of session keys
const X1 = [
  '00010000000000000000000000000001',
  '10000000000000000000000000000001',
  '10000000000000000000000000000010',
  '10000000000000000000000000000100',
  '10000000000000000000000000001000',
  '10000000000000000000000000010000',
  '10000000000000000000000000100000',
  '10000000000000000000000001000000',
];

// Second set of session keys
const X2 = [
  '10000000000000000000000010000000',
  '10000000000000000000100000000000',
  '10000000000000001000000000000000',
  '10000000000000000000000000001000',
  '10000000000010000000000000000000',
  '10000000100000000000000000000000',
  '10000000000000000000000000000000',
  '00000000000000000000000010000000',
];

// Permanent keys set
const K = [
  ['1010', '0001', '1110', '0111', '0000', '1011', '1001', '1010'],
  ['0001', '1110', '0111', '0000', '1011', '1001', '1010', '1010'],
  ['1110', '0111', '0000', '1011', '1001', '1010', '1010', '0001'],
  ['0111', '0000', '1011', '1001', '1010', '1010', '0001', '1110'],
  ['0000', '1011', '1001', '1010', '1010', '0001', '1110', '0111'],
  ['1011', '1001', '1010', '1010', '0001', '1110', '0111', '0000'],
  ['1001', '1010', '1010', '0001', '1110', '0111', '0000', '1011'],
  ['1010', '1010', '0001', '1110', '0111', '0000', '1011', '1001'],
  ['1010', '0001', '1110', '0111', '0000', '1011', '1001', '1010'],
  ['0001', '1110', '0111', '0000', '1011', '1001', '1010', '1010'],
  ['1110', '0111', '0000', '1011', '1001', '1010', '1010', '0001'],
  ['0111', '0000', '1011', '1001', '1010', '1010', '0001', '1110'],
  ['0000', '1011', '1001', '1010', '1010', '0001', '1110', '0111'],
  ['1011', '1001', '1010', '1010', '0001', '1110', '0111', '0000'],
  ['1001', '1010', '1010', '0001', '1110', '0111', '0000', '1011'],
  ['1010', '1010', '0001', '1110', '0111', '0000', '1011', '1001'],
];

const GOSTencryption = (B, X, K) => {
  // Step 0
  // Split the entry block into two parts
  // For that we take half of the string, split it to letters, reverse them
  // (because the digits start from right to left) and join back
  let L = B.slice(32).split('').reverse().join('');
  let R = B.slice(32, 64).split('').reverse().join('');

  // For the 32-З algorithm, session keys will be X0-X7, X0-X7, X0-X7, X7-X0
  // So we modify the array:
  const sessionKeys = [...X, ...X, ...X, ...X.reverse()];

  // Now we have data set up, so we can start iteration
  // We will be iterating by session keys as the array length is 32 - the needed num of cycles
  for (let i = 0; i < sessionKeys.length; i++) {
    // Array for storing
    let H = [];
    console.log(`------ Cycle ${i + 1} ------`);
    console.log(`Right part: ${R}`);
    console.log(`Session key: ${sessionKeys[i]}`);

    // Step 1
    console.log('Step 1');
    // Add R and Xi mod 2^32
    // Addition process is described in the function declaration
    // If the result is less than 32, add seroes to the higher digits
    res = modAddition(R, sessionKeys[i]).padStart(32, '0');
    console.log(`Modulus addition result: ${res}`);

    // Step 2
    console.log('Step 2');
    // Split H into 8 tetrades
    for (let j = 0; j < res.length; j += 4) {
      // We do unshift, because lower digits will go first
      H.unshift(res.slice(j, j + 4));
    }

    console.log(`Split into tetrades: ${H}`);

    // Change using permanent keys table
    // For tetrade i we choose column i and row which equals tetrade i
    let changedH = [];
    for (let k = 0; k < H.length; k++) {
      // Get decimal number to find needed row
      let rowIndex = parseInt(H[k], 2);
      // Choose suitable K and save to array
      // We do unshift again to put the lower digits at the end and higher at the beginning
      changedH.unshift(K[rowIndex][i % 8]);
    }

    let changedString = changedH.join('');
    console.log(
      `Exchange tetrades with permanent key table and join in reverse order: ${changedString}`
    );

    // Step 3
    console.log('Step 3');
    // Cyclic shift 11 bits to the left
    // We need to put the first 11 digits to the end of the number
    let N = changedString.slice(11, 33) + changedString.slice(0, 11);
    console.log(`After cyclic shift: ${N}`);

    // Step 4
    // Add N and L by bits mod 2
    console.log('Step 4');
    let sumResult = '';
    // We just take each digit, sum it and get mod 2
    for (let m = 0; m < N.length; m++) {
      sumResult += (+N[m] + +L[m]) % 2;
    }
    console.log(`Sum N and L: ${sumResult}`);

    // Step 5
    // Put R into the L and sumResult into R and go for the next cycle
    L = R;
    R = sumResult;
  }

  return [L, R].join('');
};

console.log('-------- First cycle ---------');
const cycleRes = GOSTencryption(B, X1, K);

console.log(`Cycle result: ${cycleRes}`);

console.log('-------- Second cycle ---------');
const finalRes = GOSTencryption(cycleRes, X2, K);
console.log(`Second cycle result: ${cycleRes}`);
