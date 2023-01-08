const audioClips1 = [
    {keyCode:81,keyTrigger:"Q",id:"Heater-1",url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"},
    {keyCode:87,keyTrigger:"W",id:"Heater-2",url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"},
    {keyCode:69,keyTrigger:"E",id:"Heater-3",url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"},
    {keyCode:65,keyTrigger:"A",id:"Heater-4",url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"},
    {keyCode:83,keyTrigger:"S",id:"Clap",url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"},
    {keyCode:68,keyTrigger:"D",id:"Open-HH",url:"https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"},
    {keyCode:90,keyTrigger:"Z",id:"Kick-n'-Hat",url:"https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"},
    {keyCode:88,keyTrigger:"X",id:"Kick",url:"https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"},
    {keyCode:67,keyTrigger:"C",id:"Closed-HH",url:"https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"}
];
    
const audioClips2 = [
    {keyCode:81,keyTrigger:"Q",id:"Chord-1",url:"https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"},
    {keyCode:87,keyTrigger:"W",id:"Chord-2",url:"https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"},
    {keyCode:69,keyTrigger:"E",id:"Chord-3",url:"https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"},
    {keyCode:65,keyTrigger:"A",id:"Shaker",url:"https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"},
    {keyCode:83,keyTrigger:"S",id:"Open-HH",url:"https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"},
    {keyCode:68,keyTrigger:"D",id:"Closed-HH",url:"https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"},
    {keyCode:90,keyTrigger:"Z",id:"Punchy-Kick",url:"https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"},
    {keyCode:88,keyTrigger:"X",id:"Side-Stick",url:"https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"},
    {keyCode:67,keyTrigger:"C",id:"Snare",url:"https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"}
];

// Main component
function App () {
    const [power, setPower] = React.useState('ON');
    const [volume, setVolume] = React.useState(0.5);
    const [soundKit, setSoundKit] = React.useState(audioClips1);
    const [display, setDisplay] = React.useState('');
    

    
    React.useEffect(() => {
        document.addEventListener('volumechange', setDisplay('Volume: ' + Math.floor(volume * 100)));
        return () => {
            document.removeEventListener('volumechange',  setDisplay('Volume: ' + Math.floor(volume * 100)));
        }
    }, [volume]);


    const changeSound = () => {
        if (power == 'ON') {
            if (soundKit == audioClips1) {
                setSoundKit(audioClips2);
                setDisplay("Heater Kit");
            } else {
                setSoundKit(audioClips1);
                setDisplay("Smooth Piano Kit");
            }
        }
    };

    return (
        <div className="p-5 bg-danger-subtle min-vh-100 d-flex justify-content-center align-items-center">
            <div className="text-white container-md bg-secondary rounded-end-circle border border-4 border-dark-subtle d-inline-flex align-items-center" id="drum-machine">
                <div className="my-2 row-cols-4" id="keyPad">
                    {soundKit.map(clip => (
                        <Pad key={clip.id} clip={clip} volume={volume} setDisplay={setDisplay} power={power}/>
                    ))}
                </div>
                <div className="row" id="controls-container">
                    <div className={`fw-bold btn btn-sm btn-light border ${power == 'OFF' && 'bg-danger'}`} onClick={() => {
                        if (power == 'ON') {
                            setPower('OFF'); 
                            setDisplay('Power: OFF')
                        } else {
                            setPower('ON');
                            setDisplay('Power: ON')
                        }
                    }} id="power-control">
                        Power
                    </div>
                    <div className="fw-bold text-center p-2 bg-black" id="display">
                        {display}
                    </div>
                    <div id="volume">
                        <input type="range" step='0.01' min="0" max="1" value={volume} onChange={e => power == 'ON' && setVolume(e.target.value)}></input>
                    </div>
                    <div className='fw-bold btn btn-sm border btn-light' onClick={changeSound} id="bank-control">
                        Bank
                    </div>
                </div>
            </div>
        </div>
    );
};

// The functionality of the key
function Pad ({clip, volume, setDisplay, power}) {
    const [active, setActive] = React.useState(false);
    
    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        }
    })
    
    
    const handleKeyPress = (e) => {
        if (e.keyCode == clip.keyCode) {
            playAudio();
        }
    }
    
    
    const playAudio = () => {
        if (power == 'ON') {
            const audioTag = document.getElementById(clip.keyTrigger);
            setActive(true);
            setTimeout(() => setActive(false), 100);
            audioTag.volume = volume;
            audioTag.currentTime = 0;
            audioTag.play();
            setDisplay(clip.id);
        }
    }

    return (
        <div className={`drum-pad btn btn-light p-3 m-1 ${active && 'bg-danger-subtle'}` } id={clip.id} 
            onClick={playAudio}>
            <audio className="clip" id={clip.keyTrigger} src={clip.url}></audio>
            {clip.keyTrigger}
        </div>
    )
};



ReactDOM.render(<App />, document.getElementById('root'))