// Spinning.js

export default function Spinning({ $app, initialState }) {
    this.state = initialState;

    this.$target = $app.querySelector('#canvasContainer');

    // setState
    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    // render
    this.render = () => {
        const { isSpin, players, ranks } = this.state;
        const remainPlayer = players.filter((p, i) => ranks[i] === 0);

        if (isSpin) {
            this.$target.style.backgroundImage = "url(./resources/images/icon_spin.gif)";
        } else if (remainPlayer.length <= 1) {
            this.$target.style.backgroundImage = "url(./resources/images/icon_end.gif)";
        }
        else {
            this.$target.style.backgroundImage = "url(./resources/images/icon_idle.gif)";
        }
    }
}