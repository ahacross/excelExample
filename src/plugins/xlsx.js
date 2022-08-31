// import FileSaver from 'file-saver'
// import * as XLSX from 'xlsx'
// import { utils, writeFileXLSX } from 'xlsx'
import { utils, writeFileXLSX } from 'xlsx-js-style'

const cellStyle = {
  header: {
    font: {
      bold: true,
    },
    alignment: {
      wrapText: true,
      horizontal: 'center',
      vertical: 'center',
    },
  },
}

function convert(columns, data) {
  const [names, headers, formatters] = columns.reduce(
    (acc, element) => {
      const { name, header, formatter } = element

      acc[0].push(name)
      acc[1].push(header)
      acc[2].push(formatter || null)
      console.log(acc)
      return acc
    },
    [[], [], []],
  )
  console.log(headers)
  const aaa = headers.map(header => {
    return {
      v: header,
      t: 's',
      s: cellStyle.header,
    }
  })
  const convertData = [aaa]
  for (const row of data) {
    const newRow = names.map((name, idx) => {
      const value = row[name] || ''
      const formatter = formatters[idx]

      return value && formatter ? formatter({ value }) : `${value}`
    })
    convertData.push(newRow)
  }
  return convertData
}

export function xlsxSave(filename, columns, data) {
  const convertData = convert(columns, data)
  console.log(convertData)
  const wb = utils.book_new()
  const ws = utils.aoa_to_sheet(convertData)
  const sheetName = filename
  utils.book_append_sheet(wb, ws, sheetName)

  console.log(ws)

  writeFileXLSX(wb, `${filename}.xlsx`, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'binary',
    // type: 'array',
    cellStyles: true,
  })
}
