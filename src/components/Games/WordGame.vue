<template>
    <div>
      <h2>Find the words!</h2>
      <div id="word-grid" class="grid"></div>
      <div id="word-list" class="word-list">
        <h3>Words to find:</h3>
        <ul id="words"></ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'WordGame',
    data() {
      return {
        words: ["APPLE", "ORANGE", "BANANA", "GRAPE", "PEACH"],
        gridSize: 10,
      };
    },
    mounted() {
      this.createGrid();
      this.displayWords();
    },
    methods: {
      createGrid() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const grid = document.getElementById('word-grid');
        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
          const cell = document.createElement('div');
          cell.textContent = letters.charAt(Math.floor(Math.random() * letters.length));
          cell.addEventListener('click', () => cell.classList.toggle('selected'));
          grid.appendChild(cell);
        }
      },
      displayWords() {
        const wordListElem = document.getElementById('words');
        this.words.forEach(word => {
          const listItem = document.createElement('li');
          listItem.textContent = word;
          wordListElem.appendChild(listItem);
        });
      }
    }
  }
  </script>
  
  <style scoped>
  .grid {
    display: grid;
    grid-template-columns: repeat(10, 50px);
    grid-template-rows: repeat(10, 50px);
    gap: 5px;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .grid div {
    width: 50px;
    height: 50px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  
  .grid div.selected {
    background-color: #90ee90;
  }
  
  .word-list {
    margin-top: 20px;
  }
  
  .word-list ul {
    list-style-type: none;
    padding: 0;
  }
  
  .word-list ul li {
    font-size: 1.2em;
  }
  </style>