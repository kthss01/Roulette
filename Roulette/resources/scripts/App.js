// App.js

import Roulette from "./Roulette.js";
import Board from "./Board.js";
import Controller from "./Controller.js";

const PALETTE = [
    '#FFADAD', 
    '#FFD6A5', 
    '#FDFFB6', 
    '#CAFFBF', 
    '#9BF6FF', 
    '#A0C4FF', 
    '#BDB2FF', 
    '#FFC6FF',
]

export default function App($app) {
    // const playerNum = 4;
    // let multiply = 1;

    // this.makePlayer = (cnt, multiply) => {
    //     const players = new Array(cnt * multiply).fill(0);
    //     return players.map((v, i) => ((i % playerNum) + 1) .toString());
    // }

    this.state = {
        fillStyles: PALETTE,
        // players: this.makePlayer(playerNum, multiply),
        players: ["1", "2", "3", "4"]
    };

    // Controller
    const controller = new Controller({
        $app,
        initialState: this.state,
        onSpin: () => {
            this.setState({
                ...this.state,
                isStart: true
            })
        },
        onMultiPlus: () => {

        },
        onMultiMinus: () => {

        },
    })

    // Roulette
    const roulette = new Roulette({
        $app,
        initialState: this.state,
    });

    // Board
    const board = new Board({
        $app,
        initialState: this.state,
        onAdd: (player) => {
            const { players } = this.state;
            players.push(player.toString());

            this.setState({...this.state, players });
        },
        onEdit: (player, id) => {
            const { players } = this.state;
            players[id] = player;

            this.setState({...this.state, players });
        }, 
        onDelete: (id) => {
            const { players } = this.state;
            players.splice(id, 1);

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