/* Author: Stanley Lin */
/*
  P1
*/
const itemsObject = [
  { quantity: 1, price: 200 }, { quantity: 3, price: 350 }, { quantity: 5, price: 400 }
]

// P1.1: Given the array, implement a function for generating a new array which doubles the quantity and price in each object.
// P1.1 Solution 1 - Without Higher-order Function
const double1 = arr => {
  const result = []

  for (const obj of arr) { result.push({ quantity: obj.quantity * 2, price: obj.price * 2 }) }

  return result
}

// P1.2 Solution 2 - With Higher-order Function: map
const double2 = arr => arr.map(({ quantity, price }) => ({ quantity: quantity * 2, price: price * 2 }))

// P1.2: Given the array, implement a function for generating a new array which contains item quantity > 2 and price > 300 only.
// P1.2 Solution 1 - Without Higher-order Function
const filter1 = arr => {
  const result = []

  for (const obj of arr) {
    if (obj.quantity > 2 && obj.price > 300) {
      result.push(obj)
    }
  }

  return result
}

// P1.2 Solution 2 - With Higher-order Function: filter
const filter2 = arr => arr.filter(({ quantity, price }) => (quantity > 2 && price > 300))

// P1.3: Given the array, implement a function to calculate the total value of the items.
// P1.3 Solution 1 - Without Higher-order Function
const calculateValue1 = arr => {
  let total = 0

  for (const obj of arr) { total += obj.quantity * obj.price }

  return total
}

// P1.3 Solution 2 - With Higher-order Function: reduce
const calculateValue2 = arr => arr.reduce((prev, cur) => {
  return prev + cur.quantity * cur.price
}, 0)

/*
  P2: Given the string, implement a function to remove all the non - alphabet characters and
  extra space in the string and convert the string to all lowercase.
*/
const string = ' Perhaps The Easiest-to-understand Case For Reduce Is To Return The Sum Of  All The Elements In  An Array  '

// P2 Solution 1 - Regular Expression
// const parse1 = str => (str.trim().replace(/  +/g, ' ').replace(/[^a-zA-Z\s]/g, '').toLowerCase())
const parse1 = str => (str.replace(/[^a-zA-Z]+/g, ' ').trim().toLocaleLowerCase())

// P2 Solution 2 - Iteration by Word
const parse2 = str => {
  const wordArr = str.trim().split(' ') // consecutive(extra) spaces will be kept as empty strings
  const parsedWordArr = []

  for (const word of wordArr) {
    if (word.length !== 0) {
      parsedWordArr.push(parseCharArr([...word]))
    }
  }

  return parsedWordArr.join(' ')
}

// filter out all non-alphabet characters from a character array and return the parsed and lowercased string
const parseCharArr = arr => {
  return arr.filter(c => isAlphabet(c)).join('').toLowerCase()
}

const isAlphabet = c => {
  // const CHAR_CODE_A = 65 // or "A".charCodeAt(0)
  // const CHAR_CODE_Z = 90 // or "Z".charCodeAt(0)
  // const CHAR_CODE_AS = 97 // or "a".charCodeAt(0)
  // const CHAR_CODE_ZS = 122 // or "z".charCodeAt(0)

  // const code = c.charCodeAt(0)

  // if (
  //   (code >= CHAR_CODE_A && code <= CHAR_CODE_Z) ||
  //   (code >= CHAR_CODE_AS && code <= CHAR_CODE_ZS)
  // ) {
  //   return true
  // }

  if (
    (c >= 'A' && c <= 'Z') ||
    (c >= 'a' && c <= 'z')
  ) {
    return true
  }

  return false
}

// P2 Solution 3 - Iteration by Character
const parse3 = str => {
  str = str.trim()
  const charArr = []

  for (const c of str) {
    if (isAlphabet(c)) {
      charArr.push(c.toLowerCase())
    } else if (c === ' ' && charArr.size !== 0 && charArr[charArr.length - 1] !== ' ') {
      charArr.push(' ')
    }
  }

  return charArr.join('')
}

