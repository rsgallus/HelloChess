import React from 'react';
import Board from './Board.js';

const w_king = '\u2654';
const w_queen = '\u2655';
const w_rook = '\u2656';
const w_bishop = '\u2657';
const w_knight = '\u2658';
const w_pawn = '\u2659';
const b_king = '\u265A';
const b_queen = '\u265B';
const b_rook = '\u265C';
const b_bishop = '\u265D';
const b_knight = '\u265E';
const b_pawn = '\u265F';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: newGame(),
                desc: 'Game Start',
            }],
            stepNumber: 0,
            whiteIsNext: true,
            selectedSquare: {row: null, col: null},                 // should this just be initialized to null?
            legalMoveSquares: [{row: null, col: null}],             // should this just be initialized to an empty array?
        };
    }
  
    handleClick(row,col) {

        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        // If a square is not currently selected, select the square and calculate legal moves
        if (!this.state.selectedSquare.row && !this.state.selectedSquare.col) {

            // If the chosen square is empty or another player's piece, just return
            if ((this.state.whiteIsNext && !isWhitePiece(squares[row][col])) || (!this.state.whiteIsNext && isWhitePiece(squares[row][col])) || !squares[row][col]) {
                return;
            }

            // Calculate legal moves for that piece and highlight those squares too
            const legalMoves = calculateLegalMoves(row,col,squares);

            // Highlight the selected square and any legal moves for that piece
            this.setState({
                selectedSquare: {row, col},
                legalMoveSquares: legalMoves,
            });

            return;

        } else {  // If a square is already selected, move the piece

            // TO DO: if this move captures a piece, store the captured piece somewhere
            // BUG: History squares array is being overwritten every time

            // If they clicked the same square again, just clear the selection and return
            if (this.state.selectedSquare.row === row && this.state.selectedSquare.col === col) {
                this.setState({
                    selectedSquare: {row: null, col: null},
                    legalMoveSquares: [{row: null, col: null}],
                });

                return;
            }

            // If you are trying to attack your own piece, just return
            if ((this.state.whiteIsNext && isWhitePiece(squares[row][col])) || (!this.state.whiteIsNext && !isWhitePiece(squares[row][col]) && squares[row][col])) {
                return;
            }

            // Check if this is a legal move
            let legalMoveFound = false;
            this.state.legalMoveSquares.forEach(function (legalMoveSquare) {
                if (row === legalMoveSquare.row && col === legalMoveSquare.col) {
                    legalMoveFound = true;
                }
            });

            // If this is not a legal move, just return
            if (!legalMoveFound) {
                // return;                  for now, do not enforce
            }

            // If this is a legal move, move the piece null the square it was moved from
            const piece = squares[this.state.selectedSquare.row][this.state.selectedSquare.col];
            squares[row][col] = piece;
            squares[this.state.selectedSquare.row][this.state.selectedSquare.col] = null;
    
            // Update the history to include the latest board and clear selection/legal moves
            const player = this.state.whiteIsNext ? 'White ' : 'Black ';

            this.setState({
                history: history.concat([{
                    squares: squares,
                    desc: player + chessTranslation(piece,row,col),
                }]),
                stepNumber: history.length,
                whiteIsNext: !this.state.whiteIsNext,
                selectedSquare: {row: null, col: null},
                legalMoveSquares: [{row: null, col: null}],
            });

      }
    }
  
    // When a past move is selected, update the game state to that point in the history
    jumpTo(step) {
        // History is buggy so do nothing for now
        
        // this.setState({
            // stepNumber: step,
            // whiteIsNext: (step % 2) === 0,
        // });
    }
  
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
  
        // Map the full game history to a list of buttons
        const moves = history.map((step, move) => {
            const description = step.desc;
            return (
            <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{description}</button>
            </li>
            );
        });
  
        // Print a message to the players
        let status = (this.state.whiteIsNext ? 'White' : 'Black') + ' to play';
    
        // Return an updated board, the message, and the list of past moves
        return (
            <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    selected={this.state.selectedSquare}
                    legal={this.state.legalMoveSquares}
                    onClick={(row,col) => this.handleClick(row,col)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
            </div>
        );
    }
}

