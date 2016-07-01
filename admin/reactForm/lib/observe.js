function Observe() {
  // 缓存订阅者的消息队列
  this._list = [];
}
/**
*
* 订阅者订阅消息
* @param {string} key 消息名
* @param {Function} fn 回调事件
* @return {Null} 
*/
Observe.prototype.listen = function(key, fn) {
  if (!this._list[key]) {
    this._list[key] = [];
  }
  // 订阅消息，添加到缓存列表中
  this._list[key].push(fn);
};
/**
* 
* 移除订阅的消息
* @param {string} key 消息名
* @param {Function} fn 回掉事件
* @return {Null} 
*/
Observe.prototype.remove = function(key, fn){
  // 获取当前key下的消息记录
  var arrFn = this._list[key];
  if (!arrFn) return false;
  // 未指定fn则删除当前key下所有的订阅消息
  if (!fn) {
    arrFn.length = 0;
  }else{
    for(var i = 0; i < arrFn.length; i++) {
      if (fn === arrFn[i]) {
       arrFn.splice(i,1);
      }
    }
  }
};
/**
* 发布者发布消息
* @param {string} key 消息名
* @param {string | Object} 消息数据
* @return {Null} 
*/
Observe.prototype.trigger = function(key, aa) {
  // 得到key,第二个及以上的参数
  var key = Array.prototype.shift.call(arguments);
  var args = arguments;
  var arrFn = this._list[key];
  if (!arrFn || arrFn.length === 0) {
    return;
  }
  // 遍历执行当前key下面的所有消息
  for (var i = 0; i < arrFn.length; i++) {
    arrFn[i].apply(this, args);
  }
};

module.exports = Observe;