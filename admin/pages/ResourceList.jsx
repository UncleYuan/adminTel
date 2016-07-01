
var React = require('react');
var PubSub=require('PubSubJS');


var Modal = require('../components/Modal');
var Pager = require('../components/Pager');
var Alert = require('../components/Alert');
var RenderForm = require('../components/RenderForm');
var $=require('jquery');
require('../lib/jqExtend');

var res={
    "code": "SUCCESS",
    "info": "操作成功",
    "data": {
        "id":{
            "field": "_id",
            "defaultValue":"",
            "type": "hidden"
        },
        
        "isPage": {
            "field": "type",
            "name": "资源类型",
            "remark": "",
            "defaultValue": "0",
            "type": "tab",
            "options": [
                {
                    "name": "否",
                    "value":0,
                    "child": {
                      "content": {
                          "field": "content",
                          "name": "图文介绍",
                          "remark": "",
                          "required": "1",
                          "defaultValue": "",
                          "type": "html",
                          "length": "6000"
                      }
                    }
                },
                {
                    "name": "是",
                    "value": 1,
                    "child": {
                       "content": {
                          "field": "content",
                          "name": "图文介绍",
                          "remark": "",
                          "required": "1",
                          "defaultValue": "",
                          "type": "html",
                          "length": "6000"
                      }
                    }
                }
            ]
        }
    }
}


