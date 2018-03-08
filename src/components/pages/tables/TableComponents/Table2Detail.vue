<template>
  <div id="tableTest2" style="min-height:auto">
    <div class="row">
      <div class="col-xs-12" style="height:100%">
        <div class="box" style="height:100%">
          <div class="box-header">
            <h3 class="box-title">TableTest 2</h3>
            <div class="pull-right">
              <button class="btn btn-primary btn-sm fa fa-plus" @click="toAdd">新增</button>
            </div>
          </div>
          <!-- /.box-header -->
          <div class="box-body" style="height:100%;">
            <div class="box-search form">
              <input type="text" class="form-control" placeholder="按名称搜索" v-model="searchByName">
              <select name="selectByTypeName" id="selectByTypeName" class="form-control" v-model="searchByType">
                <option v-for="item in searchTypeOptions" :value="item.businessId">{{item.name}}</option>
              </select>
              <input type="button" value="搜 索" class="btn btn-primary btn-sm" @click="getData">
            </div>
            <table id="example2" class="table table-bordered table-hover" style="">
              <thead>
              <tr>
                <th>编号</th>
                <th>名称</th>
                <th>类型名称</th>
                <th>是否推荐</th>
                <th>备注</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody style="height:100%;">
              <tr v-for="(item,index) in tableData">
                <td>{{item.code}}</td>
                <td>{{item.name}}</td>
                <td>{{item.typeName}}</td>
                <td>{{item.isTj==="1"?'是':'否'}}</td>
                <td>{{item.remarks}}</td>
                <td>
                  <button class="btn btn-primary btn-sm fa fa-edit" title="编辑" @click="edit(item)"></button>
                  <button class="btn btn-warning btn-sm fa fa-cog" title="维护" @click="maintain(item)"></button>
                  <button class="btn btn-danger btn-sm fa fa-bitbucket" title="删除" @click="del(item.businessId)"></button>
                </td>
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
        tableForm:{    //弹出框表单
          businessId:'',
          code:'',
          name:'',
          isTj:'1',
          typeName:'',
          remarks:'',
          sort:''
        },
        typeName:[], //父级
        pages:'', //分页
        pageNu:1,
        pageSize:10,
        searchByName:'',
        searchTypeOptions:[
          {
            businessId:'',
            name:'---按类型搜索---'
          }
        ],
        searchByType:''
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
        this.adminUtil.ajaxGetUtil('bgoods/queryBGoodsByPaginationWithoutAuth',{
            //params
            rows:this.pageSize,
            page:this.pageNu,
            sort:'code desc',
            name:this.searchByName,
            typeId:this.searchByType
          },res=>{
            this.tableData = res.rows;
            this.tableLoading = false;
            this.pages = res.pages;
            loading.close();
          },err=>{
            loading.close();
            this.$notify.error({
              title: '错误',
              message: '网络错误!'
            });
          }
        )
      },
      //获取全部数据
      getAllData(){
        this.adminUtil.ajaxGetUtil('bgoodstype/queryBGoodsTypeByPaginationWithoutAuth',{
            //params
            rows:999,
            page:1
          },res=>{
            //重置 防止重复
            this.searchTypeOptions = [
              {
                businessId:'',
                name:'---按类型搜索---'
              }
            ];
            for (let i=0;i<res.rows.length;i++){
              if (res.rows[i].isTop ==="0"){
                this.searchTypeOptions.push(res.rows[i]);
              }
            }
          },err=>{
            this.$notify.error({
              title: '错误',
              message: '网络错误',
            });
          }
        )
      },
      //新增
      toAdd(){
        this.$emit('table2DetailEvent',1);
      },
      //编辑
      edit(item){
        this.$router.push({
          name:"Table2Edit",
          params:{
            id:item.businessId
          }
        });
      },
      //维护
      maintain(item){
        this.$router.push({
          name:"Table2Maintain",
          params:{
            id:item.businessId
          }
        });
      },
      //删除
      del(id){
        this.$confirm('此操作将删除本条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const loading = this.$loading({
            lock: true,
            text: '正在删除...',
            spinner: 'el-icon-loading',
            background: 'rgba(255,255,255, 0.5)',
          });
          this.adminUtil.ajaxDeleteUtil('bgoods/delete/'+id,{
            id:id
          },res=>{
            loading.close();
            if (res.code===200){
              this.$notify.success({
                title:'提示信息',
                message:res.message,
                duration:2000
              });
              this.getData();
            }else{
              loading.close();
              this.$notify.warning({
                title:'警告',
                message:res.message,
                duration:2000
              });
            }
          },err=>{
            loading.close();
            this.$notify.error({
              title:'错误',
              message:'网络错误',
              duration:2000
            });
          });
        }).catch(() => {});
      },
      //表单重置
      resetForm(){
        let f = this.tableForm;
        f.businessId = '';
        f.code = '';
        f.name = '';
        f.isTj = '1';
        f.parent = '';
        f.remarks = '';
        f.sort = '';
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
      this.getAllData();
    }
  }
</script>

<style>
  #tableTest2{height:calc(100% - 20px);}
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
  .box-search input[type=text],.box-search select{
    width:150px;
    display:inline-block;
    vertical-align:middle;
  }
  .box-search select{cursor:pointer}
  .box-search input[type=button]{
    display:inline-block;
    vertical-align:top;
    height:34px;
  }
  .box-search{margin-bottom:5px}
</style>
