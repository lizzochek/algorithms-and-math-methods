const binaryAddition = (a, b) => {
  let result = '',
    // A value to put into the next digit if there's sum of more than 1
    carry = 0;

  while (a || b || carry) {
    // Get the last digits, amount carried from the last iteration and sum them
    let sum = +a.slice(-1) + +b.slice(-1) + carry;

    // If the sum is more than one, a digit is moved to the higher bit
    if (sum > 1) {
      result = (sum % 2) + result;
      carry = 1;
    } else {
      // IIf not, we just get the sum and carry 0 to the next
      result = sum + result;
      carry = 0;
    }

    // Trim last digit to continue iteration
    a = a.slice(0, -1);
    b = b.slice(0, -1);
  }

  return result;
};

const modAddition = (a, b) => {
  // First we just get a binary sum of two numbers
  const res = binaryAddition(a, b);

  // Now to compare numbers easier we will use decimal numbers
  const decRes = parseInt(res, 2);

  // Now if the number is less than 2^32, we return it
  // if not, we substract 2^32 and return the result
  const modSum = decRes < Math.pow(2, 32) ? decRes : decRes - Math.pow(2, 32);

  // the result is decimal, we need to convert it back to binary and return it
  return modSum.toString(2);
};

module.exports = {
  modAddition,
};
