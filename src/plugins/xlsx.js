// import FileSaver from 'file-saver'
// import * as XLSX from 'xlsx'
import { utils, writeFileXLSX } from 'xlsx'

function s2ab(s) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0, n = s.length; i < n; i++) {
    view[i] = s.charCodeAt(i) & 0xff
  }
  return buf
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

function xlsxSaver(filename, columns, data) {
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
  })
  // try {
  // const wbout = write(wb, {
  //   bookType: 'xlsx',
  //   bookSST: true,
  //   type: 'binary',
  //   // type: 'array',
  // })
  //   FileSaver.saveAs(
  //     new Blob([s2ab(wbout)], { type: 'application/octet-stream' }),
  //     `${filename}.xlsx`,
  //   )
  // } catch (e) {
  //   console.error(e, wbout)
  // }
  // return wbout
}

export function exportExcel(filename, columns, data) {
  return xlsxSaver(filename, columns, data)
}

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

function setStyle(ws, row = 0, col) {
  utils.sheet_get_cell(ws, row, col).s = cellStyle.header
}
