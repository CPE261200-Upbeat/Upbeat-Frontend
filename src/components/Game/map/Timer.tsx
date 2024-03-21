interface TimerProps {
    timeLeft : number
}
  
export function Timer({timeLeft} : TimerProps) {
return (
    <div className="timeLeft"> {timeLeft} </div>
    )
}

export default Timer;
  