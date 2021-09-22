// Controller.js

export default function Controller({ $app, initialState, onSpin}) {
    this.state = initialState;

    this.onSpin = onSpin;

    this.$target = document.createElement('div');
    this.$target.className = 'controller';
    $app.appendChild(this.$target);

    // setState
    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    // render
    this.render = () => {
        this.$target.innerHTML = `
            <button id="spinBtn" type="button">스핀</button>
        `;

        const startBtn = this.$target.querySelector('button');
        startBtn.addEventListener('click', (e) => {
            this.onSpin();
        });

        // event
    }

    this.render();
}