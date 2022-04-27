import { useState } from "react";

export const GameClock = ({ startTime }) => {
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)


    // Update the count down every 1 second
    setInterval(() => {

        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = now - startTime;

        // Time calculations for days, hours, minutes and seconds
        const newMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const newSeconds = Math.floor((distance % (1000 * 60)) / 1000);

        setMinutes(newMinutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}))
        setSeconds(newSeconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}))

    }, 1000)

    return (<>
        <h3>{minutes}:{seconds}</h3>
    </>

    )
}