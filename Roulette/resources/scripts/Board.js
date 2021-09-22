// Board.js

export default function Board({ $app, initialState }) {
    this.state = initialState;

    this.$target = document.createElement('div');
    this.$target.className = 'boardContainer';
    $app.appendChild(this.$target);

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
                    <input class="rank" type="number" readonly value="${i}">
                </td>
                <td>
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
        <button id="addBtn" type="button">추가</button>
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
}