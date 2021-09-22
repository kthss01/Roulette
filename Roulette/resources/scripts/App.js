// App.js

import Roulette from "./Roulette.js";
import Board from "./Board.js";
import Controller from "./Controller.js";

export default function App($app) {
    this.state = {
        fillStyles : ['#eae56f', '#89f26e', '#7de6ef', '#e7706f'],
        players : ['1', '2', '3', '4'],
    };

    this.roulette;

    // Controller
    const controller = new Controller({
        $app,
        initialState: this.state,
        onSpin: () => {
            this.setState({
                ...this.state,
                isStart: true
            })
        }
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