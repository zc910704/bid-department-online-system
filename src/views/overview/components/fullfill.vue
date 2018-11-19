<template>
  <ve-liquidfill :data="chartData"/>
</template>
<script>
export default {
  data() {
    return {
      chartData: {
        columns: ['fullfill', 'percent'],
        rows: [
          {
            fullfill: '落实度',
            percent: 0.6
          }
        ]
      }
    }
  }
}
</script>
