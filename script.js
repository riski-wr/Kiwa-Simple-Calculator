class KiwaSimpleCalculator {

  constructor() {
    this.number1
    this.number2
    this.operator
  }

  updateResult(number){
    if(txtResult.innerText == "0"){
      if (number != "0") {
          txtResult.innerText = number
          return
      }
    }
     txtResult.innerText += number
  }

  reset(){
    this.number1 = null
    this.number2 = null
    this.operator = null
  }

  clearResult(){
    txtResult.innerText = "0"
  }

  clearComputation(){
    txtComputation.innerText = ""
  }

  deleteResult(){
    if (txtResult.innerText == "" || txtResult.innerText == "0" || txtResult.innerText.length <= 1) {
         txtResult.innerText = "0"
         return
    }
    txtResult.innerText = result.innerText.toString().slice(0, -1)
  }

  updateComputation(num, operator){
    txtComputation.innerText = num + " " + operator
  }

  compute(){
    let num1 = parseFloat(this.number1)
    let num2 = parseFloat(this.number2)
    let result;
    let isFloat = false;

    if (checkFloat(num1) || checkFloat(num2)) {
        num1 *= 10
        num2 *= 10
        isFloat = true
    }

    switch (this.operator) {
      case "+":
          result = num1 + num2
        break;
      case "-":
          result = num1 - num2
        break;
      case "x":
          result = num1 * num2
        break;
      case ":":
          result = num1 / num2
        break;
      default:
    }
      if (isFloat) {
        result /= 10;
      }
      return result

  }

}

const btnNum = document.getElementsByClassName("btn-num");
const btnOperator = document.getElementsByClassName("btn-operator");
const btnEqual = document.getElementsByClassName("btn-equal");
const txtResult = document.getElementById("result");
const btnDeletes = document.getElementById("delete");
const btnClear = document.getElementById("clear");
const btnPercent = document.getElementById("percentage");
const txtComputation = document.getElementById("computation");
const resultbox = document.getElementById("resultbox");

let currentResultFontsize = "64px";

let isDarkMode = false;

const calculator = new KiwaSimpleCalculator()

for (let item of btnNum) {
    item.addEventListener('click', () => {
         calculator.updateResult(item.innerText)
         currentResultFontsize = resize_to_fit()
     })
}

for (let item of btnEqual) {
    item.addEventListener('click', () => {
        if (calculator.number1 == null) {
          return

        }
        calculator.number2 = txtResult.innerText
        calculator.clearResult()
        calculator.updateResult(calculator.compute())
        calculator.clearComputation()
        calculator.reset()
        setResultFontSizeByLength()
     })
}


for (let item of btnOperator) {
    item.addEventListener('click', () => {
        calculator.operator = item.innerText
         if (calculator.number1 != null) {
           calculator.number2 = txtResult.innerText
           calculator.updateComputation(calculator.compute(), item.innerText)
           calculator.number1 = calculator.compute(),
           calculator.clearResult()
           resetResultFontSize()
           return
         }
         calculator.updateComputation(txtResult.innerText, item.innerText)
         calculator.number1 = txtResult.innerText
         calculator.clearResult()
         resetResultFontSize()
     })
}

btnDeletes.addEventListener("click", () => {
    if (parseInt(currentResultFontsize) < 64){
      let fontSize = window.getComputedStyle(txtResult).fontSize;
      txtResult.style.fontSize = (parseFloat(fontSize) + 2) + 'px';
      currentResultFontsize = fontSize
    }
    calculator.deleteResult()
})

btnClear.addEventListener("click", ()=> {
  calculator.clearResult()
  calculator.clearComputation()
  calculator.reset()
  resetResultFontSize()

})

btnPercent.addEventListener("click", () => {
    let result = txtResult.innerText = parseFloat(txtResult.innerText) / 100
    if (result === 0) {
      resetResultFontSize()
      return
    }
    setResultFontSizeByLength()
})


function resize_to_fit() {
  let fontSize = window.getComputedStyle(txtResult).fontSize;
  if (parseFloat(fontSize) <= 32 ) {
      return fontSize
  }
  txtResult.style.fontSize = (parseFloat(fontSize) - 2) + 'px';
  return fontSize;
}

function resetResultFontSize(){
  txtResult.style.fontSize = "64px";
}

function setResultFontSize(size){
  txtResult.style.fontSize = (parseFloat(size) - 2) + 'px';
}

function setResultFontSizeByLength(){
    let fontSize = parseFloat(window.getComputedStyle(txtResult).fontSize) - (txtResult.innerText.length * 2);
    if (fontSize <= 32) {
      fontSize = 32
    }
    txtResult.style.fontSize = (parseFloat(fontSize)) + 'px';
}

function checkFloat(n){
   return Number(n) === n && n % 1 !== 0
}

// Dark Mode

const btnToggle = document.getElementById("btn-toggle");
const imgDarkButton = document.getElementById("img-dark-button");
const imgBtnUtil = document.querySelectorAll(".btn-util img");

btnToggle.addEventListener("click", () => {
    if (isDarkMode) {
      console.log(imgBtnUtil)
      document.querySelector(':root').style.setProperty('--primary-color', '#FFFFFF');
      document.querySelector(':root').style.setProperty('--secondary-color', '#EFEFEF');
      document.querySelector(':root').style.setProperty('--text-color', '#000000');
      imgDarkButton.setAttribute("src", "img/sun.svg")
      for (let item of imgBtnUtil) {
        item.style.setProperty("filter", "");
      }
      isDarkMode = false
    }else {
      document.querySelector(':root').style.setProperty('--primary-color', '#2f3640');
      document.querySelector(':root').style.setProperty('--secondary-color', '#353b48');
      document.querySelector(':root').style.setProperty('--text-color', '#ffffff');
      imgDarkButton.setAttribute("src", "img/moon.svg")
      for (let item of imgBtnUtil) {
        item.style.setProperty("filter", "invert(95%) sepia(5%) saturate(0%) hue-rotate(314deg) brightness(103%) contrast(108%)");
      }
      isDarkMode = true
    }

})

// Theme

const btnTheme = document.getElementsByClassName("theme-color")


for (let item of btnTheme) {
  item.addEventListener('click', () => {
    for (let e of btnTheme) {
      e.classList.remove("active");
    }
    item.classList.add("active");
    switch(item.dataset.color) {
      case "red":
          document.querySelector(':root').style.setProperty('--theme-color', '#FF7979');
        break;
      case "green":
            document.querySelector(':root').style.setProperty('--theme-color', '#4cd137');
        break;
      case "blue":
            document.querySelector(':root').style.setProperty('--theme-color', '#487eb0');
          break;
      case "yellow":
            document.querySelector(':root').style.setProperty('--theme-color', '#fbc531');
          break;
      default:
    }
  })
}
