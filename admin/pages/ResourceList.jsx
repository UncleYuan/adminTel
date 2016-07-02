
var React = require('react');
var PubSub=require('PubSubJS');


var Modal = require('../components/Modal');
var Pager = require('../components/Pager');
var Alert = require('../components/Alert');
var RenderForm = require('../components/RenderForm');
var $=require('jquery');
require('../lib/jqExtend');
var deepCopy= function(source) { 
  var result={};
  for (var key in source) {
    result[key] = typeof source[key]==='object'?deepCopy(source[key]):source[key];
  } 
  return result; 
}
var ymData = {
    "rule": {
        "field": "rule",
        "name": "接口规则，参考thinkphp路由定义",
        "defaultValue": "",
        "type": "input"
    },
    "address": {
        "field": "address",
        "name": "接口指向的控制器，格式：模块/控制器/方法",
        "defaultValue": "",
        "type": "input"
    },
    "name": {
        "field": "name",
        "name": "接口名称",
        "defaultValue": "",
        "type": "input"
    },
    
    "remark": {
        "field": "remark",
        "name": "备注",
        "defaultValue": "",
        "type": "textarea"
    },
    "options": {
        "field": "options",
        "name": "路由选项",
        "defaultValue": "",
        "type": "textarea"
    },
    "is_public": {
        "field": "is_public",
        "name": "是否是公开接口",
        "defaultValue": "",
        "type": "radio",
        "inline": true,
        "options": [{
            "name": "否",
            "value": 0
        }, {
            "name": "是",
            "value": 1
        }]
    }
}

var apiData=deepCopy(ymData);

apiData["method"]={
          "field": "method",
          "name": "接口请求类型",
          "defaultValue": "",
          "type": "radio",
          "inline": true,
          "options": [{
              "name": "GET",
              "value": "get"
          }, {
              "name": "POST",
              "value": "post"
          }, {
              "name": "DELETE",
              "value":"delete"
          },{
              "name": "PUT",
              "value":"put"
          },{
              "name": "HEAD",
              "value":"head"
          }]
      };
var qtData = {
    "name": {
        "field": "name",
        "name": "接口名称",
        "defaultValue": "",
        "type": "input"
    },

    "remark": {
        "field": "remark",
        "name": "备注",
        "defaultValue": "",
        "type": "textarea"
    }
}

var formData={

        
        "type": {
            "field": "type",
            "name": "资源类型",
            "defaultValue": "1",
            "type": "tab",
            "options": [
                { 
                    "name": "页面",
                    "value":1,
                    "child":ymData
                },
                {
                    "name": "接口",
                    "value": 2,
                    "child": apiData
                },
                {
                    "name": "其他",
                    "value": 3,
                    "child":qtData
                }
            ]
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

          formData:formData
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
   formType:"add",
   eidtColumn:function(id){
      var _this=this;
      $.get('/system/resource/'+id+'.do',function(data){
        if(data.data.type==1){
          var nowData=deepCopy(ymData);
          for(var i in data.data){
            if(nowData[i])nowData[i].defaultValue=data.data[i]
          }
        }else if(data.data.type==2){
          var nowData=deepCopy(apiData);
          for(var i in data.data){
            if(nowData[i])nowData[i].defaultValue=data.data[i]
          }
        }else if(data.data.type==3){
          var nowData=deepCopy(qtData);
          for(var i in data.data){
            if(nowData[i])nowData[i].defaultValue=data.data[i]
          }
        }
        nowData["type"]={
          "field": "type",
          "name": "资源类型",
          "defaultValue":data.data.type,
          "type": "hidden"
        }
        nowData["id"]={
          "field": "id",
          "name": "",
          "defaultValue":id,
          "type": "hidden"
        }
        _this.formType="eidt";
        _this.setState({formData:nowData})
        _this.toggleModal();
      },'json')
      
   },
   toggleModal:function(){
    this.setState({modalShow:!this.state.modalShow})
   },
   addColumn:function(){
      this.formType="add";
      this.setState({formData:formData,modalShow:!this.state.modalShow})

   },
   setEidtForm:function(data){
    var _this=this;
    var url="";
    if(_this.formType=="add"){
      if(data.type==1){
        url="/system/resource/page.do";
      }else if(data.type==2){
        url="/system/resource/api.do";
       
      }else if(data.type==3){
        url="/system/resource/other.do";  
      }
    }else{
      url="/system/resource/"+data.id+".do"
    }
    delete data.type;
    $.ajax({
      url:url,
      type:_this.formType=="add"?"post":"put",
      data:data,
      success:function(data){
        alert(data.info);

        if(data.code!="SUCCESS"){
          _this.setState({formData:_this.state.formData})
        }else{
          _this.toggleModal();

          _this.upData(function(){
            
          });
        }
      }
    })
   },
   
   removeItem:function(id){

      var _this=this;
        Alert.show({
            cont:<div className="fs20">确认是否要删除id为 {id} 的资源？</div>,
            btnOptions:[
                {
                    txt:"确认删除",
                    type:'warning',
                    onCli:function(closeFn){
                        $.ajax({
                            url:'/system/resource/'+id+'.do',
                            type: 'DELETE',
                            success:function(data){
                              if(data.code=="SUCCESS"){
                                closeFn();
                                _this.upData();
                              }
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
                            <a href="javascript:;" onClick={this.addColumn} className="btn btn-info">添加资源</a>
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
                                                        <a href="javascript:;" onClick={this.eidtColumn.bind(this,obj.id)} className="btn btn-sm btn-info">更新资源</a>
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