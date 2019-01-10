(function () {
    function Seal(id, option) {
        //获取canvas
        // alert(id)
        this.canvas = document.querySelector(id);
        // 获取ctx
        this.ctx = this.canvas.getContext('2d');
        // 对 option 进行处理，如果没有传入就为空对象
        option = option || {};
    }
    Seal.prototype.saveSealImg = function saveSealImg() {
        return this.canvas.toDataURL();
    }
    //圆章
    function roundSeal(id, option) {
        //call 方法第一个参数也是作为函数上下文的对象，但是后面传入的是一个参数列表，而不是单个数组。
        Seal.call(this, id, option)
        this.type = option.type || 1;
        this.color = option.color || 'red';
        // 印章半径
        this.radius = option.radius || 79.5;
        // 边框线的宽度
        this.lineWidth = 4 / 79.5 * this.radius;
        //是否有内边线
        this.hasInnerLine = option.hasInnerLine || false;
        // 内边框线的宽度
        this.innerLineWidth = 0.5;
        // 机构名称
        this.groupName = option.groupName || '江苏敏行术有限公司';
        // 机构名称字体大小
        // 17 / 79.5 * this.radius
        this.groupNameFontSize = 18;
        // 字体
        this.fontFamily = option.fontFamily || 'SimSun';
        //文字环绕度数
        // (this.groupNameFontSize / 2)
        this.characterDegree = option.characterDegree || 260;
        // 字数
        this.startIndex = this.groupName.length - 1;
        // Math.PI返回圆周率（约等于3.14159）。
        //（文字环绕度数与总度数的百分比） 转化为圆周率

        this.math = (parseInt(this.characterDegree) / 360) * Math.PI * 2
        // alert(parseInt(this.characterDegree) / 360 * Math.PI)
        // 字与字之间相差的弧度
        this.step = parseInt(this.math) / this.startIndex;
        // 字与边框的距离
        this.lineTextGap = option.lineTextGap || 4;
        //文字间距
        this.companyFontWidth = option.companyFontWidth || 15;
        //防伪码
        this.securityCodeFontSize = option.securityCodeFontSize || 0.12 * this.radius
        this.securityCode = option.securityCode || '1234567891234'
        //印章名称
        this.drawSealName = option.drawSealName || '采购专用章'
        this.typeNameFontSize = option.typeNameFontSize || 12
        //印章名称位置
        this.charactLocation = option.charactLocation || 38;
        //印章名称文字间距
        this.typeNameMaxWidth = option.typeNameMaxWidth || 65
        // 初始化

        this._init();
    }
    roundSeal.prototype = Object.create(Seal.prototype);
    roundSeal.prototype.constructor = roundSeal;
    roundSeal.prototype._init = function _init() {
        console.log(this.type)
        this.canvas.width = this.canvas.height = this.radius * 2;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this._drawRoundSealLine();
        this._drawGroupName();
        if (this.drawSealName) {
            // 印章名称
            this._drawSealName();
        }
        // console.log(this.securityCode)
        if (this.securityCode) {
            // 防伪码
            this._drawSecurityCode();
        }
        switch (this.type) {
            case 1:
                //圆形默认印章
                this._drawStar();
            case 2:
            //圆形国徽印章
            // this._drawNationalEmblem();
            case 3:
            //圆形党徽印章
            // this._drawPartyEmblem();
        }
    }
    //边框
    roundSeal.prototype._drawRoundSealLine = function _drawRoundSealLine() {
        this.ctx.save();
        // 
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.beginPath();
        // this.ctx.lineTo(0, 2 * this.radius)
        // this.ctx.lineTo(0, this.radius)

        this.ctx.arc(this.radius, this.radius, this.radius - this.lineWidth, 0, Math.PI * 2, true);
        this.ctx.stroke();
        this.ctx.restore();
        if (this.hasInnerLine) {
            this._drawInnerLine();
        }
    };
    //内边框
    roundSeal.prototype._drawInnerLine = function _drawInnerLine() {
        this.ctx.save();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.innerLineWidth;
        this.ctx.beginPath();
        this.ctx.arc(this.radius, this.radius, this.radius - this.lineWidth - this.radius / 15, 0, Math.PI * 2, true);
        this.ctx.stroke();
        this.ctx.restore();
    };
    //五角星
    roundSeal.prototype._drawStar = function _drawStar() {
        // var canvas = document.getElementById('canvas')
        // var ctx = canvas.getContext('2d');
        this.ctx.save();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.innerLineWidth;
        // alert(this.innerLineWidth)
        this.ctx.fillStyle = this.color;
        this.ctx.translate(this.radius, this.radius); //移动坐标原点
        this.ctx.rotate(Math.PI); //旋转
        this.ctx.beginPath(); //创建路径
        //Math 对象用于执行数学任务。
        var x = Math.sin(0);
        var y = Math.cos(0);
        var dig = Math.PI / 5 * 4;
        for (var i = 0; i < 5; i++) { //画五角星的五条边  
            var x = Math.sin(i * dig);
            var y = Math.cos(i * dig);
            this.ctx.lineTo(x * 26, y * 26);//五角星线长
        }
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.restore();
    }
    //机构名称
    roundSeal.prototype._drawGroupName = function _drawGroupName() {
        if (this.groupName.length > 19) {
            throw new RangeError('公司名称最多只能为19个字符！');
        }
        this._drawText(this.groupName, this.groupNameFontSize, false, false);
    };
    //印章类型名称
    roundSeal.prototype._drawSealName = function _drawSealName() {
        if (typeof this.drawSealName !== 'string') {
            throw new TypeError('印章类型名称只能为字符串！');
        }
        this._drawText(this.drawSealName, this.typeNameFontSize, true, false);
    }
    roundSeal.prototype._drawSecurityCode = function _drawSecurityCode() {
        if (typeof this.securityCode !== 'string') {
            throw new TypeError('防伪码只能为字符串！');
        }
        if (this.securityCode.length !== 13) {
            throw new RangeError('防伪码只能为13位！');
        }
        this._drawText(this.securityCode, this.securityCodeFontSize, false, true);
    };
    roundSeal.prototype._drawText = function _drawText(text, fontSize, isTypeName, isSecurityCode) {
        var i, letter;
        this.ctx.save();
        this.ctx.fillStyle = this.color;
        this.ctx.font = 'normal normal bold ' + fontSize + 'px ' + this.fontFamily;
        this.ctx.textBaseline = 'middle'; //法在画布上定位文本时
        //印章名称=true,公司，防伪码=false
        if (isTypeName) {
            this.ctx.textAlign = 'center';
        } else {
            this.ctx.textAlign = 'center';
        }
        this.ctx.translate(this.radius, this.radius);
        //印章名称=true,公司，防伪码=false
        if (isTypeName) {
            //印章名称
            this.ctx.fillText(text, 0, this.charactLocation, this.typeNameMaxWidth);
        } else {
            //公司，防伪码
            for (i = 0; i < text.length; i++) {
                letter = text[i];
                if (isSecurityCode) {
                    //防伪码
                    this._drawLetter(letter, 0.57 - i * 0.1, -this.securityCodeFontSize / 2, this.radius * 0.8, 20, false);
                } else {
                    //公司名称

                    this._drawLetter(letter, i * this.step, -fontSize / 2, -this.radius * this.lineTextGap, this.companyFontWidth, true);
                }
            }
        }
        this.ctx.restore();
    }

    roundSeal.prototype._drawLetter = function _drawLetter(letter, angle, x, y, maxwidth, isTranslate) {
        console.log(this.math)
        if (isTranslate) {
            this.ctx.save();
            this.ctx.rotate(angle);
            // alert(angle)
            // var math = document.getElementById('mathPP').value
            // 40 15
            //控制文字离中心点的位置，往左、往上为负值，以画布的一半作为计算
            // -50, 22.5 260°的X,Y值
            //  var drgree = this.math / 4 + Math.PI  //260°文字旋转值
            this.ctx.translate(-50, 22.5); // 平移到此位置,此时字和x轴垂直，第一个参数是与圆外边的距离，越大距离越近
            var drgree = this.math / 4 + Math.PI
            this.ctx.rotate(drgree); // 文字旋转,让字平行于x轴
            this.ctx.fillText(letter, 0, 0, maxwidth); // 此点为字的中心点 //
            //  ctx.fillText(letter, -45, 25); // 此点为字的中心点 //
            //maxWhdthNum
            this.ctx.restore();
            //  }
        } else {
            this.ctx.save();
            this.ctx.rotate(angle);
            this.ctx.fillText(letter, 0, y, maxwidth);
            this.ctx.restore();
        }
    }

    var wafaSeal = {
        roundSeal,
        // PersonSeal
    };


    window.wafaSeal = wafaSeal;


})();