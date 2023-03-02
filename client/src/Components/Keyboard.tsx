import './Keyboard.css'
import React from 'react'
export default function Keyboard(props: { guess: string, correctAnswer: string, answer: string, setAnswer: React.Dispatch<React.SetStateAction<string>>, setGuess: React.Dispatch<React.SetStateAction<string>>, setRow: React.Dispatch<React.SetStateAction<number>>, words : string[]}) {
    interface checkedLettersInterface {
        [key: string]: { guessed: boolean, correct: boolean, correctPlace: boolean };
    }
    const [checkedLetters, setCheckedLetters] = React.useState<checkedLettersInterface>({ "Q": { guessed: false, correct: false, correctPlace: false }, "W": { guessed: false, correct: false, correctPlace: false }, "E": { guessed: false, correct: false, correctPlace: false }, "R": { guessed: false, correct: false, correctPlace: false }, "T": { guessed: false, correct: false, correctPlace: false }, "Y": { guessed: false, correct: false, correctPlace: false }, "U": { guessed: false, correct: false, correctPlace: false }, "I": { guessed: false, correct: false, correctPlace: false }, "O": { guessed: false, correct: false, correctPlace: false }, "P": { guessed: false, correct: false, correctPlace: false }, "A": { guessed: false, correct: false, correctPlace: false }, "S": { guessed: false, correct: false, correctPlace: false }, "D": { guessed: false, correct: false, correctPlace: false }, "F": { guessed: false, correct: false, correctPlace: false }, "G": { guessed: false, correct: false, correctPlace: false }, "H": { guessed: false, correct: false, correctPlace: false }, "J": { guessed: false, correct: false, correctPlace: false }, "K": { guessed: false, correct: false, correctPlace: false }, "L": { guessed: false, correct: false, correctPlace: false }, "Z": { guessed: false, correct: false, correctPlace: false }, "X": { guessed: false, correct: false, correctPlace: false }, "C": { guessed: false, correct: false, correctPlace: false }, "V": { guessed: false, correct: false, correctPlace: false }, "B": { guessed: false, correct: false, correctPlace: false }, "N": { guessed: false, correct: false, correctPlace: false }, "M": { guessed: false, correct: false, correctPlace: false }, "Backspace": { guessed: false, correct: false, correctPlace: false }, "Enter": { guessed: false, correct: false, correctPlace: false } })
    const rowOne = "QWERTYUIOP"
    const rowOneArr = rowOne.split('');
    const rowTwo = "ASDFGHJKL"
    const rowTwoArr = rowTwo.split('')
    const rowThree = "Backspace Z X C V B N M Enter"
    const rowThreeArr = rowThree.split(' ')
    console.log(checkedLetters);
    
    function checkLetter(letter: string) {
        if (props.correctAnswer.includes(letter) && props.guess.includes(letter) && checkedLetters[letter].guessed === false && props.correctAnswer.indexOf(letter) === props.guess.indexOf(letter)) {
            setCheckedLetters((prev) => { return { ...prev, [letter]: { guessed: true, correct: true, correctPlace: true } } })
            return
        }
        if (props.correctAnswer.includes(letter) && props.guess.includes(letter) && checkedLetters[letter].guessed === false && props.correctAnswer.indexOf(letter) !== props.guess.indexOf(letter)) {
            setCheckedLetters((prev) => { return { ...prev, [letter]: { guessed: true, correct: true, correctPlace: false } } })
            return
        }
        if (!props.correctAnswer.includes(letter) && props.guess.includes(letter) && checkedLetters[letter].guessed === false) {
            setCheckedLetters((prev) => { return { ...prev, [letter]: { guessed: true, correct: false, correctPlace: false } } })
            return
        }
       if(checkedLetters[letter].guessed === true&&checkedLetters[letter].correctPlace===false && props.guess.includes(letter)===true&&props.correctAnswer.includes(letter)===true&&props.correctAnswer.indexOf(letter)===props.guess.indexOf(letter)){
              setCheckedLetters((prev) => { return { ...prev, [letter]: { guessed: true, correct: true, correctPlace: true } } })
       }
       return
    }
    function handleClick(letter: string) {
        if (letter === "Backspace") {
            props.setAnswer(props.answer.slice(0, -1))
            return
        }
        if (letter === "Enter" && props.answer.length === 5&&props.words.includes(props.answer)) {
            props.setGuess(props.answer)
            props.setAnswer("");
            props.setRow((prev) => prev + 1);
        }
        if (letter === "Enter" && props.answer.length === 5&&!props.words.includes(props.answer)) {
           alert("Not in word list")
        }
        if (props.answer.length < 5 && letter.length === 1) { props.setAnswer(props.answer + letter) }
    }
    function styleLetters(letter: string) {
        if (checkedLetters[letter].correct && checkedLetters[letter].correctPlace) {
            return "letter correct"
        }
        if (checkedLetters[letter].correct && !checkedLetters[letter].correctPlace) {
            return "letter almost"
        }
        if (!checkedLetters[letter].correct&&checkedLetters[letter].guessed) {
            return "letter incorrect"
        }
        return "letter"
    }
    return <div className='keyboardWrapper'>
        <div className='rowOne'>
            {rowOneArr.map(letter => { checkLetter(letter); return (<button onClick={() => handleClick(letter)} className={styleLetters(letter)}>{letter}</button>) })}
        </div>
        <div className='rowTwo'>
            {rowTwoArr.map(letter => { checkLetter(letter); return (<button onClick={() => handleClick(letter)} className={styleLetters(letter)}>{letter}</button>) })}
        </div>
        <div className='rowThree'>
            {rowThreeArr.map(letter => { checkLetter(letter); return (<button onClick={() => handleClick(letter)} className={(letter.length > 1 ? 'action ' : styleLetters(letter))}>{letter}</button>) })}
        </div>
    </div>
}