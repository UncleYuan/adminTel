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

    this.setState({value:event.target.value});
    if(this.props.valChange){
      this.props.valChange(event.target.value)
    }
  },
  firstHeight:0,
  textareaChange:function(){
    var tH=this.state.textareaHeight;
    if(this.firstHeight==0){
      this.firstHeight=event.target.offsetHeight;
    }
    event.target.style.overflow="hidden";
    event.target.style.height=this.firstHeight+'px';
    tH=event.target.scrollHeight;
    event.target.style.height=tH+'px';
    this.setState({value:event.target.value});
    if(this.props.valChange){
      this.props.valChange(event.target.value)
    }
  },
  selectChang:function(){
     this.setState({value:event.target.value});
  },
  typeHtml:{
    input:function(o){
      return <input type={o.props.ispwd?"password":"text"} className="form-control" ref="textInput" value={o.state.value} onChange={o.change} name={o.props.name}  placeholder={o.props.remark?o.props.remark:''} />;
    },
    textarea:function(o){
      return <textarea type={o.props.ispwd?"password":"text"} className="form-control" ref="textInput" value={o.state.value} onChange={o.textareaChange} name={o.props.name}  placeholder={o.props.remark?o.props.remark:''} ></textarea>;
    },
    select:function(o){
      return  <select name={o.props.name} onChange={o.selectChang} class="form-control m-bot15">
        {o.props.optionsArr.map(function (obj,i) {
          return(
            <option value={obj.val}>{obj.tit}</option>
          );
        })}
      </select>;
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