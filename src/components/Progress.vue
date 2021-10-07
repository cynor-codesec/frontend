<template>
  <div id="row">
    <div  class="padding-0" sm="3">
      <img src="@/assets/prog-fill.png" alt="progress bar" />
    </div>
    <div class="padding-0" sm="3">
      <img v-if="step >= 2" src="@/assets/prog-fill.png" alt="progress bar" />
      <img v-else src="@/assets/prog-empty.png" alt="progress bar" />
    </div>
    <div class="padding-0" sm="3">
      <img v-if="step >= 3" src="@/assets/prog-fill.png" alt="progress bar" />
      <img v-else src="@/assets/prog-empty.png" alt="progress bar" />
    </div>
    <div class="padding-0" sm="3">
      <img v-if="step == 4" src="@/assets/prog-fill.png" alt="progress bar" />
      <img v-else src="@/assets/prog-empty.png" alt="progress bar" />
    </div>
  </div>
</template>

<script>
export default {
    props: ['step']
}
</script>
<style scoped>
#row {
    display: flex;
    justify-content: center;
}
#row div{
    padding: 20px 10px;
}
img {
    width: 140px;
}
</style>