// Author: Stanley Lin
// data for P1
const tableInfo = {
  tableHeader: ['Student Name', 'Age', 'Phone', 'Address'],
  tableContent: [
    {
      'Student Name': 'John',
      Age: 19,
      Phone: '455 - 983 - 0903',
      Address: '123 Ave, San Francisco, CA, 94011'
    },
    {
      'Student Name': 'Alex',
      Age: 21,
      Phone: '455 - 983 - 0912',
      Address: '456 Rd, San Francisco, CA, 94012'
    },
    {
      'Student Name': 'Josh',
      Age: 22,
      Phone: '455 - 345 - 0912',
      Address: '789 Dr, Newark, CA, 94016'
    },
    {
      'Student Name': 'Matt',
      Age: 23,
      Phone: '321 - 345 - 0912',
      Address: '223 Dr, Sunnyvale, CA, 94016'
    }
  ]
}
// data for P2
const list = ['HTML', 'JavaScript', 'CSS', 'React', 'Redux', 'Java']
// data for P3
const dropDownList = [
  { value: 'newark', content: 'Newark' },
  { value: 'santaClara', content: 'Santa Clara' },
  { value: 'unionCity', content: 'Union City' },
  { value: 'albany', content: 'Albany' },
  { value: 'dalyCity', content: 'Daly City' },
  { value: 'sanJose', content: 'San Jose' }
]
// data variable name "xx" -> data class name "xx-wrapper"
const dataName2ClassName = new Map([
  ['tableInfo', 'table-info-wrapper'],
  ['list', 'list-wrapper'],
  ['dropDownList', 'drop-down-list-wrapper']
])

// add the respective class name to every "solution-content" div
Array.from(document.getElementsByClassName('solution-content')).forEach((ele, index) => {
  switch (index) {
    case 0:
      ele.classList.add(dataName2ClassName.get('tableInfo'))
      break
    case 1:
      ele.classList.add(dataName2ClassName.get('list'))
      break
    case 2:
      ele.classList.add(dataName2ClassName.get('dropDownList'))
      break
  }
})

// a general helper function to append child nodes to a "solution-content" div
const addNodes = (dataName, nodes) => {
  document.querySelector('.' + dataName2ClassName.get(dataName)).append(...nodes)
}

// P1
const createThead = tableHeader => {
  const thead = document.createElement('thead')
  const tr = document.createElement('tr')

  tableHeader.forEach(header => {
    const th = document.createElement('th')
    th.textContent = header
    tr.appendChild(th)
  })

  thead.appendChild(tr)

  return thead
}

const createTbody = tableContent => {
  const tbody = document.createElement('tbody')

  tableContent.forEach((student) => { // or object destructuring: { 'Student Name': name, Age: age, Phone: phone, Address: address }
    const tr = document.createElement('tr')

    for (const prop in student) {
      const td = document.createElement('td')
      td.textContent = student[prop]
      tr.appendChild(td)
    }

    tbody.appendChild(tr)
  })

  return tbody
}

// eslint-disable-next-line no-unused-vars
const p1 = ((dataName = 'tableInfo') => {
  const table = document.createElement('table')
  table.className = 'info-table' // for styling

  table.appendChild(createThead(tableInfo.tableHeader))
  table.appendChild(createTbody(tableInfo.tableContent))

  const nodes = [table]

  addNodes(dataName, nodes)
})()

// P2
// eslint-disable-next-line no-unused-vars
const p2 = ((dataName = 'list') => {
  const [spanOLText, spanULText] = ['An ordered technologies list', 'An unordered technologies list']

  const spanOL = document.createElement('span')
  spanOL.textContent = spanOLText
  const spanUL = document.createElement('span')
  spanUL.textContent = spanULText
  const ol = document.createElement('ol')
  const ul = document.createElement('ul')

  list.forEach(lang => {
    const li = document.createElement('li')
    li.textContent = lang
    ol.appendChild(li.cloneNode(true))
    ul.appendChild(li)
  })

  const nodes = [spanOL, ol, spanUL, ul]

  addNodes(dataName, nodes)
})()

// P3
// eslint-disable-next-line no-unused-vars
const p3 = ((dataName = 'dropDownList') => {
  const select = document.createElement('select')
  select.name = 'city'

  dropDownList.forEach(({ value, content }) => {
    const option = document.createElement('option')
    option.value = value
    option.textContent = content // text
    select.appendChild(option)
  })

  const nodes = [select]

  addNodes(dataName, nodes)
})()
