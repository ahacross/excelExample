export function genData(columns, size) {
  const keys = columns.map(({ key }) => key)
  const funcMap = makeFuncMap(columns)
  const data = []
  for (let i = 0; i < size; i++) {
    data.push(makeRow(keys, funcMap))
  }
  return data
}

function makeRow(keys, funcMap) {
  const row = {}
  keys.forEach(key => {
    row[key] = funcMap.get(key)()
  })
  return row
}

function makeFuncMap(columns) {
  const map = new Map()
  columns.forEach(({ key, type }) => {
    const func =
      type === 'number' ? genNumber : type === 'date' ? genDate : genString

    map.set(key, func)
  })
  return map
}

function genString(num = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

function genNumber() {
  return Math.floor(Math.random() * 100)
}

function genDate() {
  const date = new Date().getTime()
  return new Date(
    date - Math.floor(Math.random() * 10000000000),
  ).toLocaleString()
}

const columns = [
  {
    key: 'name',
    header: '이름',
    type: 'string',
  },
  {
    key: 'deptCode',
    header: '부서코드',
    type: 'string',
  },
  {
    key: 'deptName',
    header: '부서명',
    type: 'string',
  },
  {
    key: 'pay',
    header: '급여',
    type: 'number',
  },
  {
    key: 'joined',
    header: '입사일',
    type: 'date',
  },
]
