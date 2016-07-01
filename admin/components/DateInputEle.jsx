var React = require('react');
var InputEle = React.createClass({
	getDefaultProps:function(){
	    return {
	    	value:"",
        title:"",
        name:"",
        type:"input",
        labelClass:"floating-label",
        optionsArr:[],
        valChange:false,
        placeholder:'',
        ispwd:false,
        abs:true
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
  getStateProps:function(){
    if(this.props.getStateProps){
      this.props.getStateProps()
    }
  },
  change:function(){
    console.log(event.target.value)
    this.setState({value:event.target.value});
    if(this.props.valChange){
      this.props.valChange(event.target.value)
    }
  },

  typeHtml:{
    input:function(o){
      var type=this.props.format=="Y-m-d H:i"?"datetime-local":datetime;
      return <input type={type} className="form-control" ref="textInput" value={o.state.value} onChange={o.change} name={o.props.name}  placeholder={o.props.remark?o.props.remark:''} />;
    }
  },
	
  	render: function() {
      if(this.props.type!="hidden"){
        var value = this.state.value;
        var cn=value?"form-group focus":"form-group";
        cn=this.props.abs?cn+" form-item-abs":cn;
        var labelClass="item-tit "+this.props.labelClass;
  	    return (
          <div className={cn}>
            <label >{this.props.title}</label>
            {this.typeHtml[this.props.type](this)}
          </div>
  	    );
      }else{
        return (<input type="hidden"   value={this.state.value}  name={this.props.name} /> );
      }
	}
});

module.exports = InputEle;