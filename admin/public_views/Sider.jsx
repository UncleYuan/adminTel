var React = require('react');
var $ = require('jquery');

var Sider=React.createClass({
  getDefaultProps:function(){
      return {
        userInfo:{},
        menuData:[{tit:"首页",icon:"home",url:"#/admin/index",children:[]}],
        openMenuId:false
      };
    },
  getInitialState:function(){
      return {
        userInfo:this.props.userInfo,
        openMenuId:parseInt(this.props.openMenuId),
        show:true,
        menuData:this.props.menuData
      };
  },
  componentWillReceiveProps:function(nextProps){

    if(nextProps.openMenuId!=this.state.openMenuId){
      this.setState({openMenuId:nextProps.openMenuId});
    }

    if(nextProps.menuData!=this.state.menuData){
      this.setState({menuData:nextProps.menuData});
    }

    if(nextProps.userInfo!=this.state.userInfo){
        this.setState({userInfo:nextProps.userInfo})
    }
  },
  toggleMenu:function(idx){
    
    var setIdx=this.state.openMenuId;
    if(setIdx==idx){
      setIdx=idx;
    }else{
      setIdx=idx;
    }
    this.setState({openMenuId:setIdx});
  },

  render: function () {
    
  return (

      <div className="left-side sticky-left-side"  style={{overflow:"hidden", outline:"none"}}>
        <div className="logo">
            <a href="#"><img src="/admin/images/logo.png" alt="" /></a>
        </div>

        <div className="logo-icon text-center">
            <a href="index.html"><img src="/admin/images/logo_icon.png" alt="" /></a>
        </div>
        <div className="left-side-inner">

            <div className="visible-xs hidden-sm hidden-md hidden-lg">
                <div className="media logged-user">
                    <img alt="" src={this.state.userInfo.avatar} className="media-object" />
                    <div className="media-body">
                        <h4><a href="#">{this.state.userInfo.username}</a></h4>
                        <span>"欢迎你！"</span>
                    </div>
                </div>

             
            </div>

            <ul className="nav nav-pills nav-stacked custom-nav">
              {this.state.menuData.map(function(obj,idx){
                var childrenHtml=[];
                if(obj.children.length>0){
                  for(var i in obj.children){
                    childrenHtml.push(<li key={i}><a href={obj.children[i].url?"#"+obj.children[i].url:'javascript:;'}>{obj.children[i].name}</a></li>);
                  }
                }
                var liClass=obj.children.length>0?"menu-list":"";
                liClass=idx===this.state.openMenuId?liClass+" active":liClass;
                return (
                    <li key={idx} className={liClass} onClick={this.toggleMenu.bind(this,idx)}>
                      <a href={obj.url?"#"+obj.url:"javascript:;"}><i className={"fa fa-"+obj.icon}></i><span>{obj.name}</span></a>
                      <ul className="sub-menu-list">
                        {childrenHtml}
                      </ul>
                    </li>
                  )
              },this)}
                
                
            </ul>


        </div>
    </div>
   
    );
  }
})

module.exports = Sider;


