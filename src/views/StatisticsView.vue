<template>
  <div class="container">
    
    <Statistics />
  </div>
</template>

<script>
import Statistics from '../components/Statistics.vue'

export default {
  name: 'StatisticsView',
  components: {
    Statistics
  }
}
</script>

<style scoped>
.container {
  text-align: center;
}
</style>