/*
  P3: Implement a function to merge two arrays of objects on uuid, but first has uuid and name, second has uuid and role.
  With the not existing property, fill with null.
  Sort according to uuid after merge.
*/
const first = [{ uuid: 2, name: 'test' }, { uuid: 5, name: 'test5' }, { uuid: 3, name: 'test3' }]
const second = [{ uuid: 6, role: 'pm' }, { uuid: 4, role: 'engineer' }, { uuid: 1, role: 'manager' }, { uuid: 2, role: 'associate' }]

// P3 Solution 1 - Using Object
// Time Complexity: O(nlogn)
// Space Complexity: O(n)
const merge1 = (arr1, arr2) => {
  const record = {};

  [...arr1, ...arr2].forEach(obj => { // or arr1.concat(arr2);
    if (!record[obj.uuid]) {
      record[obj.uuid] = {
        uuid: obj.uuid,
        name: obj.name || null, // use optional chaining ?. when Node.js version >= 14
        role: obj.role || null
      }
    } else {
      record[obj.uuid] = { ...record[obj.uuid], ...obj }
    }
  })

  return Object.values(record).sort((a, b) => (a.uuid - b.uuid))
}

// P3 Solution 2 - Using Map
// Time Complexity: O(nlogn)
// Space Complexity: O(n)
const merge2 = (arr1, arr2) => {
  const record = new Map();

  [...arr1, ...arr2].forEach(obj => {
    if (!record.has(obj.uuid)) {
      record.set(obj.uuid, {
        uuid: obj.uuid,
        name: obj.name || null,
        role: obj.role || null
      })
    } else {
      record.set(obj.uuid, { ...record.get(obj.uuid), ...obj })
    }
  })

  return Array.from(record, ([, props]) => ({ ...props })).sort((a, b) => a.uuid - b.uuid)
}

// P3 Solution 3 - Using Object.assign
// Time Complexity: O(n^2)
// Space Complexity: O(n)
const merge3 = (arr1, arr2) => {
  const mergedArr = [...new Set([...arr1.map(f), ...arr2.map(f)])].map(uuid => ({ uuid, name: null, role: null }))

  mergedArr.forEach(obj => {
    for (const obj1 of arr1) { // use for-of loop to break early. assume no object with duplicate uuid in each input array
      if (obj.uuid === obj1.uuid) {
        Object.assign(obj, obj1)
        break
      }
    }

    for (const obj2 of arr2) {
      if (obj.uuid === obj2.uuid) {
        Object.assign(obj, obj2)
        break
      }
    }
  })

  return mergedArr.sort((a, b) => (a.uuid - b.uuid))
}

const f = obj => obj.uuid

// for P1.1 ~ P1.2
const Printer = (oldArr, func) => {
  console.log('Old array: ', oldArr)
  console.log('New array: ', func(oldArr))
  console.log()
}

(() => {
  console.log('P1: ')
  console.log("P1.1 Solution 1's Result: ")
  Printer(itemsObject, double1)
  console.log("P1.1 Solution 2's Result: ")
  Printer(itemsObject, double2)
  console.log("P1.2 Solution 1's Result: ")
  Printer(itemsObject, filter1)
  console.log("P1.2 Solution 2's Result: ")
  Printer(itemsObject, filter2)
  console.log("P1.3 Solution 1's Result: ")
  console.log('Total value: ', calculateValue1(itemsObject))
  console.log()
  console.log("P1.3 Solution 2's Result: ")
  console.log('Total value: ', calculateValue2(itemsObject))
  console.log()

  console.log('***************************************************')

  console.log()
  console.log('P2: ')
  console.log("P2 Solution 1's Result: ")
  console.log('Old string: ', string)
  console.log('New string: ', parse1(string))
  console.log()
  console.log("P2 Solution 2's Result: ")
  console.log('Old string: ', string)
  console.log('New string: ', parse2(string))
  console.log()
  console.log("P2 Solution 3's Result: ")
  console.log('Old string: ', string)
  console.log('New string: ', parse3(string))
  console.log()

  console.log('***************************************************')

  console.log()
  console.log('P3: ')
  console.log("P3 Solution 1's Result: ")
  console.log(merge1(first, second))
  console.log()
  console.log("P3 Solution 2's Result: ")
  console.log(merge2(first, second))
  console.log()
  console.log("P3 Solution 3's Result: ")
  console.log(merge3(first, second))
})()
