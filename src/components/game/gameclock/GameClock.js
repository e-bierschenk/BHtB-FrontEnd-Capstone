import { useState } from "react";

export const GameClock = ({ startTime }) => {
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [clockUpdate, setClockUpdate] =useState(0)

    let newMinutes = 0
    let newSeconds = 0


    useEffect(() => {
        console.log(`initializing interval`);
        const interval = setInterval(() => {
          updateTime();
        }, 1000);
      
        return () => {
          console.log(`clearing interval`);
          clearInterval(interval);
        };
      }, []);

    // Update the count down every 1 second
    setInterval(() => {

        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = now - startTime;

        // Time calculations for days, hours, minutes and seconds
        newMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        newSeconds = Math.floor((distance % (1000 * 60)) / 1000);

        setMinutes(newMinutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}))
        setSeconds(newSeconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}))

        // setClockUpdate(clockUpdate+1)

    }, 1000)

    return (<>
        <h3 className="clock">{minutes}:{seconds}</h3>
    </>
    )
}