// Comment.js

export default function Comment({ $app, initialState, onPopup }) {
    this.state = initialState;

    this.$target = document.createElement('div');
    this.$target.className = 'popupBox';
    // $app.appendChild(this.$target);
    //console.log($app.querySelector('#boardTable caption'));

    this.onPopup = onPopup;

    // setState
    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    // render 
    this.render = () => {
        $app.querySelector('#boardTable caption').appendChild(this.$target);

        this.$target.innerHTML = `
            <button class="popupBtn action-button shadow animate yellow">방명록</button>
        `;
    }

    // event
    this.$target.addEventListener('click', (e) => {
        const targetClassList = e.target.className.split(' ');

        targetClassList.forEach((targetClass) => {
            if (targetClass === 'popupBtn') {
                this.onPopup();
            }
        })
    });
}