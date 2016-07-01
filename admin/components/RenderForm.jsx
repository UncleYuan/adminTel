var React = require('react');
var InputEle = require('../components/InputEle');
var HtmlInputEle = require('../components/HtmlInputEle');
var CheckRadio = require('../components/CheckRadio');
var SelUpImg = require('../components/SelUpImg');
var SetMobileCont = require('../components/SetMobileCont');
var GetMsgCode = require('../components/GetMsgCode');
var RenderForm = React.createClass({
  getDefaultProps:function(){
      return {
        liNum:false
      };
  },
  getInitialState:function(){
      return {
          loading:true,
          rendData:{},
          openModal:false,
          showUpFile1:false,
          imgList1:[],
          resData:{}
      };
  },
  componentWillMount:function(){
   
    if(this.props.url){
      this.upDataForm();
    }
    if(this.props.rendData){
      this.propsSetForm();
    }
    if(PubSub){
      this.pubsub_token = PubSub.subscribe(this.props.name+'rendForm', function (evename,stateObj) {
        this.setState(stateObj);
      }.bind(this));
    }
  },
  componentWillReceiveProps:function(nextProps){
    if(nextProps.rendData&&nextProps.rendData!=this.state.resData){
      this.propsSetForm();
    }
  },
  upDataForm:function(){
    var _this=this;
    $.get(this.props.url,function(data){
        _this.setState({loading:false,resData:data.data});
      },'json')
  },
  propsSetForm:function(){
    this.setState({loading:false,resData:this.props.rendData});
  },
  goSub:function(e){
    e.preventDefault();
    var _this=this;
    var formDom=$("#"+this.props.name+"Dom");

    var postData=formDom.serializeArray();
    if(this.props.postUrl){
      $.post(this.props.postUrl,postData,function(data){
        alert(data.info);
        if(_this.props.getSubVal) _this.props.getSubVal(postData,data);
      },'json')
    }else{
      _this.props.getSubVal(postData);
    }
  },
  openModal:function(){
    this.setState({openModal:true});
  },
  openUpFile1:function(){
    this.setState({showUpFile1:true});
  },
  asw:function(i){

  },
  getImg1:function(data){
    this.setState({imgList1:data});
  },
  getFormHtml:function(res){
    var rendHtml=[];
    var _this=this;
    var n=0;
    for(var i in res){
      n++;
      var newSelFields=res[i];
      var newArr=this.getComponents(newSelFields,i,n);

      rendHtml=rendHtml.concat(newArr)

    }
    return rendHtml;
  },
  setTab:function(value,arr){

    var newData=this.state.resData;
    newData[arr].defaultValue=value;
    this.setState({resData:newData})
  },
  getComponents:function(newSelFields,i,n){
    var rendHtml=[];
    n=this.props.liNum?n+'.':'';
    if(newSelFields.type=="input"||newSelFields.type=="textarea"||newSelFields.type=="password"||newSelFields.type=="hidden"){
        if(newSelFields.type=="password"){ 
          newSelFields.type="input";
          var x=true;
        }
        rendHtml.push(
          <InputEle key={i} value={newSelFields.defaultValue}  ispwd={x} type={newSelFields.type} ref={newSelFields.field} title={n+newSelFields.name} name={newSelFields.field} />
        );
      }else if(newSelFields.type=="html"){
        rendHtml.push(
          <HtmlInputEle key={i} value={newSelFields.defaultValue}  ref={newSelFields.field} title={n+newSelFields.name} name={newSelFields.field} />
        );
      }else if(newSelFields.type=="video"){
        rendHtml.push(
          <InputEle key={i} value={newSelFields.defaultValue} type="input" ref={newSelFields.field} title={n+newSelFields.name} name={newSelFields.field} />
        );
      }else if(newSelFields.type=="radio"||newSelFields.type=="checkbox"){
        var options=newSelFields.options;
        var newArr=[];
        for(var x in options){
          newArr.push({tit:options[x].name,val:options[x].value})
        }

        rendHtml.push(
        <CheckRadio key={i} inline={newSelFields.inline} selLen={newSelFields.count||1} value={newSelFields.defaultValue} ref={newSelFields.field}  optionsArr={newArr}  type={newSelFields.type} title={n+newSelFields.name}   name={newSelFields.field} />
        );
      }else if(newSelFields.type=="tab"){
        var options=newSelFields.options;
        var newArr=[];
        for(var x in options){
          newArr.push({tit:options[x].name,val:options[x].value})
        }
        rendHtml.push(
        <CheckRadio callBack={this.setTab} selStr={i} key={i} value={newSelFields.defaultValue} ref={newSelFields.field} inline="true"  optionsArr={newArr}  type="radio" title={n+newSelFields.name}   name={newSelFields.field} />
        );
        var  newArr=[]
        for(var h in newSelFields.options){
          for(var x in newSelFields.options[h].child){
            if(newSelFields.defaultValue==h){
              newArr.push(<div >{this.getComponents(newSelFields.options[h].child[x],newSelFields.name,newSelFields.name)}</div>);
            }
          }
        }
        rendHtml=rendHtml.concat(newArr);
      }else if(newSelFields.type=="images"){
        rendHtml.push(
          <SelUpImg key={i} selLen={newSelFields.count} value={newSelFields.defaultValue} ref={newSelFields.field} title={n+newSelFields.name}  name={newSelFields.field} />
        );
      }else if(newSelFields.type=="image_text"){
        rendHtml.push(
          <SetMobileCont  key={i} value={newSelFields.defaultValue} ref={newSelFields.field} title={n+newSelFields.name}  name={newSelFields.field}/>
        );
      }else if(newSelFields.type=="position"){
        rendHtml.push(
          <InputPosition value={newSelFields.defaultValue} key={i} ref={newSelFields.field}  title={n+newSelFields.name}   name={newSelFields.field} />
        );
      }else if(newSelFields.type=="codeInput"){
        rendHtml.push(
          <div className="pb15">
            <InputEle key={i} value={newSelFields.defaultValue} type="input"  title={n+newSelFields.name} name={newSelFields.field} />
            <GetMsgCode postData={newSelFields.data} />
          </div>
        );
      }

      return rendHtml;

  },
    render: function () {
      if(this.state.loading){
        return (<div className="cont-wrap white-bg  mt30 mAuto  tc"><img src="/bcd/images/loading.gif" /></div>)
      }else{

        var allGetHtml=this.getFormHtml(this.state.resData);
          return (
            <div className="">
              <div className="">
              <form id={this.props.name+"Dom"}>
                {allGetHtml}  
                
                  <div className="tc pt30 pb30">
                <button onClick={this.goSub} className="ajax-btn btn-info w200 btn">
                    保存
                </button>
              </div>
          </form>
          </div>
        </div>
          );
        }
    }
});

module.exports = RenderForm;


