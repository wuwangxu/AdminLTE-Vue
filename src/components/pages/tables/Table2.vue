<template>
  <div id="tableTest2" class="content-wrapper" style="min-height:auto">
    <div class="row">
      <div class="col-xs-12" style="height:100%">
        <components :is="currentView" @table2DetailEvent="table2DetailEvent" :ref="currentView"></components>
      </div>
    </div>
  </div>
</template>

<script>
  import Table2Detail from '@/components/pages/tables/TableComponents/Table2Detail'
  import Table2Add from '@/components/pages/tables/TableComponents/Table2Add'
  export default {
    name: "table-test",
    data(){
      return {
        currentView:'Table2Detail'
      }
    },
    methods:{
      //处理子组件事件
      table2DetailEvent(type){
        switch(type){
          //新增按钮触发
          case 1:
            this.currentView = 'Table2Add';
            break;
          //新增完成
          case 2:
            this.currentView = 'Table2Detail';
            this.$refs.Table2Detail.getData();
            break;
          //新增取消
          case 3:
            this.currentView = 'Table2Detail';
            break;
        }
      }
    },
    components:{
      Table2Detail,
      Table2Add
    }
  }
</script>

<style>
  #tableTest2{height:calc(100% - 30px);}
  #tableTest2 tbody{min-height:300px;}
  .odd{display:none;}
  .example-modal .modal {
    position: relative;
    top: auto;
    bottom: auto;
    right: auto;
    left: auto;
    display: block;
    z-index: 1;
  }
  .example-modal .modal {
    background: transparent !important;
  }
  #tableTest2>.row {
    height: 100%;
  }
  #example2_wrapper>.row:nth-child(2){height:calc(100% - 100px);}
  .adminAlert{
    position:absolute;
    top:25px;
    right:25px;
    display:none;
  }
  .nav-pageing{
    cursor:pointer;
  }
</style>
