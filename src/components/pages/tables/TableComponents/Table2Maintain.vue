<template>
  <div id="maintain">
    <div class="row">
      <div class="col-xs-12" style="height:100%">
        <div class="box" style="height:100%">
          <div class="box-header">
            <h3 class="box-title">Table2 维护页</h3>
            <div class="pull-right">
              <button class="btn btn-primary btn-sm fa fa-plus" @click="add">新增</button>
            </div>
          </div>
          <!-- /.box-header -->
          <div class="box-body" style="height:100%;">
            <table id="example2" class="table table-bordered table-hover" style="height:calc(100% - 100px)">
              <thead>
              <tr>
                <th>编号</th>
                <th>名称</th>
                <th>当前美元</th>
                <th>当前人民币</th>
                <th>目标美元</th>
                <th>目标人民币</th>
                <th>是否推荐</th>
                <th>备注</th>
              </tr>
              </thead>
              <tbody style="height:100%;">
                <span v-show="tableData.length === 0">暂无内容</span>
                <tr v-for="(item,index) in tableData">
                  <td>{{item.code}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.priceSdollar}}</td>
                  <td>{{item.priceSrmb}}</td>
                  <td>{{item.priceDdollar}}</td>
                  <td>{{item.priceDrmb}}</td>
                  <td>{{item.isTj==='1'?'是':'否'}}</td>
                  <td>{{item.remarks}}</td>
                </tr>
              </tbody>
            </table>

            <nav aria-label="..." class="pull-right nav-pageing">
              <ul class="pagination">
                <li class="page-item"
                    :class="{disabled:pageNu===1}"
                    :disabled="pageNu===0"
                    @click="lastTab">
                  <a class="page-link" tabindex="-1">上一页</a>
                </li>
                <li v-for="(item,index) in pages"
                    class="page-item"
                    :class="{active:pageNu===index+1}"
                    @click="toggleTabs(index)">
                  <a class="page-link">{{index+1}}</a>
                </li>
                <li class="page-item"
                    :class="{disabled:pageNu===pages}"
                    :disabled="{disabled:pageNu===pages}"
                    @click="nextTab">
                  <a class="page-link">下一页</a>
                </li>
              </ul>
            </nav>
          </div>
          <!-- /.box-body -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "table-test",
    data(){
      return {
        tableData:[],  //数据
        pages:'', //分页
        pageNu:1,
        pageSize:10
      }
    },
    methods:{
      //获取数据
      getData(){
        const loading = this.$loading({
          lock: true,
          text: '正在读取数据...',
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255, 0.5)',
        });
        this.adminUtil.ajaxGetUtil('bgoodsitem/queryBGoodsItemByPagination',{
            //params
            rows:this.pageSize,
            page:this.pageNu,
            goodsId:1
          },res=>{
            this.tableData = res.rows;
            this.pages = res.pages;
          },err=>{
            this.$notify.error({
              title:'错误',
              message:'网络错误',
              duration:2000
            });
          }
        );
        loading.close();
      },
      //新增
      add(){
        this.$router.push({
          name:"Table2MaintainAdd",
          params:{
            id:this.$route.params.id
          }
        });
      },
      //切换
      toggleTabs(index){
        this.pageNu = index+1;
        this.getData();
      },
      //下一页
      nextTab(){
        if (this.pageNu!==this.pages){
          this.pageNu +=1;
          this.getData();
        }
      },
      //上一页
      lastTab(){
        if (this.pageNu!==1){
          this.pageNu -=1;
          this.getData();
        }
      }
    },
    mounted(){
      //获取数据
      this.getData();
    }
  }
</script>

<style>
  #maintain{
    min-height:auto;
    height:100%;
  }
  #maintain>.row{
    height:100%;
  }
</style>
