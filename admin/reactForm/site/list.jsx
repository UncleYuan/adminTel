require('/site/public');
var React = require('react');
var PubSub=require('/lib/PubSubJS');
window.PubSub=PubSub;

var Modal = require('/components/Modal');
var Alert = require('/components/Alert');
var RenderForm = require('/components/RenderForm');
require('/lib/jquery');
require('/lib/jqExtend');

var res={
    "code": "SUCCESS",
    "info": "操作成功",
    "data": {
        "_id":{
            "field": "_id",
            "defaultValue":"",
            "type": "hidden"
        },
        "top_id": {
            "field": "top_id",
            "defaultValue":"",
            "type": "hidden"
        },
        "re_id": {
            "field": "re_id",
            "defaultValue":"",
            "type": "hidden"
        },
        "typename": {
            "field": "typename",
            "name": "栏目名称",
            "remark": "36最多个字符个汉字",
            "required": "1",
            "defaultValue": "",
            "type": "input",
            "length": "200"
        },
        "isPage": {
            "field": "isPage",
            "name": "是否为单页",
            "remark": "",
            "defaultValue": "0",
            "type": "tab",
            "options": [
                {
                    "name": "否",
                    "value":0,
                    "child": {
                      
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

var typeTree= function(result, re_id){
   var rtn = [];
   var i;   
   for(i in result){               
      if(result[i].re_id+'' == re_id+'') {
         result[i].children = typeTree(result, result[i]._id);
         rtn.push(result[i]);
      } 
   }
   return rtn;
}
var typeInitHtml= function(arr,l){
   l=parseInt(l);
   var li=[];
   var txt='';
   for(var x=0;x<l;x++){
      if(x==0){
         txt+='├';
      } 
      txt+='──';
   }
   for(var i=0;i<arr.length;i++){ 
      var dan='列表';
      ze= <a key={i} className="btn btn-sm btn-info"  href="javascript:;" onClick={this.addColumn.bind(this,arr[i]._id,arr[i].top_id)}>增加子栏目</a>;
      if(arr[i].isPage=='1'){
         dan='单页';
         ze='';
      }
      arr[i].top_id=arr[i].top_id==0?arr[i]._id:arr[i].top_id;
      if(arr[i].children.length>0){ 
         li.push(
            <tr key={i} data-lv={l}>
               <td>
                  <div className="checkbox">
                     <input name="select" className="select-box"  type="checkbox" /></div>
               </td>
               <td>{txt+" "}<a className="h5" href={"/admin/article_type_add?_id="+arr[i]._id} >{arr[i].typename}</a></td>
               <td>{arr[i]._id}</td>
               <td>{dan}</td>
               <td>
                  <div className="btn-group">
                     <a className="btn btn-sm btn-success" href="javascript:;" onClick={this.eidtColumn.bind(this,arr[i]._id)}>编辑</a>{ze}
                     <a className="btn btn-sm btn-danger" href="javascript:;" onClick={this.delColumn.bind(this,arr[i]._id,arr[i].typename)} >删除</a>
                  </div>
               </td>
            </tr>,
            this.typeInitHtml(arr[i].children,l+1)
         );
      }else{ 
         txt=txt.replace('├─','└─');
         li.push(
         <tr key={i} data-lv={l}>
            <td><input name="select" className="select-box"  type="checkbox" /></td>
            <td>{txt+" "}<a className="h5" href="javascript:;" >{arr[i].typename}</a></td>
            <td>{arr[i]._id}</td>
            <td>{dan}</td>
            <td>
              <div className="w190">
               <div className="btn-group">
                  <a className="btn btn-sm btn-success" href="javascript:;"  onClick={this.eidtColumn.bind(this,arr[i]._id)}>编辑</a>
                  {ze}
                  <a className="btn btn-sm btn-danger" href="javascript:;"  onClick={this.delColumn.bind(this,arr[i]._id,arr[i].typename)}>删除</a>
                  </div>
                  </div>
               </td>
            </tr>
         );
      }
   } 
   return li;
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
          allHtml:[],
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
   typeInitHtml:typeInitHtml,
   upData:function(callback){
      var _this=this;
      $.post('/admin/article_type_list',{api:1},function(data){
         var resetJson=typeTree(data.data.arc_type,'0');
         _this.setState({allHtml:_this.typeInitHtml(resetJson,'0')})
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
   render: function () {

    return (
      <section className="panel">
         <Alert  yesFn={this.DelYesFn} ></Alert>
         <Alert name="setFormAlert"  yesFn={this.setFormFn} >

         </Alert>
         <header className="panel-heading">
            所有栏目
         </header>
         <div className="panel-body">
            <div className="btn-group">
               <a href="/admin/article_type_add" className="btn btn-default" >添加栏目</a>
               <button className="btn btn-default" type="button">删除选择栏目</button>
 
            </div>
            <div id="column-table">                   

               <Modal title="编辑栏目" maxWidth="1000" show={this.state.modalShow} onClose={this.toggleModal} name="eidtModal">

                  <RenderForm rendData={this.state.formData}  getSubVal={this.setEidtForm} name="eidtForm"/>
               </Modal>   
               <div className="table-responsive"  >          
                 <table className="table mt20 table-striped">
                    <thead>
                       <tr>
                          <th><input name="select" className="select-box" value="all" type="checkbox" /></th>
                          <th>栏目名</th>
                          <th>id</th>
                          <th>类型</th>
                          <th>操作</th>
                       </tr>
                    </thead>
                    <tbody >
                       {this.state.allHtml}
                    </tbody>
                 </table>
               </div>
            </div>
         </div>
      </section>
    );
  }
})


React.render(
   <MainCont />,
   document.getElementById('main')
); 