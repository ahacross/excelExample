<template>
  <div ref="grid" />
</template>

<script>
import Grid from 'tui-grid'
import 'tui-grid/dist/tui-grid.css'

export default {
  name: 'tuiGrid',
  props: {
    columns: {
      type: Array,
      // required: true,
      default: () => null,
    },
    data: {
      type: Array,
      // required: true,
      default: () => null,
    },
  },
  data() {
    return {
      grid: null,
    }
  },
  beforeUnmount() {
    this.grid.destroy()
  },
  watch: {
    data() {
      if (this.grid) {
        this.grid.resetData(this.data)
      } else {
        this.init()
      }
    },
  },
  methods: {
    init() {
      const option = {
        el: this.$refs.grid,
        columns: this.columns,
        data: this.data,
        scrollY: true,
        bodyHeight: innerHeight - this.$el.offsetTop - 90,
      }
      this.grid = new Grid(option)
    },
  },
}
</script>

<style scoped src="tui-grid/dist/tui-grid.min.css"></style>
