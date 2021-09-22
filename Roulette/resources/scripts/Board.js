// Board.js

export default function Board({ $app, initialState, onAdd, onEdit, onDelete, onSpin, onMultiPlus, onMultiMinus }) {
    this.state = initialState;

    this.$target = document.createElement('div');
    this.$target.className = 'boardContainer';
    $app.appendChild(this.$target);

    this.onAdd = onAdd;
    this.onEdit = onEdit;
    this.onDelete = onDelete;
    this.onSpin = onSpin;
    this.onMultiPlus = onMultiPlus;
    this.onMultiMinus = onMultiMinus;

    // setState
    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    // render
    this.render = () => {

        const { players, ranks } = this.state;

        const playersData = players.map((player, i) => {
            return `
            <tr>
                <td>
                    <input class="rank" type="number" value="${ranks[i] !== 0 ? ranks[i] : ''}" readonly>
                </td>
                <td>
                    <input class="playerId" type="hidden" value="${i}">
                    <input class="player" type="text" value="${player}">
                </td>
                <td>
                    <button class="editBtn action-button shadow animate blue" type="button">수정</button>
                    <button class="deleteBtn action-button shadow animate red" type="button">삭제</button>
                </td>
            </tr>
            `
        }).join('');

        this.$target.innerHTML = `
        <table id='boardTable' border="1">
            <caption><button class="spinBtn action-button shadow animate green" type="button">Spin</button></caption>
            <tr>
                <th>등수</th>
                <th>이름</th>
                <th>컨트롤</th>
            </tr>
            <tr>
                <td colspan="2">
                    <input id="addInput" type="text" placeholder="이름을 입력하세요">        
                </td>
                <td>
                    <button class="addBtn action-button shadow animate yellow" type="button">추가</button>        
                    <button class="multiPlusBtn action-button shadow animate blue" type="button">+</button>
                    <button class="multiMinusBtn action-button shadow animate red" type="button">-</button>
                </td>
            </tr>
            ${playersData}
        </table>
        `;
    }

    // event
    this.$target.addEventListener('click', (e) => {
        //console.log(e.target.tagName);
        const targetClassList = e.target.className.split(' ');
        targetClassList.forEach((targetClass) => {
            if (targetClass === 'editBtn') { // edit
                const playerName = e.target.parentNode.parentNode.querySelector('.player').value;
                const playerId = e.target.parentNode.parentNode.querySelector('.playerId').value
                if (playerName) // 값이 있을 때만
                    this.onEdit(playerName, playerId);
            } else if (targetClass === 'deleteBtn') { // delete
                const playerId = e.target.parentNode.parentNode.parentNode.querySelector('.playerId').value
                this.onDelete(playerId);
            } else if (targetClass === 'addBtn') { // add
                const playerName = e.target.parentNode.parentNode.querySelector('#addInput').value;                    
                if (playerName) // 값이 있을 때만
                    this.onAdd(playerName);
            } else if (targetClass === 'spinBtn') {
                this.onSpin();
            } else if (targetClass === 'multiPlusBtn') {
                this.onMultiPlus();
            } else if (targetClass === 'multiMinusBtn') {
                this.onMultiMinus();
            }
        });
    })
}