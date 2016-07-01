var React = require('react');
var UpImgFileM = require('../components/UpImgFileM');
var Modal = require('../components/Modal');
var SelUpImg=React.createClass({
  getDefaultProps:function(){
      return {
        value:"",
          title:"我上传过的的图片",
          name:"selUpFile",
          selLen:3,
          imgArr:[],
          ifBindSP:false,
        };
    },
  getInitialState:function(){

      return {
          showUpFile:false,
          imgList:this.props.imgArr,
          setName:this.props.name
      };
  },
  getImg:function(data){
    for(var i in data){
      data[i]={
        "image":data[i],
        "title":""
      }
    }
    this.setState({imgList:data});
  },
  componentDidMount: function () {


  },
  openUpFile:function(){
    this.setState({showUpFile:true});
    PubSub.publish(this.state.setName+"Set",{show:true});
  },
  render: function () {
    return (

      <div className="form-item form-group">
         <div className="img-list">
         <label>{this.props.title}</label>
              <input type='hidden' name={this.props.name} value={this.state.imgList.join(',')}/>
              {this.state.imgList.map(function(obj,idx){
                  return (
                    <div key={idx} className="img-item" >
                      <div className="img-item-bg">
                        {obj.title==""?"点击这里设置图片对应的标题文字":obj.title}
                      </div>
                      <img src={obj.img}  className="img" alt="" />
                    </div>
                  );
              })}
          </div>
        <a className="btn btn-success" onClick={this.openUpFile} > {this.state.imgList.length>0?"修改图片":"上传图片"} </a>    
        <UpImgFileM  name={this.state.setName} ifBindSP="true"  getImgArr={this.getImg} selLen={this.props.selLen}   title={this.props.title} />
      </div>
    );
  }
})

module.exports = SelUpImg;


