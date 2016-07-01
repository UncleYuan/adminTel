var React = require('react');
require('/lib/es5-shim');
require('/lib/es5-sham');
var PubSub=require('/lib/PubSubJS');
window.PubSub=PubSub;
var InputEle = require('/components/InputEle');
var CheckRadio = require('/components/CheckRadio');
var UpImgFileM = require('/components/UpImgFileM');
var Modal = require('/components/Modal');
var InputPosition = require('/components/InputPosition');
require('/lib/jquery');

/*
wx.config({
        debug: false,
        appId: 'wx18a9f211698d817a',
        timestamp:1462499198,
        nonceStr: 'JzjUqtpc7PJIM6fV',
        signature: 'ab623181b2714836584f98e0397b2f7edceb0e44',
        jsApiList: [
            'chooseImage',
            'getLocation',
            'previewImage',
            'uploadImage',
            'openLocation'
        ]
    });
    wx.ready(function(){
        wx.getLocation({
            success: function (res) {
                $.ajax({
                    type: "POST",
                    url: "http://degas.wkidt.com/index.php?a=Position",
                    data: "lat="+res.latitude+"&lng="+res.longitude,
                    dataType:'json',
                    success: function(msg){
                        $('#position').text(msg);
                    }
                });
                $('input[name=longitude]').val(res.longitude);
                $('input[name=latitude]').val(res.latitude);
            },
            fail: function (res) {
                alert('无法获取地理位置');
            }
        });
    });*/
var res={
    "data": {
        "complete": 0,
        "type": "2",
        "title": "干冰灭火器检查",
        "current": 3,
        "cnt": 3,
        "fields": [
            {
                "id": "106",
                "content_id": "42",
                "intro": "是否完好",
                "tips": "描诉",
                "formtype": "radio",
                "options": {
                    "1": "是1",
                    "2": "否2"
                },
                "is_require": "1"
            },
            {
                "id": "107",
                "content_id": "42",
                "intro": "安全栓是否完好",
                "tips": "描诉",
                "formtype": "radio",
                "options": {
                    "1": "是1",
                    "2": "否2"
                },
                "is_require": "1"
            },
            {
                "id": "108",
                "content_id": "42",
                "intro": "拍摄图片",
                "tips": "描诉",
                "formtype": "image",
                "options": false,
                "is_require": "0"
            },
            
            {
                "id": "110",
                "content_id": "42",
                "intro": "情况说明",
                "tips": "描诉",
                "formtype": "textarea",
                "options": false,
                "is_require": "0"
            },
            {
                "id": "110",
                "content_id": "45",
                "intro": "情况说明",
                "tips": "描诉",
                "formtype": "input",
                "options": false,
                "is_require": "0"
            }
        ]
    },
    "status": 1,
    "info": "获取成功",
    "state": "success"
};
var res2={
 	"data":[
        {
            "time": "2016-04-27 11:14:08",
            "t": 1461726848
        },
        {
            "time": "2016-04-27 11:14:26",
            "t": 1461726866
        }
    ],
    "status": 1,
    "info": "获取成功",
    "state": "success"
};

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
	        imgList:this.props.imgArr
	    };
	},
	getImg:function(data){
		this.setState({imgList:data});
	},
	openUpFile:function(){
		this.setState({showUpFile:true});

	},
	render: function () {

		return (
			<div className="pt15 form-item pb15">
			   <div className="img-list">
			        <input type='hidden' name={this.props.name} value={this.state.imgList.join(',')}/>
			        {this.state.imgList.map(function(obj,idx){
			           	return (
			            	<div key={idx} className="img-item" >
			                    <img src={obj}  className="img" alt="" />
			                </div>
			            );
			        })}
			    </div>
				<a className="btn base-btn" onClick={this.openUpFile} > {this.state.imgList.length>0?"修改图片":"上传图片"} </a>		
				<UpImgFileM ref={this.props.name} imgArr={this.props.imgArr} getImgArr={this.getImg} selLen={this.props.selLen}  ifBindSP={this.props.ifBindSP} show={this.state.showUpFile} name={this.props.name} title={this.props.title} />
			</div>
		);
	}
})

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
					<div style={{width:"700px"}}>
						<InputEle title="请输入你要的添加的文字" value={this.state.setText} valChange={this.setTextChange} type="textarea" />
						<div className="pt15 pb15">
							<a className="btn base-btn" onClick={this.setTextFn} >确定</a>
						</div>
					</div>
				</Modal>
 				<UpImgFileM ref={this.props.name} imgArr={this.state.imgList} getImgArr={this.getImg} selLen={this.props.selLen}  ifBindSP={this.props.ifBindSP} show={this.state.showUpFile} name={this.props.name} title={this.props.title} />
			</div>
		);
	}
})

