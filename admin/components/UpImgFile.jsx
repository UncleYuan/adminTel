var React = require('react');
require('/lib/zepto.min');

var UpImgFile = React.createClass({
	getDefaultProps:function(){
	    return {
	    	value:"",
        title:"",
        name:"",
        FileUpArr:[],
        imgArr:[],
        ifBindSP:false,
	    };
	},
  getInitialState: function() {
      return {
          inputEd:false,
          textareaHeight:false,
          FileUpArr:this.props.FileUpArr,
          imgArr:[]
        };
  },

  upIdx:0,
  fileObj:null,
  fileChange:function(){
    
    var file =this.fileObj=event.target.files;
    var setArr=[];
    var _this=this;
    if(file){
      _this.setState({imgArr:[]});
      for(var i=0;i< file.length;i++){
        var reader = new FileReader();
        var tname=file[i].name;
        reader.readAsDataURL(file[i]);
        reader.onload = function(e){ 
          setArr[setArr.length]={
            name:tname,
            src:this.result,
            proc:0
          } 
          _this.setState({FileUpArr:setArr});
          if(setArr.length==file.length){
            _this.fileUpFn(file[0]);
          }
        } 
      } 
    }

    
  },
  componentWillReceiveProps:function(nextProps){

    if(nextProps.imgArr!=this.state.imgArr){
      this.setState({imgArr:nextProps.imgArr});
    }
    if(nextProps.FileUpArr!=this.state.FileUpArr){
      this.setState({FileUpArr:nextProps.FileUpArr});
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
  fileUpFn:function(o){
    var fd=null;
    var _this=this;
    fd=new FormData();
    fd.append("file",o);
    $.ajax({
      url: "/index.php?g=Api&m=Upload&a=upload",
      type: "POST",
      processData: false,
      contentType: false,
      data: fd,
      dataType:'json',
      processData : false, 
      contentType : false, 
      success:function(d){
        var arr=_this.state.imgArr;
        arr.push(d.url);
        _this.setState({imgArr:arr});
      },
      xhr: function(e){
        var xhr = $.ajaxSettings.xhr();
        if(xhr.upload){
          xhr.upload.addEventListener("progress" ,_this.onProgress, false);
          return xhr;
        }
      } 
    });
  },
  removeEle:function(i){
    var arr=this.state.FileUpArr;
    var imgArr=this.state.imgArr;
    arr.splice(i,1);
    imgArr.splice(i,1);
    this.setState({FileUpArr:arr,imgArr:imgArr});
    
  },
  getImgHtml:function(o,arr){

    return  arr.map(function (obj,idx) {
      
      var style=obj.proc==100?{display:'none'}:{};
      return (<div className="file-item">
            <i className="iconfont icon-chacha close" onClick={o.removeEle.bind(o,idx)}></i>
            <div style={style} className="item-bg">{obj.proc}%</div>
            <img src={obj.src} />
          </div>);
    })
  },
  onProgress:function(evt){
          var loaded = evt.loaded;
          var tot = evt.total;
          var per = Math.floor(100*loaded/tot);
          var FileUpArr=this.state.FileUpArr;
          FileUpArr[this.upIdx].proc=per;
          this.setState({FileUpArr:FileUpArr});
        　if(per==100){ 
            if(this.upIdx+1 < FileUpArr.length){
              this.upIdx++;
              this.fileUpFn(this.fileObj[this.upIdx]);
            }else{
              this.upIdx=0;
              this.fileObj=null;
            }
          }
  },

  render: function() {
    var FileUpArr= this.state.FileUpArr;
	  return (<div className="upImgFile-box" >
              <input name={this.props.name} type="hidden" value={this.state.imgArr.join(',')} />
              <div className="content-block-title wrap">{this.props.title}</div>
              <div className="p15 ubt1 fuzzy-border" >
              {this.getImgHtml(this,FileUpArr)}
                <div className="file-btn">
                  <input type="file" name="file" ref="theFile" onChange={this.fileChange} className="opc-file" multiple="multiple" />
                  <i className="iconfont icon-xiao64"></i>
                </div>
              </div>
            </div>);
	}
});

module.exports = UpImgFile;


