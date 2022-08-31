<template>
  <div style="display: flex; padding-bottom: 10px">
    <button @click="changeData">data 변경</button>
    <button style="flex: 1" @click="onClick">xlsx 다운로드</button>
  </div>
  <grid :columns="columns" :data="data" />
</template>

<script>
import grid from '@/components/grid.vue'
export default {
  name: 'xlsxView',
  components: {
    grid,
  },
  data() {
    return {
      fileName: '엑셀 다운로드',
      columns: [
        {
          header: 'ID',
          name: 'id',
          key: 'id',
        },
        {
          header: 'CITY',
          name: 'city',
          key: 'city',
          editor: 'text',
        },
        {
          header: 'COUNTRY',
          name: 'country',
          key: 'country',
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
      this.$downXlsx(this.fileName, this.columns, this.data)
    },
    changeData() {
      this.data = this.$genData(this.columns, 50)
    },
  },
}
</script>
