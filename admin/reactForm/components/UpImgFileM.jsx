var React = require('react');
require('/lib/zepto.min');
var Modal = require('/components/Modal');
var WebUploader = require('webuploader');

var upFileObj=null;
var btnStyle={"position":"relative","overflow":"hidden","verticalAlign":"top"}
var  arrIndexOf = function(arr,val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == val) return i;
  }
  return -1;
};
var UpImgFileM = React.createClass({
  getDefaultProps:function(){
      return {
        getImgArr:false,
        value:"",
        title:"",
        name:"",
        selImgList:[],
        show:false,
        selLen:3,
        imgArr:[],
        ifBindSP:false,
      };
  },
  getInitialState: function() {
      return {
          inputEd:false,
          textareaHeight:false,
          selImgList:this.props.selImgList,
          show:this.props.show,
          waitUpImgObj:[],
          imgArr:this.props.imgArr,
          openModal:false
        };
  },
  componentWillReceiveProps:function(nextProps){
    if(nextProps.imgArr!=this.state.imgArr){
      this.setState({imgArr:nextProps.imgArr});
    }
    if(nextProps.show!=this.state.show){
      this.setState({show:nextProps.show});
      this.setState({imgArr:[]})
      this.upDataSelImg()
    }
  },
  componentDidMount: function () {
    
    var _this=this;

    upFileObj=WebUploader.create({             
      auto: true,// swf文件路径
      swf: '/js/Uploader.swf', // 文件接收服务端。                           
      server: '/index.php?m=System&c=Upload&a=upload',
      pick: '#'+this.props.name,
      resize: false
    });
    upFileObj.on('uploadSuccess',function(file,response){
      var dataState=_this.state.waitUpImgObj;
      for(var i in dataState){
        if(file.id==dataState[i].id){
          dataState.splice(i,1);
        }
      }
      _this.setState({waitUpImgObj:dataState});
      _this.upDataSelImg();
    });
    upFileObj.on('fileQueued', function( file ) { 
        var dataState=_this.state.waitUpImgObj;
        var idx=dataState.length;
        if(idx==dataState.length){
          dataState.push({name:file.name,stateName:"正在上传..",id:file.id});
        }
        upFileObj.makeThumb(file,function(error,src){
            if(error){
              dataState[idx].stateName='不能预览';
              dataState[idx].src='no_img.png';
              return;
            }
            dataState[idx].src=src;
            _this.setState({waitUpImgObj:dataState});
        },100,100);

      });
    if(this.props.ifBindSP&&PubSub){

      this.pubsub_set_token = PubSub.subscribe(this.props.name+'Set', function (evename,stateObj) {
        if(stateObj.show==true){ 
          this.setState({imgArr:[]})
          this.upDataSelImg();
        }
        this.setState(stateObj);
      }.bind(this));
      this.pubsub_get_token = PubSub.subscribe(this.props.name+'Get',function(evename,name){
        return this.state[name];
      }.bind(this));
    }
  },
  componentWillUnmount: function () {
    if(this.props.ifBindSP&&PubSub){
      PubSub.unsubscribe(this.pubsub_set_token);
      PubSub.unsubscribe(this.pubsub_get_token);
    }
    upFileObj.destroy();
  },
  getImgHtml:function(o,arr){
    return  arr.map(function (obj,idx){
      var style=obj.proc==100?{display:'none'}:{};
      return (
        <div className="file-item">
          <i className="iconfont icon-chacha close" onClick={o.removeEle.bind(o,idx)}></i>
          <div style={style} className="item-bg">{obj.proc}%</div>
          <img src={obj.src} />
        </div>
      );
    })
  },
  selItem:function(i,have,selUrl){
    var Data=this.state.imgArr;
    if(have>=0){
      Data.splice(have,1);
    }else {
      if(this.props.selLen<=Data.length){
        Data.shift();
      }
      Data.push(selUrl);
    }
    this.setState({imgArr:Data})
  },
  checkHaveImg:function(url){

    var Data=this.state.imgArr;
    var idx=arrIndexOf(Data,url);
    return idx;
  },
  upDataSelImg:function(){
    var _this=this;
    $.get('/attachment',function(data){
        _this.setState({selImgList:data.data});
    },'json');
  },
  subImg:function(){

    if(this.props.getImgArr){
      this.props.getImgArr(this.state.imgArr);
    }
    this.setState({show:false});
  },
  closeFn:function(){
    this.setState({show:false});
  },
  i:0,
  render: function() {
    var _this=this;
    return (
            <Modal title="图片上传" closeFn={this.closeFn} show={this.state.show}>
              <div className="form-item ">
                <div className="item-input-box">
                  <div className="img-list pb15">

                    {this.state.waitUpImgObj.map(function (obj,idx) {
                       return (
                          <div className="img-item"  key={idx}>
                            <i style={{"display":"none"}} className="close iconfont icon-chacha" ></i>
                            <span className="file-status">{obj.stateName}</span>
                            <img src={obj.src}  className="img" alt="" />
                          </div>
                        );
                      })
                    }
                    {this.state.selImgList.map(function (obj,idx) {
                       var i=_this.checkHaveImg(obj.url);
                       var selClass=i>=0?" sel":'';
                       return (<div className={"img-item"+selClass} key={idx} onClick={_this.selItem.bind(_this,idx,i,obj.url)} >
                          <i style={{"display":"none"}} className="close iconfont icon-chacha" ></i>
                            <span className="file-status">{obj.filename}
                          </span>
                          <img src={obj.url}  className="img" alt="" />
                        </div>)
                    })}
                </div>  
                <a href="javascript:;" style={btnStyle} ref="upfileBtn" className="mr15 btn btn-success" id={this.props.name} >点击上传</a>
                <a href="javascript:;" className="btn btn-info" onClick={this.subImg}>确定</a>
                </div>
              </div>

            </Modal>
   
            );
  }
});

module.exports = UpImgFileM;


