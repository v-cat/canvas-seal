function judge(item) {
  if (item === 'innerLineWidth' || item === 'innerLineDistance') {
    var hasInnerLines = document.getElementsByClassName('hasInnerLine')
    var mmm = hasInnerLines[1].checked
    var up = event.currentTarget.value
    if (mmm) {
      return
    } else if (up === '∧') {
         console.log(up)
      add(item)
    }else  {
         console.log(up)
      subtraction(item)
    }
  } }
 
  function subtraction(item) {
    //获取-号按钮
    // var subtraction = document.getElementsByClassName('subtraction')
    //获取文本框
    var number = document.getElementById(item)
    if (number.value <= 0 && item != 'fiveStarX') {
      //如果文本框的值小于1,则设置值为1
      number.value = 0
      alert('输入框最小值为0')
    } else {
      number.value = (Number(number.value) - 0.1).toFixed(1)
    }
    //   }

    makeEseal()
  }

  function add(item) {
    // var add = document.getElementsByClassName('add')
    var number = document.getElementById(item)
    // console.log(number.max)
    if (Number(number.value) >= Number(number.max)) {
      //如果文本框的值大于于1,则设置值为1
      number.value = number.value
      alert('输入框最大值为' + number.max)
    } else {
      number.value = (Number(number.value) + 0.1).toFixed(1)
    }
    makeEseal()
  }

function subtractionDwn(item) {
  //获取-号按钮
  // var subtraction = document.getElementsByClassName('subtraction')
  //获取文本框
  var number = document.getElementById(item)
  if (number.value <= 0 && item != 'fiveStarX') {
    //如果文本框的值小于1,则设置值为1
    number.value = 0
    alert('输入框最小值为0')
  } else {
    number.value = (Number(number.value) - 1).toFixed(1)
  }
  //   }
  makeEseal()
}
function addUp(item) {
  // var add = document.getElementsByClassName('add')
  var number = document.getElementById(item)
  // console.log(number.max)
  if (Number(number.value) >= Number(number.max)) {
    //如果文本框的值大于于1,则设置值为1
    number.value = number.value
    alert('输入框最大值为' + number.max)
  } else {
    number.value = (Number(number.value) + 1).toFixed(1)
  }
  makeEseal()
}