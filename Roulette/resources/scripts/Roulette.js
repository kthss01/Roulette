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
                // console.log(segment.text);
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
        <canvas id="canvas" width="800" height="600">
            Canvas not supported, please user another browser.
        </canvas>
        <img id="prizePointer" src="./resources/images/basic_pointer.png" alt="V" />
        `;

        const { fillStyles, players, ranks } = this.state;

        let segments = players.filter((v, i) => ranks[i] === 0);
        if (segments.length !== 0) {
            segments = segments.map((player, index) => {
                return {
                    'fillStyle' : fillStyles[index % fillStyles.length],
                    'text' : player
                }
            });
        } else {
            segments = players.map((player, index) => {
                return {
                    'fillStyle' : fillStyles[index % fillStyles.length],
                    'text' : player
                }
            });
        }

        // console.log(segments);

        this.wheel = new Winwheel({
            'numSegments': segments.length,
            'outerRadius': 200,
            'segments': segments,
            'textOrientation' : 'vertical', 
            //'textOrientation' : 'curved', 
            'animation': {
                'type': 'spinToStop',
                'duration': 10,
                'spins': 8,
                'callbackSound': this.playSound, // Specify function to call when sound is to be triggered.
                'soundTrigger': 'pin', // Pins trigger the sound for this animation.
                // Remember to do something after the animation has finished specify callback function.
                'callbackFinished': this.alertPrize,
            }, 
            'pins': // Display pins, and if desired specify the number.
            {
                'number': 16
            }
        });

        if (this.state.isStart) {
            this.wheel.startAnimation();
        }
    }

    this.render();
}