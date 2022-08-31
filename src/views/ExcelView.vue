<template>
  <div style="display: flex; padding-bottom: 10px">
    <button @click="changeData">data 변경</button>
    <button style="flex: 1" @click="onClick">exceljs 다운로드</button>
  </div>
  <grid :columns="columns" :data="data" />
</template>

<script>
import grid from '@/components/grid.vue'
export default {
  name: 'excelView',
  components: {
    grid,
  },
  data() {
    return {
      fileName: '엑셀 다운로드 exceljs',
      columns: [
        {
          header: '이름',
          key: 'name',
          name: 'name',
          type: 'string',
        },
        { header: '나이', key: 'age', name: 'age', type: 'number' },
        { header: '부서코드', key: 'deptCode', name: 'deptCode', type: 'date' },
        {
          header: '부서명',
          key: 'deptName',
          name: 'deptName',
          type: 'string',
          // 스타일 설정
          style: {
            // Font 설정
            font: { size: 10 },
            // Alignment 설정
            alignment: { horizontal: 'center', vertical: 'center' },
          },
        },
      ],
      data: [],
    }
  },
  mounted() {
    this.changeData()
  },
  methods: {
    onClick() {
      this.$downExcel(this.fileName, this.columns, this.data)
    },
    changeData() {
      this.data = this.$genData(this.columns, 150000)
    },
  },
}
</script>
