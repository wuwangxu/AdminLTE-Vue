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
    height:100%;
  }
  #app{
    width:100%;
    height:100%;
  }
</style>