// Initalize a new game board
function newGame() {
    let newGameBoard = [
        [b_rook,b_knight,b_bishop,b_queen,b_king,b_bishop,b_knight,b_rook],
        [b_pawn,b_pawn,b_pawn,b_pawn,b_pawn,b_pawn,b_pawn,b_pawn],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [w_pawn,w_pawn,w_pawn,w_pawn,w_pawn,w_pawn,w_pawn,w_pawn],
        [w_rook,w_knight,w_bishop,w_queen,w_king,w_bishop,w_knight,w_rook]
    ];

    return newGameBoard;
}

// Convert array indices into chess board coordinates and piece name
function chessTranslation(piece,row,col) {
    let pieceName;
    if (piece === '\u2654' || piece === '\u265A') {
        pieceName = "King";
    } else if (piece === '\u2655' || piece === '\u265B') {
        pieceName = "Queen";
    } else if (piece === '\u2656' || piece === '\u265C') {
        pieceName = "Rook";
    } else if (piece === '\u2657' || piece === '\u265D') {
        pieceName = "Bishop";
    } else if (piece === '\u2658' || piece === '\u265E') {
        pieceName = "Knight";
    } else {
        pieceName = "Pawn";
    }

    const letters = ['A','B','C','D','E','F','G','H'];

    return pieceName + ' to ' + letters[col] + Math.abs(8-row);
}

// Determine if this piece belongs to white
// NOTE: this returns false for black pieces and for null squares
function isWhitePiece(piece) {
    if ([w_king,w_queen,w_bishop,w_knight,w_rook,w_pawn].indexOf(piece) > -1) {
        return true
    }

    return false
}

// TO DO: for a given piece and board, return an array of legal move coordinates
function calculateLegalMoves(selectedRow,selectedCol,squares) {

    let legalMoveSquares = [{row: null, col: null}];

    if (squares[selectedRow][selectedCol] === '\u2659') {                                         // White Pawn

        // If the pawn is leaving starting position, it can move forward 2 spaces (assuming that space is empty)
        if (selectedRow === 6 && !squares[selectedRow - 2][selectedCol] && !squares[selectedRow - 1][selectedCol]) {
            legalMoveSquares = [{row: (selectedRow - 1), col: selectedCol},{row: (selectedRow - 2), col: selectedCol}];
        } else if (!squares[selectedRow - 1][selectedCol]) {
            legalMoveSquares = [{row: (selectedRow - 1), col: selectedCol}];
        }

        // Allow attacks
        if (!isWhitePiece(squares[selectedRow - 1][selectedCol - 1]) && squares[selectedRow - 1][selectedCol - 1]) {
            legalMoveSquares.push({row: (selectedRow - 1), col: (selectedCol - 1)})
        }

        if (!isWhitePiece(squares[selectedRow - 1][selectedCol + 1]) && squares[selectedRow - 1][selectedCol + 1]) {
            legalMoveSquares.push({row: (selectedRow - 1), col: (selectedCol + 1)})
        }

    } else if (squares[selectedRow][selectedCol] === '\u265F') {                                    // Black Pawn

        // If the pawn is leaving starting position, it can move forward 2 spaces (assuming that space is empty)
        if (selectedRow === 1 && !squares[selectedRow + 2][selectedCol] && !squares[selectedRow + 1][selectedCol]) {
            legalMoveSquares = [{row: (selectedRow + 1), col: selectedCol},{row: (selectedRow + 2), col: selectedCol}];
        } else if (!squares[selectedRow + 1][selectedCol]) {
            legalMoveSquares = [{row: (selectedRow + 1), col: selectedCol}];
        }

        // Allow attacks
        if (isWhitePiece(squares[selectedRow + 1][selectedCol - 1])) {
            legalMoveSquares.push({row: (selectedRow + 1), col: (selectedCol - 1)});
        }

        if (isWhitePiece(squares[selectedRow + 1][selectedCol + 1])) {
            legalMoveSquares.push({row: (selectedRow + 1), col: (selectedCol + 1)});
        }

    }

    // Return an array of row/col pairs indicating valid moves
    return legalMoveSquares;
}