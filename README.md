# Project Overview

## Sudoku Generator and Solver

This project is a **Sudoku Generator** and **Sudoku Solver** developed using JavaScript, HTML, and CSS. The core functionality of the application involves generating a valid Sudoku puzzle with a **constant time complexity** algorithm and presenting it to users. The user interface includes features to validate a solution and generate a new puzzle. The project also includes a **welcome page** where users input their name before proceeding to the main Sudoku game.

## Key Features

- **Valid Sudoku Generation**: The algorithm used to generate the Sudoku puzzle runs in constant time complexity, ensuring efficient puzzle creation.
  - **Dynamic Puzzle Layout**: The generated Sudoku puzzle contains 25 pre-filled numbers. These numbers are evenly distributed across the grid using a mathematical approach:
  - The total number of digits to be pre-filled is divided by 9 (prefilledNumber / 9) to determine how many digits will go into each subsquare.
  - The remainder of this division (prefilledNumber % 9) is used to add one extra digit to some of the subsquares to ensure a balanced distribution.
  - The subsquares are shuffled randomly to avoid predictable patterns.
- **Puzzle Validation**: Users can click the "Validate" button to check if their solution is correct. The system checks the entire grid against Original Sudoku If the Sudoku is not completely filled "Incomplete" message is displayed else if completely filled and wrong then "Invalid" else if the Sudoku matches with Original Sudoku the total time taken to solve the grid is calculated and displayed , starting new game.
- **New Game Button**: A "New Game" button allows users to generate a fresh puzzle without refreshing the page.
- **User Interaction**: Before accessing the Sudoku game, users must input their name on the entry page, which then redirects to the Sudoku grid page.

# Architecture of the Project

The architecture of this project is designed to efficiently handle the generation, validation, and user interaction aspects of the Sudoku puzzle. Here's an overview of the project structure:

## Entry Page(Home.html)

- **Purpose**: A simple HTML page where the user inputs their name before proceeding to the main game.
- **Components**
  - **Input Field**: To capture the user’s name.
  - **Button**: On clicking, it redirects the user to the main Sudoku game page saving the name in the local Storage of the browser.

## Main Game page(Sudoku.html)

- **Purpose**: This is where the Sudoku puzzle is generated and displayed to the user. It also includes the features for validating solutions and generating new puzzles.
- **Components**
  - **Sudoku Grid**:A 9x9 grid layout where numbers can be filled or validated.
  - **Button Group**:Contain all the button like validate and new game , responsive so can accomodate many more like buttons like hint,etc.

## Sudoku Generation Algorithm

- Fill all the diagonal 3×3 matrices.
- Fill recursively rest of the non-diagonal subsquare. For every cell to be filled, we try all numbers until we find a safe number to be placed.
- Once Grid is fully filled, keep k elements dynamically to complete the playable grid.

# Flow of the Project

Home page (Enter the player name) -> Redirects to Main page -> Onload checks for username and starts new game -> In start new game 1.Generates valid sudoku and only few tiles value is kept 2.Sudoku object is created
