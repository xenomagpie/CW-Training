/* Author: Stanley Lin */
/*
  P1
*/
const itemsObject = [
  { quantity: 1, price: 200 }, { quantity: 3, price: 350 }, { quantity: 5, price: 400 },
];

// P1.1: Given the array, implement a function for generating a new array which doubles the quantity and price in each object.
// P1.1 Solution 1 - Without Higher-order Function
function double1(arr) {
  const result = [];

  for (let obj of arr)
    result.push({ quantity: obj.quantity * 2, price: obj.price * 2 });

  return result;
};

// P1.2 Solution 2 - With Higher-order Function: map
const double2 = arr => arr.map(obj => ({ quantity: obj.quantity * 2, price: obj.price * 2 }));

// P1.2: Given the array, implement a function for generating a new array which contains item quantity > 2 and price > 300 only.
// P1.2 Solution 1 - Without Higher-order Function
function filter1(arr) {
  const result = [];

  for (let obj of arr)
    if (obj.quantity > 2 && obj.price > 300)
      result.push(obj);

  return result;
}

// P1.2 Solution 2 - With Higher-order Function: filter
const filter2 = arr => arr.filter(obj => (obj.quantity > 2 && obj.price > 300));


// P1.3: Given the array, implement a function to calculate the total value of the items.
// P1.3 Solution 1 - Without Higher-order Function
function calculateValue1(arr) {
  let total = 0;

  for (let obj of arr)
    total += obj.quantity * obj.price;

  return total;
}

// P1.3 Solution 2 - With Higher-order Function: reduce
const calculateValue2 = arr => arr.reduce((prev, cur) => {
  return prev + cur.quantity * cur.price;
}, 0);


/* 
  P2: Given the string, implement a function to remove all the non - alphabet characters and 
  extra space in the string and convert the string to all lowercase.
*/
const string = ' Perhaps The Easiest-to-understand Case For Reduce Is To Return The Sum Of  All The Elements In  An Array  ';

// P2 Solution 1 - Regular Expression
function parse1(str) {
  return str.trim().replace(/  +/g, ' ').replace(/[^a-zA-Z\s]/g, '').toLowerCase();
};

// P2 Solution 2 - Iteration with ASCII Code
function parse2(str) {
  const wordArr = str.trim().split(" "); // consecutive(extra) spaces will be kept as empty strings
  let result = [];

  for (let word of wordArr)
    if (word.length !== 0)
      result.push(parseCharArr([...word]));

  return result.join(" ");
}

// filter out all non-alphabet characters from a character array and return the parsed and lowercased string
function parseCharArr(arr) {
  return arr.filter(c => isAlphabet(c)).join("").toLowerCase();
}

function isAlphabet(c) {
  const CHAR_CODE_A = 65;     // or "A".charCodeAt(0)
  const CHAR_CODE_Z = 90;     // or "Z".charCodeAt(0)
  const CHAR_CODE_AS = 97;    // or "a".charCodeAt(0)
  const CHAR_CODE_ZS = 122;   // or "z".charCodeAt(0)

  const code = c.charCodeAt(0);

  if (
    (code >= CHAR_CODE_A && code <= CHAR_CODE_Z) ||
    (code >= CHAR_CODE_AS && code <= CHAR_CODE_ZS)
  ) {
    return true;
  }

  return false;
}


/*
  P3: Implement a function to merge two arrays of objects on uuid, but first has uuid and name, second has uuid and role. 
  With the not existing property, fill with null. 
  Sort according to uuid after merge.
*/
const first = [
  { uuid: 2, name: "test" }, { uuid: 5, name: "test5" }, { uuid: 3, name: "test3" }
];
const second = [
  { uuid: 6, role: "pm" },
  { uuid: 4, role: "engineer" }, { uuid: 1, role: "manager" }, { uuid: 2, role: "associate" }
];


// P3 Solution 1 - Using Object
function merge1(arr1, arr2) {
  let record = new Object();

  [...arr1, ...arr2].forEach(obj => { // or arr1.concat(arr2);
    record[obj.uuid] = {
      name: (record[obj.uuid] && record[obj.uuid].name) || obj.name || null,
      role: (record[obj.uuid] && record[obj.uuid].role) || obj.role || null
    }
  });

  return Object.keys(record)
    .map(uuid => ({ uuid: parseInt(uuid), ...record[uuid] }))
    .sort((a, b) => (a.uuid - b.uuid));
}

// P3 Solution 2 - Using Map
function merge2(arr1, arr2) {
  let record = new Map();

  [...arr1, ...arr2].forEach(obj => {
    record.set(obj.uuid, {
      name: (record.has(obj.uuid) && record.get(obj.uuid).name) || obj.name || null,
      role: (record.has(obj.uuid) && record.get(obj.uuid).role) || obj.role || null
    });
  });

  return Array.from(record, ([uuid, props]) => ({ uuid, ...props })).sort((a, b) => a.uuid - b.uuid);
}

// for P1.1 ~ P1.2
const Printer = (oldArr, func) => {
  console.log("Old array: ", oldArr);
  console.log("New array: ", func(oldArr));
  console.log();
}

function print() {
  console.log("P1: ");
  console.log("P1.1 Solution 1's Result: ");
  Printer(itemsObject, double1);
  console.log("P1.1 Solution 2's Result: ");
  Printer(itemsObject, double2);
  console.log("P1.2 Solution 1's Result: ");
  Printer(itemsObject, filter1);
  console.log("P1.2 Solution 2's Result: ");
  Printer(itemsObject, filter2);
  console.log("P1.3 Solution 1's Result: ");
  console.log("Total value: ", calculateValue1(itemsObject));
  console.log();
  console.log("P1.3 Solution 2's Result: ");
  console.log("Total value: ", calculateValue2(itemsObject));
  console.log();

  console.log();
  console.log("P2: ");
  console.log("P2 Solution 1's Result: ");
  console.log("Old string: ", string);
  console.log("New string: ", parse1(string));
  console.log();
  console.log("P2 Solution 2's Result: ");
  console.log("Old string: ", string);
  console.log("New string: ", parse2(string));
  console.log();

  console.log();
  console.log("P3: ");
  console.log("P3 Solution 1's Result: ");
  console.log(merge1(first, second));
  console.log();
  console.log("P3 Solution 2's Result: ");
  console.log(merge2(first, second));
}

print();