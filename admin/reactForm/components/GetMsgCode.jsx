var React = require('react');
var UpImgFileM = require('/components/UpImgFileM');
var Modal = require('/components/Modal');
var GetMsgCode=React.createClass({
  getDefaultProps:function(){
      return {
        value:"",
        url:"/index.php?m=System&a=send_sms"
        };
    },
  getInitialState:function(){

      return {
        canClick:true,
        overtime:60

      };
  },
  timer:null,
  goClick:function(){
    var _this=this;
    $.post('/index.php?m=System&a=send_sms',this.props.postData,function(data){
      if(data.code=="SUCCESS"){
        _this.setState({canClick:false});
        _this.timer=setInterval(function(){
          _this.setInterFn();
        },1000);
      }
    },'json');
  },
  setInterFn:function(){
    if(this.state.overtime==1){
      clearInterval(this.timer);
      this.setState({canClick:true,overtime:60});
    }else{
      this.setState({overtime:this.state.overtime-1});
    }
  },
  render: function () {
    var canClick=this.state.canClick;
    return (

      <div className="inline-block" >
         <a className="btn base-btn" onClick={this.goClick} style={{display:(canClick?"inline-block":"none")}}>点击获取验证码</a>
         <a className="btn base-btn" style={{display:(!canClick?"inline-block":"none"),opacity:0.5}}>{this.state.overtime}后可重新发送</a>
      </div>
    );
  }
})

module.exports = GetMsgCode;


