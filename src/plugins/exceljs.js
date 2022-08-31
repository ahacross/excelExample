import ExcelJS from 'exceljs'

export async function exportExcel(filename, columns, data) {
  const workbook = new ExcelJS.Workbook()

  // 생성자
  workbook.creator = '작성자'

  // 최종 수정자
  workbook.lastModifiedBy = '최종 수정자'

  // 생성일(현재 일자로 처리)
  workbook.created = new Date()

  // 수정일(현재 일자로 처리)
  workbook.modified = new Date()

  const worksheet = workbook.addWorksheet(filename)
  worksheet.columns = columns
  data.forEach(item => {
    worksheet.addRow(item)
  })

  const wbdata = await workbook.xlsx.writeBuffer()
  const blob = new Blob([wbdata], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `${filename}.xlsx`
  anchor.click()
  URL.revokeObjectURL(url)
}
