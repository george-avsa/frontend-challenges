const calculator = document.querySelector('.calculator__display')
const keyboard = document.querySelector('.keyboard')
const keyboardItems = [7, 8, 9, 'DEL', 4, 5, 6, '+', 1, 2, 3, '-', '.', 0, '/', 'x', 'RESET', '=']


class Calculator {
    constructor() {
        this.previousValue = null
        this.currentValue = '0'
        this.operand = null
    }

    setOperand(str) {
        this.operand = str
    }

    newValue(c) {
        if (!Number.isNaN(Number.parseInt(c))) {
            if (this.currentValue.length < 7) {
                if (this.currentValue === '0') {
                    this.currentValue = c
                } else {
                    this.currentValue += c 
                }
            }
            calculator.innerText = this.currentValue 
        } else if (c == 'DEL') {
            if (this.currentValue.length > 1) {
                this.currentValue = this.currentValue.slice(0, -1)   
            } else { 
                this.currentValue = '0'   
            }
            calculator.innerText = this.currentValue 
        } else if (c == 'RESET') {
            this.previousValue = null
            this.currentValue = '0'
            this.operand = null
            calculator.innerText = this.currentValue 
        } else if (c == '=') {
            if (this.operand == '+') {
                calculator.innerText = Number.parseFloat(this.previousValue) + Number.parseFloat(this.currentValue) 
            } else if (this.operand == '/') {
                calculator.innerText = Number.parseFloat(this.previousValue) / Number.parseFloat(this.currentValue) 
            }  else if (this.operand == 'x') {
                calculator.innerText = Number.parseFloat(this.previousValue) * Number.parseFloat(this.currentValue) 
            } else if (this.operand == '-') {
                calculator.innerText = Number.parseFloat(this.previousValue) - Number.parseFloat(this.currentValue) 
            }
            console.log(this.previousValue + this.currentValue + this.operand)
        } else if (c == '.') {
            if (this.currentValue.length < 7 && !this.currentValue.includes('.')) {
                this.currentValue += '.'
                calculator.innerText = this.currentValue 
            } 
        } else {
            if (this.currentValue !== '0') {
                this.previousValue = this.currentValue
                this.currentValue = '0'
                calculator.innerText = this.currentValue 
                this.operand = c
            }
        }
    }
}

let calculatorClass = new Calculator()

function handleClick(e) {
    calculatorClass.newValue(e.target.innerText)
}

function createKeyboard() {
    keyboardItems.forEach(item => {
        const keyboardItem = document.createElement('div')
        keyboardItem.classList.add('keyboard__item')
        const keyboardBody = document.createElement('div')
        keyboardBody.classList.add('keyboard__body')
        keyboardBody.innerText = item
        if (item == 'DEL') {
            keyboardItem.classList.add('keyboard__item--delete')
            keyboardBody.classList.add('keyboard__body--delete')
        } else if (item == 'RESET') {
            keyboardItem.classList.add('keyboard__item--reset')
            keyboardBody.classList.add('keyboard__body--reset')
        } else if (item == '=') {
            keyboardItem.classList.add('keyboard__item--equal')
            keyboardBody.classList.add('keyboard__body--equal')
        }
        keyboardBody.addEventListener('click', handleClick)
        keyboardItem.append(keyboardBody)
        keyboard.append(keyboardItem)
    })
}
    
addEventListener('DOMContentLoaded', () => {
    createKeyboard()
    calculator.innerText = 0
})

function switchSLide(e) {
    const circle = document.querySelector('.theme-switcher__btn')
    const id = e.target.getAttribute('id')

    if (id == 1) {
        circle.style.left = '5px'
    } else if (id == 2) {
        circle.style.left = '27px'
    } else if (id == 3) {
        circle.style.left = '50px'
    }
}

const switchSections = document.querySelectorAll('.theme-switcher__section')
switchSections.forEach(el => {
    el.addEventListener('click', switchSLide)
})
const switchBody = document.querySelector('.theme-switcher__switch')