import "./Main.css"
import Row from "./Row";
import WinPopup from "./WinPopup";
import answerGenerator from "../Helpers/answerGenerator";
import Keyboard from "./Keyboard";
import React, { useEffect } from "react";
import words from "../Helpers/words.json";
import io from "socket.io-client";
const socket = io();
export default function Main(){
    const [isConnected, setIsConnected] = React.useState(socket.connected);
    useEffect(() => {
        socket.on("connect", () => {
            setIsConnected(true);
        });
        socket.on("joined",(msg)=>{
            console.log(msg);
        })
        socket.on("disconnect", () => {
            setIsConnected(false);
        });
        return () => {
            socket.off("connect");
            socket.off("disconnect");
        };
    }, []);

    const [answer, setAnswer] = React.useState("");
    const [row, setRow] = React.useState(0);
    const [answers, setAnswers] = React.useState(["","","","","",""]);
    const [correctAnswer, setCorrectAnswer] = React.useState(answerGenerator().toUpperCase());
    const [guess, setGuess] = React.useState("");
    const [win, setWin] = React.useState(false);
        win ===false? onkeydown = (e) => {
            if (answer.length<5&&e.key.match(/[a-zA-Z]/)&&e.key.length<2) {
                setAnswer((prev)=>{return prev+e.key.toUpperCase()});
            }
            if (e.key === "Backspace") {
                setAnswer((prev)=>{return prev.substring(0, prev.length-1)});
            }
            if (e.key === "Enter"&&answer.length===5&&words.includes(answer.toLowerCase())) {
                setGuess(answer)
                setAnswer("");
                setRow((prev)=>prev+1);
            }
            if (e.key === "Enter"&&answer.length===5&&!words.includes(answer.toLowerCase())) {
                alert("Not in word list");
            }
        }:onkeydown=null 
        //if win is false allow typing, if it is true don't allow typing

    React.useEffect(() => {
        setAnswers((prev)=>{
            let newAnswers = [...prev];
            newAnswers[row] = answer;
            return newAnswers;
        });
    }, [answer,row]);
    //useEffect causes answer array to update with answer input
    return (
    <div className="Main">
    <button onClick={()=>socket.emit("join","1")}>Join!</button>
        <div>{win||row===6?<WinPopup answer={correctAnswer} win={win}/>:""}</div>
        <div className="AnswerGrid">
            <Row answer={answers[0]} row={0} current={row} correctAnswer={correctAnswer} win={win} setWin={setWin}/>
            <Row answer={answers[1]} row={1} current={row} correctAnswer={correctAnswer} win={win} setWin={setWin}/>
            <Row answer={answers[2]} row={2} current={row} correctAnswer={correctAnswer} win={win} setWin={setWin}/>
            <Row answer={answers[3]} row={3} current={row} correctAnswer={correctAnswer} win={win} setWin={setWin}/>
            <Row answer={answers[4]} row={4} current={row} correctAnswer={correctAnswer} win={win} setWin={setWin}/>
            <Row answer={answers[5]} row={5} current={row} correctAnswer={correctAnswer} win={win} setWin={setWin}/>
        </div>
        <Keyboard guess={guess} correctAnswer={correctAnswer} answer={answer} setAnswer={setAnswer} setGuess={setGuess} setRow={setRow} words={words}/>
    </div>
    );
    }