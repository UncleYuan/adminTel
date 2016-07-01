var React = require('react');
require('jquery');

var DropdownMenu = React.createClass({
	getDefaultProps:function(){
	    return {
        show:false,
        title:"新窗口",
        type:"checkbox",
        ifBindSP:false,
        btnText:"点击打开",
        small:false,
        showClass:'open',
        className:'',
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
  showModal:function(){
    this.setState({show:true});
    var _this=this;
    $(document).one('click',function(){
      _this.closeModal();
    })
  },
  render: function() {
    var smallClass=this.props.small?" s":"";
      return (
      
        <li className={this.state.show?this.props.showClass+" "+this.props.className:this.props.className} onClick={this.showModal} >
          <a href="javascript:;" className="btn btn-default dropdown-toggle info-number" data-toggle="dropdown">
            {this.props.btnText}
          </a>
          <div className={"dropdown-menu dropdown-menu-head pull-right "+smallClass} >
            <h5 className="title">{this.props.title}</h5>
              {this.props.children}
          </div>
        </li>
    )
	}
});

module.exports = DropdownMenu;


