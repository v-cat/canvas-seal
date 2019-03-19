//nameSpace
var VVG = {}
VVG.DOM = {}
//创建getElementsByClassName方法
VVG.DOM.getElementsByClassName = function(str, parent, tag) {
  //父节点存在
  if (parent) {
    // 当父节点为string类型时，查找DOM节点，否则直接引用parent
    parent =
      typeof parent == 'string' ? document.getElementById(parent) : parent
    // parent为空时提示错误信息
    if (!parent) alert('找不到标签，请检查参数是否正确')
  } else {
    // 未传值时，父节点为body
    parent = document.body
  }
  // tagContent为节点类型，未传值时为all节点
  tag = tag || '*'
  // 在父节点查找子节点，建立空数组arr
  var els = parent.getElementsByTagName(tag),
    arr = []
  for (var i = 0, n = els.length; i < n; i++) {
    // 查找每个节点下的classname，以空格分离为一个k数组
    for (var j = 0, k = els[i].className.split(' '), l = k.length; j < 1; j++) {
      // 当K数组中有一个值与str值相等时，记住这个标签并推入arr数组
      if (k[j] == str) {
        arr.push(els[i])
        break
      }
    }
  }
  // 返回数组
  return arr
}
//创建TabManager对象
VVG.TabManager = function(oo) {
  this.root = oo.root || 'warp'
  this.tabUlId = oo.tabUlId || 'tabUlId'
  this.tabConId = oo.tabConId || 'tabConId'
  this.tabConClass = oo.tabConClass || 'J_tabClass'
  this.trggle = oo.trggle || 'click'
  this.currentCss = oo.currentCss || 'current'
}
VVG.TabManager.prototype = {
  tabChange: function() {
    // 获取UL的id
    var ulid = document.getElementById(this.tabUlId)
    // 获取UL下的LI元素
    var ulli = ulid.getElementsByTagName('li')
    // 获取内容盒子DIV元素
    var tabConId = document.getElementById(this.tabConId)
    // 获取root下的div的class为特定值的对象数组
    var tabConClasses = VVG.DOM.getElementsByClassName(
      this.tabConClass,
      this.root,
      'div'
    )
    // 初始化
    ulli[0].className = this.currentCss
    tabConClasses[0].style.display = 'block'
    for (var i = ulli.length - 1; i >= 0; i--) {
      // 赋值this 与 that,避免this混乱
      var that = this
      // 设置对象index属性
      ulli[i].index = i
      // 设置对象的事件
      ulli[i]['on' + this.trggle] = function() {
        for (var j = tabConClasses.length - 1; j >= 0; j--) {
          tabConClasses[j].style.display = 'none'
          ulli[j].className = ''
        }
        tabConClasses[this.index].style.display = 'block'
        this.className = that.currentCss
      }
    }
  }
}
// 新建对s象实例
var TabManager1 = new VVG.TabManager({
  root: 'warp', //包裹tab对象的div层的ID名称，必填
  tabUlId: 'tag', //TAB标签LI元素的父亲UL元素的ID名称，必填
  tabConId: 'tagContent', //内容元素的包裹盒子的ID名称，必填
  trggle: 'mouseover', //切换方式，默认为click，可选
  currentCss: 'current', //TAB标签liy元素的当前CSS名称，默认为current
  tabConClass: 'J_tabClass' //内容元素的CLASS名称，默认为J_tabClass
})
// 调用对象方法
TabManager1.tabChange()
