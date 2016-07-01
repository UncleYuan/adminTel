var React = require('react');

var Alert = React.createClass({
	getDefaultProps:function(){
	    return {
        name:'Alert',
        show:false,
        title:"系统提示",
        ifBindSP:true,
        cancelBtn:false,
        txt:'',
        size:'m',
        goAjax:false,
        btnTxt:"确认",
        showClass:'fade',
        yesFn:function(){
          return true;
        }
	    };
	},
  getInitialState: function() {
      return {
          show:this.props.show,
          txt:this.props.txt,
          cancelBtn:this.props.cancelBtn,
          goAjax:this.props.goAjax,
          btnTxt:this.props.btnTxt
        };
  },
  componentWillReceiveProps:function(nextProps){
    if(nextProps.show!=this.state.show){
      this.setState({show:nextProps.show});
    }
  },
  componentDidMount: function () {
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
  closeModal:function(){
    this.setState({show:false});
  },
  yesFn:function(){
    var hide=this.props.yesFn(this);
    if(hide){this.closeModal();}
  },
  render: function() {
      var style={display:this.state.show?"block":"none"};
      var bgClass=this.state.show?this.props.showClass+" in":this.props.showClass;
      if(this.state.cancelBtn){
        var cancelBtn=<button className="btn btn-default" onClick={this.closeModal} type="button">取消</button>
      }
      if(this.props.size=="s"){
        var modalClass="modal-sm ";
      }else if(this.props.size=="l"){
        var modalClass="modal-l ";
      }else{
        var modalClass="";
      }
      return (
        <div  className={"modal "+bgClass} style={style} >
            <div className={"modal-backdrop "+bgClass} ></div>
            <div className={"modal-dialog "+modalClass}>
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" onClick={this.closeModal} className="close">×</button>
                        <h4 className="modal-title">{this.props.title}</h4>
                    </div>
                    <div className="modal-body fs20">
                        {this.props.children||this.state.txt}
                    </div>
                    <div className="modal-footer">
                      <button className="btn btn-success" type="button" onClick={this.yesFn}>{this.state.goAjax?"加载中..":this.state.btnTxt}</button>
                      {cancelBtn}
                    </div>
                </div>
            </div>
        </div>
      )
	}
});

module.exports = Alert;