var FormDemo = React.createClass({
	getInitialState:function(){
	    return {
	        loading:true,
	        rendData:{},
	        openModal:false,
	        showUpFile1:false,
	        imgList1:[]
	    };
	},
	componentWillMount:function(){
		var _this=this;
		setTimeout(function(){
			_this.setState({loading:false});
		},500)
	},
	goSub:function(e){
		e.preventDefault();
		console.log($('#form').serialize());
	},
	openModal:function(){
		this.setState({openModal:true});
	},
	openUpFile1:function(){
		this.setState({showUpFile1:true});
	},
	asw:function(i){

	},
	getImg1:function(data){
		this.setState({imgList1:data});
	},
	getFormHtml:function(res){
		var rendHtml=[];
		var _this=this;
		var n=0;
		for(var i in res.data.fields){
			n++;
			var newSelFields=res.data.fields[i];
			if(newSelFields.formtype=="input"||newSelFields.formtype=="textarea"){
				rendHtml.push(
					<InputEle key={i} type={newSelFields.formtype} ref={newSelFields.id} title={n+"."+newSelFields.intro} name={'field'+newSelFields.id} />
				);
			}else if(newSelFields.formtype=="radio"||newSelFields.formtype=="checkbox"){
				var options=newSelFields.options;
				var newArr=[];
				for(var x in options){
					newArr.push({tit:options[x],val:x})
				}
				rendHtml.push(
				<CheckRadio key={i} ref={newSelFields.id}  optionsArr={newArr}  type={newSelFields.formtype} title={n+"."+newSelFields.intro}   name={'field'+newSelFields.id} />
				);
			}else if(newSelFields.formtype=="image"){
				rendHtml.push(
				
				);
			}else if(newSelFields.formtype=="position"){
				rendHtml.push(
					<InputPosition key={i} ref={newSelFields.id}  title={n+"."+newSelFields.intro}   name={'field'+newSelFields.id} />
				);
			}
		}
		return rendHtml;
	},
    render: function () {
    	if(this.state.loading){
    		return (<div className="cont-wrap white-bg  mt30 mAuto  tc"><img src="/bcd/images/loading.gif" /></div>)
    	}else{
    		var html=this.getFormHtml(res);
	        return (
	        	<div className="cont-wrap white-bg  mt30 mb50 mAuto  ">
	        	<div className=" tc pt50">




		            <ul className="breadcrumbs">
		                <li className="item"><a href="" className="active">1、选择广告类型</a></li>
		                <li className="item"><a href="" className="active">2、编辑广告内容</a></li>
		                <li className="item"><a href="">3、定向红包设置</a></li>
		
		            </ul>
		        </div>
	        		<div className="p30">
		        	<form  id="form">
			      		{html}	

			            <SelUpImg />
			            <SetMobileCont />
			            <div className="tc pt30 pb30">
						    <button onClick={this.goSub} className="ajax-btn w200 base-btn btn">
						        保存
						    </button>
					    </div>
					</form>
					</div>
				</div>
	        );
        }
    }
});
	
	React.render(
		<FormDemo />,
	  	document.getElementById('box')
	);	
	