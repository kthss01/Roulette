// Roulette.js

export default function Roulette({ $app, initialState, onWin }) {
    this.state =  initialState;
    
    this.onWin = onWin;

    this.$target = document.createElement('div');
    this.$target.id = 'canvasContainer';
    $app.appendChild(this.$target);

    // 당첨 처리
    this.alertPrize = () => {
        let winningSegment = this.wheel.getIndicatedSegment();

        const winner = winningSegment.text;

        this.wheel.segments.forEach((segment) => {
            if (segment) {
                if (winner === segment.text) {
                    onWin(winner);
                    return false; // break
                }
            }
        })

        alert(`${winner}팀이 당첨되었습니다!`);
    }

    // sound
    let audio = new Audio('./resources/sounds/tick.mp3');

    this.playSound = () => {
        audio.currentTime = 0;
        audio.play();
    }

    // setState
    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    // render
    this.render = () => {
        this.$target.innerHTML = `
        <canvas id="canvas" width="800" height="500">
            Canvas not supported, please user another browser.
        </canvas>
        <img id="prizePointer" src="./resources/images/basic_pointer.png" alt="V" />
        `;

        const { fillStyles, players, ranks, multiply } = this.state;

        let showPlayer = players.filter((v, i) => ranks[i] === 0);
        const segments = [];
        let color = 1;

        showPlayer = showPlayer.length === 0 ? players : showPlayer;

        const isOdd = showPlayer.length % 2 === 1;

        for (let i = 0; i < multiply; i++) {
            showPlayer.forEach((player, index) => {
                // if (isOdd)
                //     console.log(i, index);
                segments.push({
                    'fillStyle' : isOdd && i === 0 && index === 0 ? '#15B041' : fillStyles[color++ % fillStyles.length],
                    'text' : player,
                    'textFillStyle': 'white',
                    'textFontWeight': 'bold',
                });
            });
        }
            
        // console.log(segments);
        // console.log(segments.length);

        this.wheel = new Winwheel({
            'numSegments': segments.length,
            'innerRadius': 140, 
            'outerRadius': 200,
            'segments': segments,
            'textMargin': 0,
            // 'textOrientation' : 'vertical', 
            'textFontSize': 31,
            'textOrientation' : 'curved', 
            'animation': {
                'type': 'spinToStop',
                'duration': 10,
                'spins': 16,
                'callbackSound': this.playSound, // Specify function to call when sound is to be triggered.
                'soundTrigger': 'pin', // Pins trigger the sound for this animation.
                // Remember to do something after the animation has finished specify callback function.
                'callbackFinished': this.alertPrize,
            }, 
            'pins': // Display pins, and if desired specify the number.
            {
                'number': segments.length
            }
        });

        if (this.state.isSpin) {
            this.wheel.startAnimation();
        }
    }

    this.render();
}