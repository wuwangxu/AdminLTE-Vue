<template>
  <div id="tableTest" class="content-wrapper" style="min-height:auto">
    <div class="row">
      <div class="col-xs-12" style="height:100%">
        <div class="box" style="height:100%">
          <div class="box-header">
            <h3 class="box-title">Hover Data Table</h3>
            <div class="pull-right">
              <button class="btn btn-primary btn-sm fa fa-plus" data-toggle="modal" data-target="#tableModal"> 新增</button>
            </div>
          </div>
          <!-- /.box-header -->
          <div class="box-body" style="height:100%;">
            <table id="example2" class="table table-bordered table-hover" style="height:100%;">
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
                    <button class="btn btn-primary btn-sm fa fa-edit" title="编辑"></button>
                    <button class="btn btn-danger btn-sm fa fa-bitbucket" title="删除"></button>
                  </td>
                </tr>
              </tbody>
            </table>
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
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
                        <option>option 1</option>
                        <option>option 2</option>
                        <option>option 3</option>
                        <option>option 4</option>
                        <option>option 5</option>
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
            <button type="button" class="btn btn-default" data-dismiss="modal">取 消</button>
            <button type="button" class="btn btn-primary">保 存</button>
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
          code:'',
          name:'',
          isTop:"1",
          parent:'',
          remarks:'',
          sort:''
        }
      }
    },
    methods:{
      //获取数据
      getData(){
        this.axios.get(this.globalUrl+'bgoodstype/queryBGoodsTypeByPaginationWithoutAuth',{})
        .then((res)=>{
          if (res.status === 200){
            this.tableData = res.data.rows;
          }else{
            alert(res.statusText);
          }
        }).catch((err)=>{
          alert(err);
        });
      }
    },
    mounted() {
      //表格配置
      $(function () {
        $('#example2').DataTable({
          'paging'      : true,
          'lengthChange': false,
          'searching'   : false,
          'ordering'    : false,
          'info'        : false,
          'autoWidth'   : true,
          'language': {
            'zeroRecords': '暂无数据'
          }
        })
      });
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
  #example2_wrapper{height:100%;}
  #example2_wrapper>.row:nth-child(2){height:calc(100% - 100px);}
</style>
