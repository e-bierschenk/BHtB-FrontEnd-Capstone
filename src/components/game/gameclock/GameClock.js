import { useState, useEffect } from "react";
import "./GameClock.css"


export const GameClock = ({ startTime }) => {
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)


    useEffect(() => {
        const interval = setInterval(() => {
          updateTime();
        }, 1000);
      
        return () => {
          clearInterval(interval);
        };
      }, []);

      function updateTime() {
        const distance = new Date() - startTime
        const newMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        const newSeconds = Math.floor((distance % (1000 * 60)) / 1000).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})

        setMinutes(newMinutes)
        setSeconds(newSeconds)
      }

    return (<>
        <h3 className="clock">{minutes}:{seconds}</h3>
    </>
    )
}