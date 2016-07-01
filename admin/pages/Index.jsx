var React = require('react');
var $ =  require('jquery');
var Loading =require('../components/Loading');
var Panel=require('../components/Panel');
var Index = React.createClass({

  render: function() {
     
      return (
        <div>
    <div className="page-heading">
        <h3>
                首页
            </h3>
        <ul className="breadcrumb">
            <li>
                <a href="#">用户中心</a>
            </li>
            <li className="active"> 首页 </li>
        </ul>
        <div className="state-info">
            
            
        </div>
    </div>
    <div className="wrapper">
        <div className="row">
            <div className="col-md-12">
                <div className="row state-overview">
                    <div className="col-md-3 col-xs-12 col-sm-6">
                        <div className="panel green">
                            <div className="symbol">
                                <i className="fa fa-eye"></i>
                            </div>
                            <div className="state-value">
                                <div className="value">390</div>
                                <div className="title">今日浏览人数</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-xs-12 col-sm-6">
                        <div className="panel blue">
                            <div className="symbol">
                                <i className="fa fa-money"></i>
                            </div>
                            <div className="state-value">
                                <div className="value">22014</div>
                                <div className="title"> 资金流量</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-xs-12 col-sm-6">
                        <div className="panel purple">
                            <div className="symbol">
                                <i className="fa fa-gavel"></i>
                            </div>
                            <div className="state-value">
                                <div className="value">230</div>
                                <div className="title">新用户</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-xs-12 col-sm-6">
                        <div className="panel red">
                            <div className="symbol">
                                <i className="fa fa-tags"></i>
                            </div>
                            <div className="state-value">
                                <div className="value">3490</div>
                                <div className="title">动态</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Panel title="今日活跃用户"  >
                <ul className="goal-progress">
                                <li>
                                    <div className="prog-avatar">
                                        <img src="/admin/images/photos/user1.png" alt="" />
                                    </div>
                                    <div className="details">
                                        <div className="title">
                                            <a href="#">John Doe</a> - Project Lead
                                        </div>
                                        <div className="progress progress-xs">
                                            <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{"width":"70%"}}>
                                                <span className="">70%</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="prog-avatar">
                                        <img src="/admin/images/photos/user2.png" alt="" />
                                    </div>
                                    <div className="details">
                                        <div className="title">
                                            <a href="#">Cameron Doe</a> - Sales
                                        </div>
                                        <div className="progress progress-xs">
                                            <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{"width":"91%"}}>
                                                <span className="">91%</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="prog-avatar">
                                        <img src="/admin/images/photos/user3.png" alt="" /> 
                                    </div>
                                    <div className="details">
                                        <div className="title">
                                            <a href="#">Hoffman Doe</a> - Support
                                        </div>
                                        <div className="progress progress-xs">
                                            <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{"width":"40%"}}>
                                                <span className="">40%</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="prog-avatar">
                                        <img src="/admin/images/photos/user4.png" alt="" />
                                    </div>
                                    <div className="details">
                                        <div className="title">
                                            <a href="#">Jane Doe</a> - Marketing
                                        </div>
                                        <div className="progress progress-xs">
                                            <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{"width": "20%"}}>
                                                <span className="">20%</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="prog-avatar">
                                        <img src="/admin/images/photos/user5.png" alt="" />
                                    </div>
                                    <div className="details">
                                        <div className="title">
                                            <a href="#">Hoffman Doe</a> - Support
                                        </div>
                                        <div className="progress progress-xs">
                                            <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{"width": "45%"}}>
                                                <span className="">45%</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
            </Panel>
          </div>  
          <div className="col-md-6">
            <Panel title="系统信息" type="success" noWrap={true}>
              <div className="list-group bg-white">
                        <div className="list-group-item">
                            <i className="fa fa-fw fa-envelope"></i> CmsWing版本 : <span className=" text-muted">1.0.0</span>
                        </div>
                        <div className="list-group-item">
                            <i className="fa fa-fw fa-eye"></i> 服务器操作系统 : <span className=" text-muted">Windows_NT</span>
                        </div>
                        <div className="list-group-item">
                            <i className="fa fa-fw fa-phone"></i> nodejs版本 : <span className=" text-muted">6.2.2</span>
                        </div>
                        <div className="list-group-item">
                            <i className="fa fa-fw fa-comments-o"></i> MYSQL版本 ：<span className=" text-muted">5.5.47</span>
                        </div>
                        <div className="list-group-item">
                            <i className="fa fa-fw fa-bookmark"></i> ThinkJS ：<span className="text-muted">2.2.4 [The Web framework beyond your dreams] <a href="https://thinkjs.org/doc.html" target="_blank">Getting Started</a> </span>
                        </div>

                    </div>
            </Panel>
            
          </div>
        </div>
    </div>
</div>

      );
  }
});
module.exports = Index;


