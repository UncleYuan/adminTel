var React = require('react');
var Modal = require('../components/Modal');
var AlertModal = React.createClass({
  getDefaultProps:function(){
      return {
        show:false,
        title:"系统提示",
        name:"AlertModal"+(new Date()).valueOf(),
        type:"checkbox",
        showClass:'fadeInUp',
        cont:""
      };
  },
  getInitialState: function() {
      return {
          show:this.props.show,
        };
  },
  componentWillReceiveProps:function(nextProps){
    if(nextProps.show!=this.state.show){
      this.setState({show:nextProps.show});
    }
  },
  componentDidMount: function () {
  },
  componentWillUnmount: function () {
    
  },
  closeModal:function(){
    this.setState({show:false});
    if(this.props.onClose){
      this.props.onClose();
    }
  },
  btnClassJson:{
    warning:"warning",
    danger:"danger",
    info:"info",
    def:"default"
  },
  emptyFn:function(){

  },
  getBtnHtml:function(){
    var allBtnHtml=[];

    var btnOptions=this.props.btnOptions;

    if(btnOptions){
        for(var i in btnOptions){
          var btnType=btnOptions[i].type?this.btnClassJson[btnOptions[i].type]:'default';
          var clickFn=btnOptions[i].onCli?btnOptions[i].onCli.bind(this,this.closeModal):this.closeModal;
          allBtnHtml.push(<span key={i} onClick={clickFn} className={"btn-"+btnType+" btn"} >{btnOptions[i].txt||"关闭"}</span>)
        }
    }else{

      allBtnHtml.push(<span key={i} onClick={this.closeModal} className="btn-info btn-block btn">确定</span>)
    }
    
    return allBtnHtml;
  },
  render: function() {
    return (
        <Modal type={this.props.type} show={this.state.show} title={this.props.title} footer={this.getBtnHtml()} w="m" onClose={this.closeModal}>
          {this.props.cont}  
        </Modal>
    )
  }
});


var containerDOM=null;
var Alert={};
var config={}
Alert.show = function (conf) {
  conf=conf||{};
  
  conf.show=true;
  config=conf;
  conf.onClose=function(){
    Alert.Close();
  };
  if (!containerDOM) {
    containerDOM = document.createElement('div');
    document.body.appendChild(containerDOM);
  }
  ReactDOM.render(React.createElement(AlertModal,conf),containerDOM);
};
Alert.Close = function (content, type) {
  config.show=false;
  ReactDOM.render(React.createElement(AlertModal,config),containerDOM);
  setTimeout(function(){
    ReactDOM.render(<div/>,containerDOM);
  },500)
 
 
};
module.exports = Alert;


