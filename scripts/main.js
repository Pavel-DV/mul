'use strict'

const numbersContainer = document.getElementById('numbers')
const maxNumber = 10
const answersCount = 4

const state = { check: 0 }

const utter = new SpeechSynthesisUtterance()
utter.lang = 'ru-RU'

const { x, y } = newProblem()
sayCurrentProblem(x, y)


function newProblem() {
    numbersContainer.innerHTML = ''

    const x = Math.floor(Math.random() * maxNumber)
    const y = Math.floor(Math.random() * maxNumber)

    document.getElementById('rus-button').onclick = () => setRus(x, y)
    document.getElementById('eng-button').onclick = () => setEng(x, y)

    print(x)
    print('x')
    print(y)
    print('=')

    const rightAnswer = x * y
    const rightAnswerIndex = Math.floor(Math.random() * answersCount + 1)

    for (let i = 1; i <= answersCount; i += 1) {
        const randomAnswer = rightAnswerIndex === i
            ? rightAnswer
            : Math.floor(Math.random() * maxNumber * maxNumber)

        print(randomAnswer, i === 1, x, y)
    }

    return { x, y }
}

function elementOnClick(number, x, y) {
    speechSynthesis.cancel()

    if (number === x * y) {
        say(getYes(utter.lang))
        const { x, y } = newProblem()
        sayCurrentProblem(x, y)
        state.check += 1
    } else {
        say(number)
        state.check -= 1
    }

    document.getElementById('check').innerText = state.check
}

function say(str) {
    utter.text = str
    speechSynthesis.speak(utter)
}

function sayCurrentProblem(x, y) {
    const method = utter.lang === 'ru-RU' ?
        ' умножить на '
        : ' times '

    say(x + method + y)
}

function setRus(x, y) {
    utter.lang = 'ru-RU'
    sayCurrentProblem(x, y)
}

function setEng(x, y) {
    utter.lang = 'en-US'
    sayCurrentProblem(x, y)
}

function getYes(lang) {
    const yesPhrases = {
        'en-US': [
            'Yes yes Xooshka pirdooshka!',
            'Very good!',
            'Nice!',
        ],
        'ru-RU': [
            'Правильно!',
            'Супер-пупер!',
            'Да да Ксюшка-пирдушка, молодец!',
            'Сиська, ты красавица!',
            'Круто!',
            'Вот это да, пирдуха!',
            'Молодец, сосиска!',
            'Умница, жопа!',
            'Ого, ты лучше всех!',
        ],
    }

    const intlPhrases = yesPhrases[lang]
    const randomPhraseIndex = Math.floor(Math.random() * intlPhrases.length)
    return intlPhrases[randomPhraseIndex]
}

function print(str, isNewLine, x, y) {
    const numberElement = document.createElement('div')
    numberElement.innerText = str
    numberElement.dataset.number = str
    numberElement.onclick = () => elementOnClick(str, x, y)
    numberElement.className = 'button number-element'

    if (str <= 10) {
        numberElement.classList.add('red')
    } else {
        numberElement.classList.add('green')
    }

    if (isNewLine) {
        numberElement.classList.add('first-in-line')
    }

    numbersContainer.appendChild(numberElement)
}
