;(function() {
  function conversion_getDPI() {
    var arrDPI = new Array()
    if (window.screen.deviceXDPI) {
      arrDPI[0] = window.screen.deviceXDPI
      arrDPI[1] = window.screen.deviceYDPI
    } else {
      var tmpNode = document.createElement('DIV')
      tmpNode.style.cssText =
        'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden'
      document.body.appendChild(tmpNode)
      arrDPI[0] = parseInt(tmpNode.offsetWidth)
      arrDPI[1] = parseInt(tmpNode.offsetHeight)
      tmpNode.parentNode.removeChild(tmpNode)
    }
    DPIS = arrDPI[0]
    // console.log(DPIS)
    return arrDPI[0]
  }
  conversion_getDPI()
  function Seal(id, option) {
    // 获取 canvas
    this.canvas = document.querySelector(id)
    // 获取 ctx
    this.ctx = this.canvas.getContext('2d')
    // 对 option 进行处理，如果没有传入就为空对象
    option = option || {}
  }

  Seal.prototype.saveSealImg = function saveSealImg() {
    var imgName = document.getElementById('sealImg')
    var imgSrc = this.canvas.toDataURL()
    imgName.src = imgSrc
    // console.log(imgName)
    return this.canvas.toDataURL()
  }

  /**
   *个人印章
   *
   * @param {String} id
   * @param {Object} option
   */

  function PersonSeal(id, option) {
    Seal.call(this, id, option)
    // 中心点位置
    //宽
    // this.centerPoint = this.canvas.width / 2
    this.centerPoint = this.mmConversionPx(option.sealSize)
    //高
    this.sealHeight = this.mmConversionPx(option.sealHeight)
    // 类型
    //option.type ||
    this.type = option.type
    // 名称
    this.personName = option.personName || '张三'
    // 字体
    //   '隶书'
    this.fontFamily = 'SimSun'
    // 颜色
    this.color = option.color || '#e60021'
    // 边框线宽度
    this.personLineWidth = this.mmConversionPx(option.personLineWidth)
    // console.log(imgName)
    // 字体大小
    this.personNameFontSize = this.mmConversionPx(option.personNameFontSize)
    // 字与边框的距离

    this.lineTextGap = this.mmConversionPx(option.lineTextGap)
    // 边框左上角的位置
    this.leftTopPointX = this.leftTopPointY = -(
      this.personNameFontSize + this.lineTextGap
    )
    // 边框右下角的位置
    this.rightBottomPointX = this.rightBottomPointY =
      2 * (this.personNameFontSize + this.lineTextGap)
    // 字体加粗
    this.fontWeight = 'bold'
    this.translatey = this.mmConversionPx(option.translatey)
    this.translatex = this.mmConversionPx(option.translatex)
    this.textWidth = this.personNameFontSize / 2 + this.lineTextGap / 2
    this.textHeight = this.personNameFontSize / 2 + this.lineTextGap / 2

    this._init()
  }

  PersonSeal.prototype = Object.create(Seal.prototype)

  PersonSeal.prototype.constructor = PersonSeal

  PersonSeal.prototype._init = function _init() {
    // console.log(this.type)
    // this.centerPoint = option.sealSize / 2

    this.canvas.width = this.centerPoint + this.personNameFontSize
    this.canvas.height = this.sealHeight + this.personNameFontSize

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // this._drawRoundSealLine()
    // this._drawGroupName()
    switch (this.type) {
      case false:
        this._drawPersonNameTypeOne()
        this._drawPersonOuterLineTypeOne(
          this.centerPoint,
          this.centerPoint,
          this.centerPoint,
          this.sealHeight
        )
        break
      case true:
        this._drawPersonNameTypeTwo()
        // var length = this.personName.length,
        //   width = length * this.personNameFontSize
        // this.leftTopPointX = -(width / 2 + this.lineTextGap)
        // this.leftTopPointY = -(this.personNameFontSize / 2 + this.lineTextGap)
        // this.rightBottomPointX = -2 * this.leftTopPointX
        // this.rightBottomPointY = -2 * this.leftTopPointY
        this._drawPersonOuterLineTypeOne(
          this.centerPoint,
          this.centerPoint,
          this.centerPoint,
          this.sealHeight
        )
        break
    }
    this.saveSealImg()
  }
  // 方形章边线
  PersonSeal.prototype._drawPersonOuterLineTypeOne = function _drawPersonOuterLineTypeOne(
    x,
    y,
    width,
    height
  ) {
    this.ctx.save()
    this.ctx.strokeStyle = this.color
    this.ctx.lineWidth = this.personLineWidth
    this.ctx.translate(x, y)
    // this.ctx.beginPath()
    this.ctx.strokeRect(
      -x + this.personLineWidth,
      -y + this.personLineWidth,
      width,
      height
    )
    // this.ctx.rect(x, y, 40, 50)
    this.ctx.stroke()
    this.ctx.restore()
  }
  //正方形名字
  PersonSeal.prototype._drawPersonNameTypeOne = function _drawPersonNameTypeOne() {
    var length = this.personName.length
    if (length < 2 || length > 4) {
      throw new RangeError('名称只能为2~4个字符！')
    }
    if (typeof this.personName !== 'string') {
      throw new TypeError('只能是字符串！')
    }
    switch (length) {
      case 2:
        this.personName += '之印'
        break
      case 3:
        this.personName += '印'
        break
    }
    this._drawLetterTypeOne(
      this.color,
      this.personNameFontSize,
      this.fontFamily
    )
  }
  //正方形字
  PersonSeal.prototype._drawLetterTypeOne = function _drawLetterTypeOne(
    color,
    fontSize,
    fontFamily
  ) {
    this.ctx.save()
    this.ctx.fillStyle = color
    this.ctx.textBaseline = 'middle'
    this.ctx.textAlign = 'center'
    this.ctx.font = 'normal normal normal ' + fontSize + 'px ' + fontFamily
    // var textPoint = this.personNameFontSize / 2
    // + this.lineTextGap
    // this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2)
    this.ctx.translate(this.translatex, this.translatey)

    this.textWidth, this.textHeight
    this.ctx.fillText(
      this.personName.charAt(0),
      this.textWidth,
      -this.textHeight
    )
    this.ctx.fillText(
      this.personName.charAt(1),
      this.textWidth,
      this.textHeight
    )
    this.ctx.fillText(
      this.personName.charAt(2),
      -this.textWidth,
      -this.textHeight
    )
    this.ctx.fillText(
      this.personName.charAt(3),
      -this.textWidth,
      this.textHeight
    )
    this.ctx.restore()
  }

  PersonSeal.prototype._drawPersonOuterLineTypeTwo = function _drawPersonOuterLineTypeTwo() {
    // var length = this.personName.length,
    //   width = length * this.personNameFontSize
    // console.log(this.personNameFontSize)
    // this.leftTopPointX = -(width / 2 + this.lineTextGap)
    // this.leftTopPointY = -(this.personNameFontSize / 2 + this.lineTextGap)
    // this.rightBottomPointX = -2 * this.leftTopPointX
    // this.rightBottomPointY = -2 * this.leftTopPointY
    // this._drawPersonOuterLineTypeOne(
    //   this.centerPoint,
    //   this.centerPoint,
    //   width,
    //   // this.personNameFontSize
    //   this.rightBottomPointY
    // )
  }

  PersonSeal.prototype._drawPersonNameTypeTwo = function _drawPersonNameTypeTwo() {
    this.personNameFontSize = 32
    var length = this.personName.length
    if (length < 2 || length > 4) {
      throw new RangeError('名称只能为2~4个字符！')
    }
    if (typeof this.personName !== 'string') {
      throw new TypeError('只能是字符串！')
    }
    this.ctx.save()
    this.ctx.fillStyle = this.color
    // this.color
    this.ctx.textBaseline = 'middle'
    this.ctx.textAlign = 'center'
    this.ctx.font =
      'normal normal bold ' + this.personNameFontSize + 'px ' + this.fontFamily
    this.ctx.translate(this.translatex, this.translatey)
    this.ctx.fillText(
      this.personName.charAt(0),
      this.textWidth - this.personNameFontSize + this.lineTextGap,
      this.textHeight - this.personNameFontSize + this.lineTextGap
    )
    this.ctx.fillText(
      this.personName.charAt(1),
      this.textWidth + this.lineTextGap,
      this.textHeight - this.personNameFontSize + this.lineTextGap
    )
    // this.ctx.fillText(
    //   this.personName.charAt(0),
    //   this.personNameFontSize +
    //   (3 * this.personLineWidth) / 2 +
    //   this.lineTextGap,
    //   (3 * this.personLineWidth) / 2 +
    //   this.personNameFontSize / 2 +
    //   this.lineTextGap
    // )
    this.ctx.restore()
  }
  PersonSeal.prototype.mmConversionPx = function mmConversionPx(value) {
    var inch = value / 25.4

    var c_value = Math.round(inch * DPIS)
    // console.log(c_value, 'px');
    return c_value
  }
  var wafaSeal = {
    // CompanySeal,
    PersonSeal
  }

  window.wafaSeal = wafaSeal
})()
