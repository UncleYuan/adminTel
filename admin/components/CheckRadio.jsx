var React = require('react');
var indexOf = function(arr,val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == val) return i;
  }
  return -1;
};
var removeArr = function(arr,val) {
  var index = indexOf(arr,val);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};
var CheckRadio = React.createClass({
  getDefaultProps:function(){
      return {
        value:"",
        title:"",
        leftHtml:false,
        optionsArr:[],
        chooseArr:[],
        selLen:1000,
        name:"",
        inline:false,
        type:"checkbox",
      };
  },
  getInitialState: function() {
      return {
          inputEd:false,
          textareaHeight:false,
          chooseArr:this.props.chooseArr
        };
    },
  componentWillMount:function(){
    this.chooseReset(this.props.value);
  },
  componentWillReceiveProps:function(nextProps){
    if(nextProps.value!=this.props.value){
      this.chooseReset(nextProps.value);
    }
  },
  chooseReset:function(value){

    var arr=this.props.optionsArr;
      for(var i in arr){
        if(arr[i].val==value){

          this.chooseRadio(i);
          return;
        }
      }
  },
  chooseCheckBox:function(i){
    
    var chooseVal=this.props.optionsArr[i].val;
    var stateArr=this.state.chooseArr;
    var idx=indexOf(stateArr,chooseVal);
    if(idx<0){
      if(this.props.selLen<=stateArr.length) stateArr.shift();
      stateArr.push(chooseVal)

      this.setState({chooseArr:stateArr,value:stateArr.join(',')});
    }else{
      stateArr=removeArr(this.state.chooseArr,chooseVal);
      this.setState({chooseArr:stateArr,value:stateArr.join(',')});
    }
    if(this.props.callBack&&this.props.selStr)this.props.callBack(stateArr.join(','),this.props.selStr);
  },
  chooseRadio:function(i){
    var chooseVal=this.props.optionsArr[i].val;
    var stateArr=this.state.chooseArr;
    var idx=indexOf(stateArr,chooseVal);
    var setVal="";
    if(idx<0){
      setVal=chooseVal;
      this.setState({chooseArr:[chooseVal],value:chooseVal});
    }else{
      this.setState({chooseArr:[],value:""});
    }

    if(this.props.callBack&&this.props.selStr)this.props.callBack(setVal,this.props.selStr);
  },
  typeHtml:{
    checkbox:function(o){  
      return  o.props.optionsArr.map(function (obj,i) {
          var turnClass="iconfont";
          return (

            <div key={i} onClick={o.chooseCheckBox.bind(o,i)}   className="radio-box">
                
              <i className=" iconfont" className={indexOf(o.state.chooseArr,obj.val)>=0?turnClass+" icon-duoxuan base-color":turnClass+" icon-danxuan fuzzy-color"}></i>
                    <div  className="radio-text">
                       {obj.tit}
                    </div>
            </div>
     
          )
        });
    },
    radio:function(o){

      return o.props.optionsArr.map(function (obj,i) {
          var turnClass="iconfont";

          return (
            <div key={i} onClick={o.chooseRadio.bind(o,i)}   className="radio-box">
              <i className=" iconfont" className={indexOf(o.state.chooseArr,obj.val)>=0?turnClass+" icon-xuanze  base-color":turnClass+" icon-danxuan fuzzy-color"}></i>
              <div  className="radio-text">
                {obj.tit}
              </div>
            </div>
            )
        });
    }
  },
  render: function() {
      if(this.props.leftHtml){
        var leftHtml=<span className=" pr10">{this.props.leftHtml}</span>;
      }
      var value = this.state.chooseArr.join(',');
      var cn=value?"form-item form-group focus":"form-item form-group";
      var labelclassName="item-title "+this.props.labelClass;
      var inlineClass=this.props.inline?" inline-radio":"";

      return (
        <div className={cn} >
          {leftHtml}
            <div className="item-input-box">
              <label>{this.props.title}</label>
              <div className={"CheckRadio-box"+inlineClass}>
                <input type="hidden" name={this.props.name}  value={value} />
                <div className="checkRadio">
                   {this.typeHtml[this.props.type](this)}
                </div>
              </div>
          </div>
      </div>
      );
  }
});
module.exports = CheckRadio;


