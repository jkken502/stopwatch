class Stopwatch{
    constructor(displayElement , startButton , stopButton , resetButton ) {
        //debug value
        console.log( this );
        this.displayElement = displayElement;
        this.startButton = startButton;
        this.stopButton = stopButton;
        this.resetButton = resetButton;
        this.timerRunning = false;
        this.startTime = null;
        this.endTime = null;
        this.existingTime = 0;
        this.intervalNumber = null;
        this.startButton.addEventListener( "click" , this.startTimer.bind( this ) );
        this.stopButton.addEventListener( "click" , this.stopTimer.bind( this ) );
        this.resetButton.addEventListener( "click" , this.resetTimer.bind( this ) );
        this.stopButton.setAttribute( "style" , "display:none" );
        this.resetTimer();
    }
    startTimer( e , startTime = Date.now( ) ) {
        if( this.timerRunning ) {
            return;
        }
        if( this.startTime === null ) {
            this.startTime = startTime;
        }
        this.timerRunning = true;
        this.intervalNumber = setInterval( this.updateDisplay.bind( this ) , 10 );
        this.startButton.setAttribute( "style" , "display:none" );
        this.stopButton.setAttribute( "style" , "display:inline" );
    }
    resetTimer( ) {
        if( this.timerRunning ) {
            this.stopTimer( );
        }
            this.existingTime = 0;
            this.displayElement.innerHTML = "00:00.000";
    }
    updateDisplay( currentTime = Date.now( ) ) {
        if( this.startTime === null ) {
            this.displayElement.innerHTML = "00:00.000";
            return;
        }
        let millisecondsInSecond = 1000;
        let secondsInMinute = 60;
        let minutesInHour = 60;
        let totalMilliseconds = currentTime - this.startTime + this.existingTime;
        let milliseconds = Math.floor( totalMilliseconds ) % millisecondsInSecond;
        let displayString="";
        let hours = Math.floor( totalMilliseconds / millisecondsInSecond / secondsInMinute / minutesInHour )
        if( hours > 0 ) {
            displayString += hours + ":";
        }
        let minutes = Math.floor( totalMilliseconds / millisecondsInSecond / secondsInMinute ) % minutesInHour;
        let seconds = Math.floor( totalMilliseconds / millisecondsInSecond ) % secondsInMinute;
        displayString += this.addLeadingZeros(minutes,2) + ":" + this.addLeadingZeros(seconds,2) + "." + this.addLeadingZeros(milliseconds,3);
        this.displayElement.innerHTML = displayString;
    }
    stopTimer( e , endTime = Date.now( ) ) {
        this.endTime = endTime;
        clearInterval( this.intervalNumber );
        this.timerRunning = false;
        this.updateDisplay( endTime );
        this.existingTime += this.endTime - this.startTime;
        this.startTime = null;
        this.endTime = null;
        this.startButton.setAttribute( "style" , "display:inline" );
        this.stopButton.setAttribute( "style" , "display:none" );
    }
    addLeadingZeros( number , digitSize ) {
        if( ! Number.isInteger( Number( number ) ) ) {
            return number;
        }
        number = Number( number );
        let formattedNumber = "";
        if( number < 0 ){
            formattedNumber += "-";
            number *= -1;
        }
        if( typeof number != "number" ) {
            formattedNumber += "0";
        }
        for( let i=1; i < digitSize; i++ ) {
            if( number<Math.pow( 10 , i ) ) {
                formattedNumber += "0";
            }
        }
        formattedNumber += number;
        return formattedNumber;
    }
};
export { Stopwatch };