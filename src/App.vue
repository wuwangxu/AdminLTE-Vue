<template>
  <div id="app">
    <router-view keep-alive/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  *{
    margin:0;
    padding:0;
  }
  html,body{
    width:100%;
    height:100% !important;
  }
  #app{
    width:100%;
    height:100%;
  }
  h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6{
    margin:0;
  }
</style>
