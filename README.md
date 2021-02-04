# Simple Chess with React

This is a simple chess game based on the React tutorial for a tic-tac-toe game: https://reactjs.org/tutorial/tutorial.html

The game enforces turns and only allows movements to empty spaces or attacking enemy pieces. Legal move highlighting is implemented for pawns but not for other pieces.

## How to Run Locally

You most have a recent version of Node and React installed.

Download the source code and open a new terminal window. Change to the Hello-Chess directory and launch the develoment server with `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

## To Do
- Implement legal move highlighting for Rook, Kinght, Bishop, Queen, and King pieces
- Implement detection of Check and Checkmate game states
- Create captured piece area for both players

## Bugs
- Game board history is being overwritten during each move instead of new history being correctly written to state. History of move descriptions works fine but history of squares array does not. This prevents time travel functionality from working.