// node myfile.js
const pendingTimers = [];
const pendingOsTasks= [];
const pendingOperations = [];


// New timers,. tasks, operations are recorded from myFile running
myFile.runContents();

function shouldContinue() {
    // Check one: Any pending setTimeout, setInterval, setImmediate
    // Check two: Any pending OS Tasks? (Like server listening to port)
    // Check three: Any pending logn running operations? (Like fs module)
    return pendingTimers.length || pendingOsTasks.length || pendingOperations.length;
}

// Entire body executes in one 'tick'
while(shouldContinue()) {
    /*
    1) Node looks at pendingTimers and sees if any functions
    are ready to be called. setTimeout, setinterval

    2) Node looks at pendingOSTasks and pendingOperations
    and calls relavent callbacks

    3) Pause execution. Continue when...
      - a new pendingOSTask is done
      - a new pendingOperation is done
      - a timer is about to complete
    
    4) Look at pendingTimers. Call any setImmediate

    5) Handle any close events
    */
    
}

// exit back to terminal