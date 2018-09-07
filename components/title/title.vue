<template>
  <div class="vtitle">
    <div class="line"></div>
    <div class="text">{{title}}</div>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    name: "vtitle",
    props: {
      title: String
    }
  }
</script>

<style lang="scss">
  .vtitle {
    display: flex;
    width: 80%;
    margin: 56px auto 48px auto;
    .line {
      flex: 1;
      position: relative;
      top: -12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    .text {
      padding: 0 24px;
      font-size: 24px;
      font-weight: bold;
    }
  }

</style>