var MainCont=React.createClass({
   getDefaultProps:function(){
      return {
            name:"table",
            tableBase:[],
            ifBindSP:true
        };
   },
   getInitialState:function(){
      return {
          loading:false,
          tableBase:this.props.tableBase,
          editFormShow:false,
          modalShow:false,
          rendData:[],
          selArr:[],
          page:{
            page_count:0,
            page_index:1,
            record_count:0
          },
          len:10,
          formData:res.data
      };
   },
   componentWillReceiveProps:function(nextProps){

      if(nextProps.tableBase!=this.state.tableBase){
         this.setState({tableBase:nextProps.tableBase});
      }
   },
   componentDidMount: function () {
   this.upData();
    if(this.props.ifBindSP&&PubSub){
      this.pubsub_token = PubSub.subscribe(this.props.name, function (evename,stateObj) {
        this.setState(stateObj);
      }.bind(this));
    }
   },
   componentWillUnmount: function () {
    if(this.props.ifBindSP&&PubSub){
      PubSub.unsubscribe(this.pubsub_token);
    }
   },
   upData:function(callback){
      var _this=this;
      $.get('/system/resource.do',{page:this.state.page.page_index,len:this.state.len},function(data){
         _this.setState({rendData:data.data,page:data.page})
         if(callback) callback();
      },'json')
   },

   turnAjaxData:function(nowData,typeData){
      for(var i in typeData){
          if(nowData[i]&&nowData[i].type!="tab"){
            nowData[i].defaultValue=typeData[i];
          }else if(nowData[i]&&nowData[i].type=="tab"){
              nowData[i].defaultValue=typeData[i];
              for(var h in nowData[i].options){
                for(var x in typeData){
                  if(nowData[i].options[h].child[x]){
                    nowData[i].options[h].child[x].defaultValue=typeData[x];
                  }
                  
                }
              }
          }
      }
      return nowData;
   },
   eidtColumn:function(id){
      var _this=this;
      $.get('/admin/article_type_add',{api:1,_id:id},function(data){
        var typeData=data.data.nowType;
        var nowData=_this.state.formData;
        _this.turnAjaxData(nowData,typeData);
        _this.setState({formData:nowData})

      },'json')
      this.toggleModal();
   },
   toggleModal:function(){
    this.setState({modalShow:!this.state.modalShow})
   },
   addColumn:function(){
      
   },
   setEidtForm:function(data){
    var _this=this;
    $.post('/admin/article_type_add?api=1',data,function(data){
      alert(data.info);

      if(data.code!="SUCCESS"){
        _this.setState({formData:_this.state.formData})
      }else{
        _this.upData(function(){
          _this.toggleModal();
        });
      }
    },'json')
   },
   DelYesFn:function(){
      var _this=this;
      if(this.delId){
         $.showProgress()
         $.post('/admin/article_type_del',{_id:this.delId,api:1},function(data){
            $.toast({msg:data.info});
            $.hideProgress();
            if(data.code=="SUCCESS"){
               PubSub.publish('Alert',{show:false});
               _this.upData();
            }else{
               
            }
         },'json')
      } 
   },
   delId:false,
   delColumn:function(id,name){
      this.delId=id;
      PubSub.publish('Alert',{show:true,txt:"是否要删除'"+name+"'栏目"});
   },
   removeItem:function(id){


        Alert.show({
            cont:<div className="fs20">确认是否要删除id为 {id} 的资源？</div>,
            btnOptions:[
                {
                    txt:"确认删除",
                    type:'warning',
                    onCli:function(closeFn){
                        $.ajax({
                            url:'/system/resource/'+id+'1231231.do',
                            type: 'DELETE',
                            success:function(data){
                                closeFn();
                                $.toast({msg:data.info})
                            }
                        })
                    }
                },
                {
                }
            ]
        })
        
   },
   render: function () {

    return (
        <div>
            <div className="page-heading">
                <h3>
                        系统资源管理
                    </h3>
                <ul className="breadcrumb">
                    <li>
                        <a href="#">系统管理</a>
                    </li>
                    <li className="active"> 系统资源管理 </li>
                </ul>
                <div className="state-info">
                </div>
            </div>
            <div className="wrapper">
                <section className="panel">
                   
                    <header className="panel-heading">
                       系统资源
                    </header>
                    <div className="panel-body">
                        <div className="btn-group mb15">
                            <a href="javascript:;" onClick={this.toggleModal} className="btn btn-info">添加资源</a>
                            {/*<button className="btn btn-default" type="button">删除所选资源</button>*/}
                        </div>
                        <div id="column-table">
                            <Modal title="编辑资源" maxWidth="1000" show={this.state.modalShow} onClose={this.toggleModal} name="eidtModal">
                                <RenderForm rendData={this.state.formData} getSubVal={this.setEidtForm} name="eidtForm" />
                            </Modal>
                            <div className="table-responsive">
                                <table className="table mt20 table-striped">
                                    <thead>
                                        <tr>
                                            {/*<th>
                                                <input name="select" className="select-box" value="all" type="checkbox" />
                                            </th>*/}
                                            <th>资源id</th>
                                            <th>类型</th>
                                            <th>地址/规则</th>
                                            <th>指向的控制器</th>
                                            <th>请求类型</th>
                                            <th>名称</th>
                                            <th>备注</th>
                                            <th>是否公开资源</th>
                                            <th>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.rendData.map(function(obj,idx){
                                            return(
                                              <tr key={idx}>
                                                {/*<td>
                                                    <input name="select"  className="select-box" value="all" type="checkbox" />
                                                </td> */}
                                                <td>{obj.id}</td>
                                                <td>{obj.type_name}</td>
                                                <td>{obj.rule}</td>
                                                <td>{obj.address}</td>
                                                <td>{obj.method}</td>
                                                <td>{obj.name}</td>
                                                <td>{obj.remark }</td>
                                                <td>{obj.is_public_name}</td>
                                                <td>
                                                    <div className="btn-group mb15">
                                                        <a href="/admin/article_type_add" className="btn btn-sm btn-info">更新资源</a>
                                                        <button className="btn btn-sm btn-default" onClick={this.removeItem.bind(this,obj.id)} type="button">删除资源</button>
                                                    </div>
                                                </td>
                                            </tr>  
                                            );
                                        },this)}
                                    </tbody>
                                </table>

                                <Pager all_num={this.state.page.record_count} all_page_num={this.state.page.page_count} sel_index={this.state.page.page_index} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    );
  }
})


module.exports =MainCont;