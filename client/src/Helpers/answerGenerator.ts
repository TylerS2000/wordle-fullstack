import validAnswers from './validAnswers.json'
export default function answerGenerator(){
    return validAnswers[Math.round(Math.random()*validAnswers.length-1)]
}