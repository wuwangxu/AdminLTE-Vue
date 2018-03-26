<template>
  <div id="tableTest2" style="min-height:auto">
    <div class="row">
      <div class="col-xs-12" style="height:100%">
        <users-info-detail
          v-show="currentView===1"
          @usersInfoDetailEvent="usersInfoDetailEvent"
          ref="usersInfoDetail"></users-info-detail>
        <users-info-add
          v-show="currentView===2"
          ref="usersInfoAdd"
          @usersInfoDetailEvent="usersInfoDetailEvent"></users-info-add>
      </div>
    </div>
  </div>
</template>

<script>
  import UsersInfoDetail from '@/components/pages/tables/TableComponents/UsersInfoDetail'
  import UsersInfoAdd from '@/components/pages/tables/TableComponents/UsersInfoAdd'
  export default {
    name: "table-test",
    data(){
      return {
        currentView:1,
        searchByType:''
      }
    },
    methods:{
      //处理子组件事件
      usersInfoDetailEvent(type){
        switch(type){
          //新增按钮触发
          case 1:
            this.currentView = 2;
            break;
          //新增完成
          case 2:
            this.currentView = 1;
            this.$refs.usersInfoDetail.getData();
            break;
          //新增取消
          case 3:
            this.currentView = 1;
            break;
        }
      }
    },
    components:{
      UsersInfoDetail,
      UsersInfoAdd
    }
  }
</script>

<style>
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
