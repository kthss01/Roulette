// App.js

import Roulette from "./Roulette.js";
import Board from "./Board.js";
import Controller from "./Controller.js";

const PALETTE = [
    // '#FFADAD', 
    // '#FFD6A5', 
    // '#FDFFB6', 
    // '#CAFFBF', 
    // '#9BF6FF', 
    // '#A0C4FF', 
    // '#BDB2FF', 
    // '#FFC6FF',
    'red',
    'black',
]

export default function App($app) {
    this.state = {
        fillStyles: PALETTE,
        players: ["1", "2", "3", "4"],
        ranks: [0, 0, 0, 0],
        isSpin: true,
        multiply: 3,
    };

    // Controller
    const controller = new Controller({
        $app,
        initialState: this.state,
        onSpin: () => {
            if (this.state.isSpin) {
                this.setState({
                    ...this.state,
                    isStart: true
                })
            }
        },
        onMultiPlus: () => {
            this.state.multiply += 1;
            this.setState(this.state);
        },
        onMultiMinus: () => {
            this.state.multiply = this.state.multiply > 1 ? this.state.multiply - 1 : this.state.multiply;
            this.setState(this.state);
        },
    })

    // Roulette
    const roulette = new Roulette({
        $app,
        initialState: this.state,
        onWin: (winner) => {
            // console.log(winner);
            const { players, ranks } = this.state;

            // console.log(ranks);

            // 순위는 정해진 순위 + 1
            const rank = ranks.filter((v) => v !== 0).length + 1;  

            players.forEach((player, index) => {
                if (player === winner && ranks[index] === 0) {
                    ranks[index] = rank;
                    return false;
                }
            });
                
            // 남은 인원 한명일 때 rank 마저 채우기
            const remainPlayer = players.filter((p, i) => ranks[i] === 0);
            if (remainPlayer.length === 1) {    
                players.forEach((player, index) => {
                    if (player === remainPlayer[0]) {
                        ranks[index] = rank + 1;
                    } 
                })
            }

            this.setState({...this.state, ranks, isStart: false, isSpin: remainPlayer.length > 1});
        }
    });

    // Board
    const board = new Board({
        $app,
        initialState: this.state,
        onAdd: (player) => {
            const { players, ranks } = this.state;
            players.push(player.toString());
            ranks.push(0);

            const remainPlayer = players.filter((p, i) => ranks[i] === 0);

            this.setState({...this.state, players, ranks, isSpin: remainPlayer.length > 1 });
        },
        onEdit: (player, id) => {
            const { players } = this.state;
            players[id] = player;

            this.setState({...this.state, players });
        }, 
        onDelete: (id) => {
            const { players, ranks } = this.state;
            players.splice(id, 1);
            ranks.splice(id, 1);

            this.setState({...this.state, players });
        }
    });

    // setState
    this.setState = (nextState) => {
        this.state = nextState;

        controller.setState(this.state);
        roulette.setState(this.state);
        board.setState(this.state);
    }

    const init = () => {
        this.setState(
            this.state
        );
    }

    init();
}