import React from 'react';

const App = () => {
    const minimise = () => window.api.minimizeWindow().then((result) => {
        console.log("window.api.minimizeWindow", result);
    });
    const maximise = () => window.api.maximizeWindow().then((result) => {
        console.log("window.api.maximizeWindow", result);
    });
    const close = () => window.api.closeWindow().then((result) => {
        console.log("window:close", result);
    });

    return (
        <div className="App">
            <h1>Electron Sandbox Error1</h1>
            <button onClick={minimise}>Minimise</button>  
            <button onClick={maximise}>Maximise</button>  
            <button onClick={close}>Close</button>            
        </div>
    );
};

export default App;