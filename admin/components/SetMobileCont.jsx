var React = require('react');
var UpImgFileM = require('../components/UpImgFileM');
var Modal = require('../components/Modal');
var InputEle = require('../components/InputEle');
var moveArr={
  swapItems:function(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
    },
    upRecord:function(arr, $index) {
        if($index == 0) {
            return;
        }
        this.swapItems(arr,$index,$index-1);
    },
    downRecord :function(arr, $index) {
        if($index == arr.length -1) {
            return;
        }
        this.swapItems(arr, $index, $index + 1);
    }
}
var SetMobileCont=React.createClass({
  getDefaultProps:function(){
      return {
        value:"",
          title:"我上传过的的图片",
          name:"SetMobileCont",
          selLen:100,
          imgArr:[],
          ifBindSP:false,
          
          contentArr:[]
        };
    },
  getInitialState:function(){
      return {
          showUpFile:false,
          imgList:this.props.imgArr,
          contentArr:this.props.contentArr,
          showTextModal:false,
          setText:""
      };
  },
  getImg:function(data){
    var contentArr=this.state.contentArr;
    if(this.getImgType=="add"){
      for(var i in data){
        contentArr.push({type:'img',src:data[i]})
      }
    }else if(!isNaN(this.getImgType)){
      var idx=this.getImgType;
      var start=1;
      for(var i in data){
        contentArr.splice(idx,start,{type:'img',src:data[i]});
        start=0;
        idx++;
      }
    }
    this.setState({contentArr:contentArr,imgList:[],showUpFile:false});
  },
  componentDidMount:function(){
    this.textIdx=false;
  },
  delItem:function(i){
    var contentArr=this.state.contentArr;
    contentArr.splice(i,1);
    this.setState({contentArr:contentArr});
  },
  setGetImgType:function(type){
    this.getImgType=type;
    this.openUpFile();
  },
  getImgType:"add",
  openUpFile:function(){
    this.setState({showTextModal:false,showUpFile:true});
  },
  openTextModal:function(){
    this.setState({showTextModal:true,showUpFile:false});
  },
  setTextChange:function(data){

    this.setState({setText:data});
  },
  eidtSetText:function(idx){
    this.textIdx=idx;
    var contentArr=this.state.contentArr;
    this.setState({showTextModal:true,showUpFile:false,setText:contentArr[idx].txt});
  },
  setTextFn:function(){
    var idx=typeof(this.textIdx)=="number"?this.textIdx:this.state.contentArr.length;
    var contentArr=this.state.contentArr;
    contentArr.splice(idx,1,{type:'txt',txt:this.state.setText});
    this.setState({showTextModal:false,showUpFile:false,setText:"",contentArr:contentArr});
    this.textIdx=false;
  },
  moveItem:function(idx,type){
    var contentArr=this.state.contentArr;
    if(type=="up"){
      moveArr.upRecord(contentArr,idx);
    }else if(type=="down"){
      moveArr.downRecord(contentArr,idx);
    }
    this.setState({contentArr:contentArr})
  },
  render: function () {

    return (
      <div className="pt15 mb30 pb20 ubdb2 fuzzy-border"> 
      <div className="title desalt-light-color">{this.props.title}</div>
      <div className="setContBox mb30 mt15">      

          <input type='hidden' name={this.props.name} value={this.state.imgList.join(',')}/>  
          {this.state.contentArr.map(function(obj,idx){
            if(obj.type=="img"){
              return(
                <div className="img-box item-box">
                  <img src={obj.src} />
                  <div className="edit_mask">
                        <span className="vm_box"></span>
                      <a href="javascript:;" className="iconfont icon-arrow-up" onClick={this.moveItem.bind(this,idx,'up')}></a>
                      <a href="javascript:;" className="iconfont icon-arrow-down" onClick={this.moveItem.bind(this,idx,'down')}></a>
                      <a href="javascript:;" className="iconfont icon-bianji" onClick={this.setGetImgType.bind(this,idx)}></a>
                      <a href="javascript:;" className="iconfont icon-shanchu" onClick={this.delItem.bind(this,idx)}></a>
                  </div>
                </div>
              );
            }else if(obj.type=='txt'){
              return(
                <div className="text-box item-box">
                <div className="cont">{obj.txt}</div>
                <div className="edit_mask">
                        <span className="vm_box"></span>
                      <a href="javascript:;" className="iconfont icon-arrow-up" onClick={this.moveItem.bind(this,idx,'up')}></a>
                      <a href="javascript:;" className="iconfont icon-arrow-down" onClick={this.moveItem.bind(this,idx,'down')}></a>
                      <a href="javascript:;" className="iconfont icon-bianji" onClick={this.eidtSetText.bind(this,idx)}></a>
                      <a href="javascript:;" className="iconfont icon-shanchu" onClick={this.delItem.bind(this,idx)}></a>
                  </div>
              </div>
              );
            }
          },this)}
        <div className="addBtnBox">
          <i className="jia-btn iconfont icon-xiao64"></i>
          <div className="item-btn-box">
            <div className="item-btn" onClick={this.setGetImgType.bind(this,'add')}>
              <i className="iconfont icon-tupian"></i>
              <span className="item-name">添加图片</span>
            </div>
            <div className="item-btn" onClick={this.openTextModal}>
              <i className="iconfont icon-text"></i>
              <span className="item-name">添加文字</span>
            </div>
          </div>
        </div>  
        <Modal title="添加文字" show={this.state.showTextModal} >
          <div >
            <InputEle title="请输入你要的添加的文字" value={this.state.setText} valChange={this.setTextChange} type="textarea" />
            <div className="pt15 pb15">
              <a className="btn base-btn" onClick={this.setTextFn} >确定</a>
            </div>
          </div>
        </Modal>
        <UpImgFileM ref={this.props.name} imgArr={this.state.imgList} getImgArr={this.getImg} selLen={this.props.selLen}  ifBindSP={this.props.ifBindSP} show={this.state.showUpFile} name={this.props.name} title={this.props.title} />
      </div>
    </div>
    );
  }
})

module.exports = SetMobileCont;


