var React = require('react');
var MenuData=[
  {tit:"首页",icon:"home",url:"/admin/index",children:[]},
  {tit:"内容管理",icon:"tasks",children:[
    {tit:"栏目管理",url:"/admin/article_type_list"},
    {tit:"文章管理",url:"/admin/article_list"}
  ]},
  {tit:"退出系统",icon:"sign-in",url:"/admin/logout",children:[]},
]
var Sider=React.createClass({
  getDefaultProps:function(){
      return {
        username:username,
        menuData:MenuData,
        openMenuId:false
      };
    },
  getInitialState:function(){
      return {
        openMenuId:parseInt(this.props.openMenuId),
        show:true
      };
  },
  componentWillReceiveProps:function(nextProps){
    if(nextProps.openMenuId!=this.state.openMenuId){
      this.setState({openMenuId:nextProps.openMenuId});
    }
  },
  toggleMenu:function(idx){
    var setIdx=this.state.openMenuId;
    if(setIdx==idx){
      setIdx=false;
    }else{
      setIdx=idx;
    }
    this.setState({openMenuId:setIdx});
  },

  render: function () {
    
  return (

      <div className="left-side sticky-left-side"  style={{overflow:"hidden", outline:"none"}}>
        <div className="logo">
            <a href="index.html"><img src="../public/admin-ui/images/logo.png" alt="" /></a>
        </div>

        <div className="logo-icon text-center">
            <a href="index.html"><img src="../public/admin-ui/images/logo_icon.png" alt="" /></a>
        </div>
        <div className="left-side-inner">

            <div className="visible-xs hidden-sm hidden-md hidden-lg">
                <div className="media logged-user">
                    <img alt="" src="../public/admin-ui/images/photos/user-avatar.png" className="media-object" />
                    <div className="media-body">
                        <h4><a href="#">{this.props.username}</a></h4>
                        <span>"欢迎你！"</span>
                    </div>
                </div>

             
            </div>

            <ul className="nav nav-pills nav-stacked custom-nav">
              {this.props.menuData.map(function(obj,idx){
                var childrenHtml=[];
                if(obj.children.length>0){
                  for(var i in obj.children){
                    childrenHtml.push(<li><a href={obj.children[i].url?obj.children[i].url:'javascript:;'}>{obj.children[i].tit}</a></li>);
                  }
                }
                var liClass=obj.children.length>0?"menu-list":"";
                liClass=idx===this.state.openMenuId?liClass+" active":liClass;
                return (
                    <li key={idx} className={liClass} onClick={this.toggleMenu.bind(this,idx)}>
                      <a href={obj.url?obj.url:"javascript:;"}><i className={"fa fa-"+obj.icon}></i><span>{obj.tit}</span></a>
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


