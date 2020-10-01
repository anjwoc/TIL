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
    
}

// exit back to terminal