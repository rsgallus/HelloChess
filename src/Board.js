import React from 'react';
import Square from './Square.js';

export default class Board extends React.Component {
  
    renderSquare(row, col, shade) {
        let highlightSquare = null;

        // If this square is selected, we need to highlight it
        if (row === this.props.selected.row && col === this.props.selected.col) {
            highlightSquare = 'square-selected';
        }

        // If this square represents a legal move, we need to highlight it
        this.props.legal.forEach(function (legalMoveSquare) {
            if (row === legalMoveSquare.row && col === legalMoveSquare.col) {
                highlightSquare = 'square-legal';
            }
        });

        return (
            <Square 
                value={this.props.squares[row][col]}
                color={shade}
                highlight={highlightSquare}
                onClick={() => this.props.onClick(row,col)}
            />
        );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0,0,"square-white")}
            {this.renderSquare(0,1,"square-gray")}
            {this.renderSquare(0,2,"square-white")}
            {this.renderSquare(0,3,"square-gray")}
            {this.renderSquare(0,4,"square-white")}
            {this.renderSquare(0,5,"square-gray")}
            {this.renderSquare(0,6,"square-white")}
            {this.renderSquare(0,7,"square-gray")}
          </div>
          <div className="board-row">
            {this.renderSquare(1,0,"square-gray")}
            {this.renderSquare(1,1,"square-white")}
            {this.renderSquare(1,2,"square-gray")}
            {this.renderSquare(1,3,"square-white")}
            {this.renderSquare(1,4,"square-gray")}
            {this.renderSquare(1,5,"square-white")}
            {this.renderSquare(1,6,"square-gray")}
            {this.renderSquare(1,7,"square-white")}
          </div>
          <div className="board-row">
            {this.renderSquare(2,0,"square-white")}
            {this.renderSquare(2,1,"square-gray")}
            {this.renderSquare(2,2,"square-white")}
            {this.renderSquare(2,3,"square-gray")}
            {this.renderSquare(2,4,"square-white")}
            {this.renderSquare(2,5,"square-gray")}
            {this.renderSquare(2,6,"square-white")}
            {this.renderSquare(2,7,"square-gray")}
          </div>
          <div className="board-row">
            {this.renderSquare(3,0,"square-gray")}
            {this.renderSquare(3,1,"square-white")}
            {this.renderSquare(3,2,"square-gray")}
            {this.renderSquare(3,3,"square-white")}
            {this.renderSquare(3,4,"square-gray")}
            {this.renderSquare(3,5,"square-white")}
            {this.renderSquare(3,6,"square-gray")}
            {this.renderSquare(3,7,"square-white")}
          </div>
          <div className="board-row">
            {this.renderSquare(4,0,"square-white")}
            {this.renderSquare(4,1,"square-gray")}
            {this.renderSquare(4,2,"square-white")}
            {this.renderSquare(4,3,"square-gray")}
            {this.renderSquare(4,4,"square-white")}
            {this.renderSquare(4,5,"square-gray")}
            {this.renderSquare(4,6,"square-white")}
            {this.renderSquare(4,7,"square-gray")}
          </div>
          <div className="board-row">
            {this.renderSquare(5,0,"square-gray")}
            {this.renderSquare(5,1,"square-white")}
            {this.renderSquare(5,2,"square-gray")}
            {this.renderSquare(5,3,"square-white")}
            {this.renderSquare(5,4,"square-gray")}
            {this.renderSquare(5,5,"square-white")}
            {this.renderSquare(5,6,"square-gray")}
            {this.renderSquare(5,7,"square-white")}
          </div>
          <div className="board-row">
            {this.renderSquare(6,0,"square-white")}
            {this.renderSquare(6,1,"square-gray")}
            {this.renderSquare(6,2,"square-white")}
            {this.renderSquare(6,3,"square-gray")}
            {this.renderSquare(6,4,"square-white")}
            {this.renderSquare(6,5,"square-gray")}
            {this.renderSquare(6,6,"square-white")}
            {this.renderSquare(6,7,"square-gray")}
          </div>
          <div className="board-row">
            {this.renderSquare(7,0,"square-gray")}
            {this.renderSquare(7,1,"square-white")}
            {this.renderSquare(7,2,"square-gray")}
            {this.renderSquare(7,3,"square-white")}
            {this.renderSquare(7,4,"square-gray")}
            {this.renderSquare(7,5,"square-white")}
            {this.renderSquare(7,6,"square-gray")}
            {this.renderSquare(7,7,"square-white")}
          </div>
        </div>
      );
    }
  }