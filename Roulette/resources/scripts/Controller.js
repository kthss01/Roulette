// Controller.js

export default function Controller({ $app, initialState, onSpin, onMultiPlus, onMultiMinus}) {
    this.state = initialState;

    this.onSpin = onSpin;
    this.onMultiPlus = onMultiPlus;
    this.onMultiMinus = onMultiMinus;

    this.$target = document.createElement('div');
    this.$target.className = 'controller';
    $app.appendChild(this.$target);

    // setState
    this.setState = nextState => {
        this.state = nextState;
        // this.render();
    }

    // render
    this.render = () => {
        this.$target.innerHTML = `
        <button id="spinBtn" type="button">스핀</button>
        <button id="multiPlusBtn" type="button">+</button>
        <button id="multiMinusBtn" type="button">-</button>
        `;    

        // event
        const startBtn = this.$target.querySelector('#spinBtn');
        startBtn.addEventListener('click', (e) => {
            this.onSpin();
        });
        const multiPlusBtn = this.$target.querySelector('#multiPlusBtn');
        multiPlusBtn.addEventListener('click', (e) => {
            this.onMultiPlus();
        });
        const multiMinusBtn = this.$target.querySelector('#multiMinusBtn');
        multiMinusBtn.addEventListener('click', (e) => {
            this.onMultiMinus();
        });
    }
    
    this.render();

}