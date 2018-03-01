<template>
  <div id="tableTest" class="content-wrapper" style="min-height:auto">
    <div class="row">
      <div class="col-xs-12" style="height:100%">
        <div class="box" style="height:100%">
          <div class="overlay" v-show="tableLoading === true">
            <i class="fa fa-spinner fa-pulse"></i>
          </div>
          <div class="box-header">
            <h3 class="box-title">TableTest 1</h3>
            <div class="pull-right">
              <button class="btn btn-primary btn-sm fa fa-plus" data-toggle="modal" data-target="#tableModal" @click="getAllData"> 新增</button>
            </div>
          </div>
          <!-- /.box-header -->
          <div class="box-body" style="height:100%;">
            <table id="example2" class="table table-bordered table-hover" style="">
              <thead>
              <tr>
                <th>编号</th>
                <th>名称</th>
                <th>级别</th>
                <th>备注</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody style="height:100%;">
              <tr v-for="(item,index) in tableData">
                <td>{{item.code}}</td>
                <td>{{item.name}}</td>
                <td>{{item.isTop==='1'?'一级':'二级'}}</td>
                <td>{{item.remarks}}</td>
                <td>
                  <a class="btn btn-primary btn-sm fa fa-edit" title="编辑" @click="edit(item)" data-toggle="modal" data-target="#tableModal2"></a>
                  <a class="btn btn-danger btn-sm fa fa-bitbucket" title="删除" @click="del(item.businessId)"></a>
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

    <!-- modal -->
    <div class="modal fade" id="tableModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="resetForm">
              <span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">新增弹出框</h4>
          </div>
          <div class="modal-body">
            <!-- Horizontal Form -->
            <div class="box box-info">
              <!-- form start -->
              <form class="form-horizontal">
                <div class="box-body">
                  <div class="form-group">
                    <label for="code" class="col-sm-2 control-label">编号</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="code" placeholder="请输入编号" v-model="tableForm.code">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="name" class="col-sm-2 control-label">名称</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="name" placeholder="请输入名称" v-model="tableForm.name">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label">一级</label>
                    <div class="col-sm-10 radio">
                      <label>
                        <input type="radio" name="optionsRadios" v-model="tableForm.isTop" value="1">是
                      </label>
                      <label style="margin-left:1rem">
                        <input type="radio" name="optionsRadios" v-model="tableForm.isTop" value="0">否
                      </label>
                    </div>
                  </div>
                  <div class="form-group" v-show="tableForm.isTop === '0'">
                    <label class="col-sm-2 control-label">父级</label>
                    <div class="col-sm-10">
                      <select class="form-control" v-model="tableForm.parent">
                        <option v-for="(item,index) in levelParent" :value="item.businessId">{{item.name}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="sort" class="col-sm-2 control-label">排序</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="sort" placeholder="请输入排序号" v-model="tableForm.sort">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label">备注</label>
                    <div class="col-sm-10">
                      <textarea class="form-control" rows="3" placeholder="请输入备注" v-model="tableForm.remarks"></textarea>
                    </div>
                  </div>
                </div>
                <!-- /.box-body -->
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal" @click="resetForm">取 消</button>
            <button type="button" class="btn btn-primary" @click="add">保 存</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>

    <!-- modal -->
    <div class="modal fade" id="tableModal2">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="resetForm">
              <span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">修改弹出框</h4>
          </div>
          <div class="modal-body">
            <!-- Horizontal Form -->
            <div class="box box-info">
              <!-- form start -->
              <form class="form-horizontal">
                <div class="box-body">
                  <div class="form-group">
                    <label for="code2" class="col-sm-2 control-label">编号</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="code2" placeholder="请输入编号" v-model="tableForm.code">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="name2" class="col-sm-2 control-label">名称</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="name2" placeholder="请输入名称" v-model="tableForm.name">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label">一级</label>
                    <div class="col-sm-10 radio">
                      <label>
                        <input type="radio" name="optionsRadios" v-model="tableForm.isTop" value="1">是
                      </label>
                      <label style="margin-left:1rem">
                        <input type="radio" name="optionsRadios" v-model="tableForm.isTop" value="0">否
                      </label>
                    </div>
                  </div>
                  <div class="form-group" v-show="tableForm.isTop === '0'">
                    <label class="col-sm-2 control-label">父级</label>
                    <div class="col-sm-10">
                      <select class="form-control" v-model="tableForm.parent">
                        <option v-for="(item,index) in levelParent" :value="item.businessId">{{item.name}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="sort2" class="col-sm-2 control-label">排序</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="sort2" placeholder="请输入排序号" v-model="tableForm.sort">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label">备注</label>
                    <div class="col-sm-10">
                      <textarea class="form-control" rows="3" placeholder="请输入备注" v-model="tableForm.remarks"></textarea>
                    </div>
                  </div>
                </div>
                <!-- /.box-body -->
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal" @click="resetForm">取 消</button>
            <button type="button" class="btn btn-primary" @click="modify">保 存</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
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
          isTop:'1',
          parent:'',
          remarks:'',
          sort:''
        },
        levelParent:[], //父级
        tableLoading:false,
        pages:'', //分页
        pageNu:1,
        pageSize:10
      }
    },
    methods:{
      //获取数据
      getData(){
        this.tableLoading = true;
        this.adminUtil.ajaxGetUtil('bgoodstype/queryBGoodsTypeByPaginationWithoutAuth',{
            //params
            rows:this.pageSize,
            page:this.pageNu
          },res=>{
            this.tableData = res.rows;
            this.tableLoading = false;
            this.pages = res.pages;
          },err=>{
            console.log(err);
            this.tableLoading = false;
          }
        )
      },
      //获取全部数据
      getAllData(){
        this.adminUtil.ajaxGetUtil('bgoodstype/queryBGoodsTypeByPaginationWithoutAuth',{
            //params
            rows:999,
            page:this.pageNu
          },res=>{
            this.levelParent = [];
            for (let i=0;i<res.rows.length;i++){
              if (res.rows[i].isTop ==="1"){
                this.levelParent.push(res.rows[i]);
              }
            }
          },err=>{
            console.log(err);
          }
        )
      },
      //新增
      add(){
        this.adminUtil.ajaxPostUtil('bgoodstype/add',{
          businessId:this.tableForm.businessId,
          code:this.tableForm.code,
          name:this.tableForm.name,
          isTop:this.tableForm.isTop,
          parentId:this.tableForm.parent,
          remarks:this.tableForm.remarks
        },res=>{
          if (res.code===200){
            alert('操作成功!');
            //清空表单
            this.resetForm();
            $('#tableModal').modal('hide');
            this.getData();
          }
        },err=>{
          console.log(err);
        })
      },
      //删除
      del(id){
        let _this = this;
        this.adminUtil.ajaxDeleteUtil('bgoodstype/delete'+'/'+id,{
          // params
        },res=>{
          if (res.code===200){
            alert('删除成功!');
            _this.getData();
          }else{
            alert('删除失败!');
          }
        },err=>{
          alert('网络错误!');
        })
      },
      //修改
      edit(item){
        this.tableForm.businessId = item.businessId;
        this.tableForm.code = item.code;
        this.tableForm.name = item.name;
        this.tableForm.isTop = item.isTop;
        this.tableForm.sort = item.seq;
        this.tableForm.parent = item.parentId;
        this.tableForm.remarks = item.remarks;
      },
      modify(){
        this.adminUtil.ajaxPutUtil('bgoodstype/update/'+this.tableForm.businessId,{
          businessId:this.tableForm.businessId,
          code:this.tableForm.code,
          name:this.tableForm.name,
          isTop:this.tableForm.isTop,
          parentId:this.tableForm.parent,
          remarks:this.tableForm.remarks
        },res=>{
          if (res.code===200){
            alert('修改成功!');
            this.getData();
            $('#tableModal2').modal('hide');
            this.resetForm();
          }else{
            alert('修改失败!');
          }
        },err=>{
          alert('网络错误!');
        });
      },
      //表单重置
      resetForm(){
        this.tableForm.businessId = '';
        this.tableForm.code = '';
        this.tableForm.name = '';
        this.tableForm.isTop = '1';
        this.tableForm.parent = '';
        this.tableForm.remarks = '';
        this.tableForm.sort = '';
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
  #tableTest{height:calc(100% - 30px);}
  #tableTest tbody{min-height:300px;}
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
  #tableTest>.row {
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
