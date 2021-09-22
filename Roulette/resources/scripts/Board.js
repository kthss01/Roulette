// Board.js

export default function Board({ $app, initialState, onAdd, onEdit, onDelete }) {
    this.state = initialState;

    this.$target = document.createElement('div');
    this.$target.className = 'boardContainer';
    $app.appendChild(this.$target);

    this.onAdd = onAdd;
    this.onEdit = onEdit;
    this.onDelete = onDelete;

    // setState
    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    // render
    this.render = () => {

        const { fillStyles, players } = this.state;

        const playersData = players.map((player, i) => {
            return `
            <tr>
                <td>
                    <input class="rank" type="number" readonly>
                </td>
                <td>
                    <input class="playerId" type="hidden" value="${i}">
                    <input class="player" type="text" value="${player}">
                </td>
                <td>
                    <button class="editBtn" type="button">수정</button>
                    <button class="deleteBtn" type="button">삭제</button>
                </td>
            </tr>
            `
        }).join('');

        this.$target.innerHTML = `
        <div>
            <input id="addInput" type="text" placeholder="이름을 입력하세요">
            <button class="addBtn" type="button">추가</button>
        </div>
        <table id='board'>
            <caption>보드판</caption>
            <tr>
                <th>등수</th>
                <th>이름</th>
                <th>수정/삭제</th>
            </tr>
            ${playersData}
        </table>
        `;
    }

    // event
    this.$target.addEventListener('click', (e) => {
        const targetClass = e.target.className;
        //console.log(e.target.tagName);
        if (targetClass === 'editBtn') { // edit
            const playerName = e.target.parentNode.parentNode.querySelector('.player').value;
            const playerId = e.target.parentNode.parentNode.querySelector('.playerId').value
            if (playerName) // 값이 있을 때만
                this.onEdit(playerName, playerId);
        } else if (targetClass === 'deleteBtn') { // delete
            const playerId = e.target.parentNode.parentNode.querySelector('.playerId').value
            this.onDelete(playerId);
        } else if (targetClass === 'addBtn') { // add
            const playerName = e.target.parentNode.querySelector('#addInput').value;                    
            if (playerName) // 값이 있을 때만
                this.onAdd(playerName);
        }
    })
}