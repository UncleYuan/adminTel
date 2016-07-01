var React = require('react');

var tableBaseData={}
var tableBase=React.createClass({
  getDefaultProps:function(){
      return {
            name:"table",
            tableBase:tableBaseData,
            ifBindSP:true
        };
    },
  getInitialState:function(){
      return {
          loading:false,
          tableBase:this.props.tableBase
      };
  },
  componentWillReceiveProps:function(nextProps){

    if(nextProps.tableBase!=this.state.tableBase){
      this.setState({tableBase:nextProps.tableBase});
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
  render: function () {
    
    return (
    <div className="header-section">
        <a className="toggle-btn"><i className="fa fa-bars"></i></a>

        <form className="searchform" action="index.html" method="post">
            <input type="text" className="form-control" name="keyword" placeholder="请在这里搜索..." />
        </form>
        <div className="menu-right">
            <ul className="notification-menu">
        
                <DropdownMenu title="test2"  btnText={<div><i className="fa fa-tasks"></i><span className="badge">8</span></div>}>
                  <ul className="dropdown-list user-list">
                            <li className="new">
                                <a href="#">
                                    <div className="task-info">
                                        <div>Database update</div>
                                    </div>
                                    <div className="progress progress-striped">
                                        <div style={{width:"40%"}} aria-valuemax="100" aria-valuemin="0" aria-valuenow="40" role="progressbar" className="progress-bar progress-bar-warning">
                                            <span className="">40%</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li className="new">
                                <a href="#">
                                    <div className="task-info">
                                        <div>Dashboard done</div>
                                    </div>
                                    <div className="progress progress-striped">
                                        <div style={{width:"90%"}} aria-valuemax="100" aria-valuemin="0" aria-valuenow="90" role="progressbar" className="progress-bar progress-bar-success">
                                            <span className="">90%</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="task-info">
                                        <div>Web Development</div>
                                    </div>
                                    <div className="progress progress-striped">
                                        <div style={{width:"66%"}} aria-valuemax="100" aria-valuemin="0" aria-valuenow="66" role="progressbar" className="progress-bar progress-bar-info">
                                            <span className="">66% </span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="task-info">
                                        <div>Mobile App</div>
                                    </div>
                                    <div className="progress progress-striped">
                                        <div style={{width:"33%"}} aria-valuemax="100" aria-valuemin="0" aria-valuenow="33" role="progressbar" className="progress-bar progress-bar-danger">
                                            <span className="">33% </span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="task-info">
                                        <div>Issues fixed</div>
                                    </div>
                                    <div className="progress progress-striped">
                                        <div style={{width:"80%"}} aria-valuemax="100" aria-valuemin="0" aria-valuenow="80" role="progressbar" className="progress-bar">
                                            <span className="">80% </span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li className="new"><a href="">See All Pending Task</a></li>
                        </ul>
                </DropdownMenu>
                <DropdownMenu title="test"  btnText={<div><i className="fa fa-envelope-o"></i><span className="badge">5</span></div>}>
                  <ul className="dropdown-list normal-list">
                            <li className="new">
                                <a href="">
                                    <span className="thumb"><img src="../public/admin-ui/images/photos/user1.png" alt="" /></span>
                                        <span className="desc">
                                          <span className="name">John Doe <span className="badge badge-success">new</span></span>
                                          <span className="msg">Lorem ipsum dolor sit amet...</span>
                                        </span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <span className="thumb"><img src="../public/admin-ui/images/photos/user2.png" alt="" /></span>
                                        <span className="desc">
                                          <span className="name">Jonathan Smith</span>
                                          <span className="msg">Lorem ipsum dolor sit amet...</span>
                                        </span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <span className="thumb"><img src="../public/admin-ui/images/photos/user3.png" alt="" /></span>
                                        <span className="desc">
                                          <span className="name">Jane Doe</span>
                                          <span className="msg">Lorem ipsum dolor sit amet...</span>
                                        </span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <span className="thumb"><img src="../public/admin-ui/images/photos/user4.png" alt="" /></span>
                                        <span className="desc">
                                          <span className="name">Mark Henry</span>
                                          <span className="msg">Lorem ipsum dolor sit amet...</span>
                                        </span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <span className="thumb"><img src="../public/admin-ui/images/photos/user5.png" alt="" /></span>
                                        <span className="desc">
                                          <span className="name">Jim Doe</span>
                                          <span className="msg">Lorem ipsum dolor sit amet...</span>
                                        </span>
                                </a>
                            </li>
                            <li className="new"><a href="">Read All Mails</a></li>
                        </ul>
                </DropdownMenu>
                
                <DropdownMenu title="测试弹出"  btnText={<div><i className="fa fa-bell-o"></i><span className="badge">4</span><span className="pl10 pr10">测试</span></div>}>
                  <ul className="dropdown-list normal-list">
                            <li className="new">
                                <a href="">
                                    <span className="label label-danger"><i className="fa fa-bolt"></i></span>
                                    <span className="name">Server #1 overloaded.  </span>
                                    <em className="small">34 mins</em>
                                </a>
                            </li>
                            <li className="new">
                                <a href="">
                                    <span className="label label-danger"><i className="fa fa-bolt"></i></span>
                                    <span className="name">Server #3 overloaded.  </span>
                                    <em className="small">1 hrs</em>
                                </a>
                            </li>
                            <li className="new">
                                <a href="">
                                    <span className="label label-danger"><i className="fa fa-bolt"></i></span>
                                    <span className="name">Server #5 overloaded.  </span>
                                    <em className="small">4 hrs</em>
                                </a>
                            </li>
                            <li className="new">
                                <a href="">
                                    <span className="label label-danger"><i className="fa fa-bolt"></i></span>
                                    <span className="name">Server #31 overloaded.  </span>
                                    <em className="small">4 hrs</em>
                                </a>
                            </li>
                            <li className="new"><a href="">See All Notifications</a></li>
                        </ul>
                </DropdownMenu>
               <DropdownMenu title="设置"  small="true" btnText={<div><img src="../public/admin-ui/images/photos/user-avatar.png" alt="" />欢迎您，{this.props.username}<span className="caret"></span></div>}>
                  <ul className="dropdown-list normal-list">
                        <li>
                            <a  href="/admin/logout"><i className="md md-fullscreen"></i>退出登录</a>
                        </li>
                        <li>
                            <a href=""><i className="md md-delete"></i>回收站</a>
                        </li>
                        <li>
                            <a href=""><i className="md md-person"></i> 用户设置</a>
                        </li>
                        <li>
                            <a href=""><i className="md md-settings"></i> 系统设置</a>
                        </li>
                    </ul>
                </DropdownMenu>
               

            </ul>
        </div>
        </div>
    );
  }
})

module.exports = tableBase;


