var React = require('react');
require('/lib/zepto.min');
var InputPosition = React.createClass({
	getDefaultProps:function(){
	    return {
	    	value:"",
        title:"",
        name:"",
        labelClass:"floating-label",
        placeholder:''
	    };
	},
  getInitialState: function() {
      return {
          inputEd:false,
          value:this.props.value,
          textareaHeight:false
        };
    },
  componentWillMount:function(){
    if(this.props.type=="select"){
      this.setState({value:this.props.optionsArr[0].val});
    }
  },
  componentWillReceiveProps:function(nextProps){
    if(nextProps.value!=this.props.value){
      this.setState({value:nextProps.value});
    }
  },
  setPosition:function(){
    var _this=this;
    if(typeof(wx)!="undefined"&&wx.getLocation){
      wx.getLocation({
            success: function (res) {
                $.ajax({
                    type: "POST",
                    url: "/index.php?a=Position",
                    data: "lat="+res.latitude+"&lng="+res.longitude,
                    dataType:'text',
                    success: function(msg){
                        this.setState({value:msg})
                    }
                });
            },
            fail: function (res) {
                alert('无法获取地理位置');
            }
        });
      //this.setState({value:event.target.value});
    }else{
      throw new Error("未检测到微信JS SDK");
    }    
  },
  valChange:function(){

  },
  render: function() {

      var value = this.state.value;
      var cn=value?"item-content focus-state":"item-content";
      var btnText=value?"重新定位":"点击定位";
      var labelClass="item-title "+this.props.labelClass;
      var btnStyle={
        width:"70px",
        margin:"25px 15px 0 0",
        padding:"4px 10px"
      };
	    return (
        <div className="list-block mt0 mb0 inputs-list" >
	    	  <div className={cn}>
            <div className="item-inner" > 
              <div className={labelClass} >{this.props.title}</div>
              <div className="item-input item-input-field">
                <input type="text" ref="textInput" onChange={this.valChange} value={this.state.value} name={this.props.name} placeholder={this.props.placeholder} className="" />;
              </div>
            </div>
            <div className="base-btn fs11 btn" style={btnStyle} onClick={this.setPosition}>{btnText}</div>
          </div>
        </div>
	    );
	}
});

module.exports = InputPosition;