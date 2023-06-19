const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const TOWNHALL_LEVEL = 1;
const GOLD = 1000;
const ELIXIR = 1000;
const TROOP_CAPACITY = 20;

class Player {
  constructor(name) {
    this.name = name;
    this.townhall_level = TOWNHALL_LEVEL;
    this.gold = GOLD;
    this.elixir = ELIXIR;
    this.troop_capacity = TROOP_CAPACITY;
    this.troops = [];
  }

  printResources() {
    console.log(`Gold: ${this.gold}`);
    console.log(`Elixir: ${this.elixir}`);
  }

  printTroops() {
    console.log('Troops: ');
    for (const troop of this.troops) {
      console.log(troop);
    }
  }

  attack() {
    const enemy_townhall_level = Math.floor(Math.random() * 10) + 1;
    if (this.townhall_level >= enemy_townhall_level) {
      console.log('You won the attack!');
    } else {
      console.log('You lost the attack!');
    }
  }

  trainTroop(troop) {
    if (this.troops.length >= this.troop_capacity) {
      console.log('Troop capacity reached. Upgrade your camps to train more troops.');
    } else {
      if (this.gold >= troop.cost) {
        this.gold -= troop.cost;
        this.troops.push(troop);
      } else {
        console.log('Not enough gold to train the troops.');
      }
    }
  }
}

class Troop {
  constructor(name, cost) {
    this.name = name;
    this.cost = cost;
  }

  toString() {
    return `${this.name} - Cost: ${this.cost}`;
  }
}

function gameLoop() {
  console.log('Welcome to Clash of Clans (CLI Version)!');
  rl.question('Enter Your Name: ', (player_name) => {
    const player = new Player(player_name);

    const menu = () => {
      console.log('\n[MAIN MENU]');
      console.log('1. Print Resources');
      console.log('2. Print Troops');
      console.log('3. Train Troops');
      console.log('4. Attack');
      console.log('5. Quit');
      rl.question('Enter your choice: ', (choice) => {
        switch (choice) {
          case '1':
            player.printResources();
            menu();
            break;
          case '2':
            player.printTroops();
            menu();
            break;
          case '3':
            rl.question('Enter the Troop name: ', (troop_name) => {
              rl.question('Enter the troop cost: ', (troop_cost) => {
                const troop = new Troop(troop_name, parseInt(troop_cost));
                player.trainTroop(troop);
                menu();
              });
            });
            break;
          case '4':
            player.attack();
            menu();
            break;
          case '5':
            console.log('Thanks for playing Clash of Clans (CLI version)!');
            rl.close();
            break;
          default:
            console.log('Invalid choice. Please try again.');
            menu();
            break;
        }
      });
    };

    menu();
  });
}

gameLoop();
