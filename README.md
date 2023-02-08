# Bingo-app

A ReactJS application that encourages users to participate in a fictional online conference call and play a Bingo game, where they can select tiles that reflect the conditions of their connection state.

The app consists of two routes: "user registration" and "conference hall". To start the "conference call" users must register and click the "Start Conference" button.

In the "conference hall" users can win Bingo by selecting tiles and completing a row, column, or diagonal. Once a user wins, they will receive a "victory notification" in the form of a modal window.

Rules of game:
- multiple users can simultaneously participate in one "conference call";
- multiple users can "win Bingo" (select main rows, columns or diagonals);
- central tile is unselectable by design; 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

Things you need to install in order to deploy project locally:

- Node.js
- npm

### Installing

Follow these steps to get the development environment running:

1. Clone the repository to your local machine
   ```bash
   git clone https://github.com/konstantin-odessa/bingo-app.git
   ```
2. Install the dependencies
    ```bash
    npm install
    ```
3. Start the development server
    ```bash
    npm run dev
    ```

The application should now be running on `http://127.0.0.1:5173/` 
