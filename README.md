# Pokedex CLI

A command-line interface (CLI) for exploring the Pokémon world!  
Fetch Pokémon, explore locations, and catch Pokémon using the [PokéAPI](https://pokeapi.co/).

---

##  Features

- Explore Pokémon **location areas** with pagination (`map` / `mapb`)  
- Explore a location and list **all Pokémon in that area** (`explore <area_name>`)  
- **Catch Pokémon** using a probability system based on base experience (`catch <pokemon_name>`)  
- View and store your **personal Pokedex**  
- Built-in **help** and **exit** commands  
- **Caching layer** to make repeated API calls blazingly fast  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/pokedex-cli.git
cd pokedex-cli
```

2. Install dependencies:

```bash
npm install
```

3. Build the project (if using TypeScript):

```bash
npm run build
```

4. Start the CLI:

```bash
npm start
```

---

## 🏁 Usage

Once inside the REPL:

### Commands

| Command              | Description                              |
| -------------------- | ---------------------------------------- |
| `help`               | Show available commands                  |
| `exit`               | Exit the CLI                             |
| `map`                | Show next 20 location areas              |
| `mapb`               | Show previous 20 location areas          |
| `explore <location>` | Explore a location area and list Pokémon |
| `catch <pokemon>`    | Attempt to catch a Pokémon               |
| `pokedex`            | List all Pokémon you have caught         |

---

### Example Session

```text
Pokedex > map
canalave-city-area
eterna-city-area
pastoria-city-area
...

Pokedex > explore eterna-forest-area
Exploring eterna-forest-area...
Pokemon found:
 - budew
 - wurmple
 - silcoon
 - cascoon
...

Pokedex > catch pikachu
Throwing a Pokeball at pikachu...
pikachu escaped!

Pokedex > catch pikachu
Throwing a Pokeball at pikachu...
pikachu was caught!

Pokedex > pokedex
Your Pokémon:
 - pikachu
```

---

## Project Structure

```
.
├── src/
│   ├── main.ts          # Entry point, initializes state and starts REPL
│   ├── repl.ts          # REPL logic
│   ├── state.ts         # Application state, commands, and PokeAPI client
│   ├── pokeapi.ts       # API wrapper for PokéAPI with caching
│   ├── cache.ts         # Caching layer with expiration
│   ├── command_map.ts
│   ├── command_explore.ts
│   ├── command_catch.ts
│   ├── command_exit.ts
│   ├── command_help.ts
│   └── utils/           # Utility functions, e.g., input cleaning
├── package.json
├── tsconfig.json
└── README.md
```

---

## Testing

* Run unit tests with [Vitest](https://vitest.dev/):

```bash
npm test
```

* Example: cache tests, API caching, and command functionality.

---

## Notes

* The **catch probability** is based on a Pokémon’s `base_experience`. Higher base experience → harder to catch.
* **Caching** ensures that repeated API calls (e.g., exploring the same location) are instant.
* All commands support **async handling**, so network errors are gracefully caught.

---

## References

* [PokéAPI Documentation](https://pokeapi.co/docs/v2)
* [Node.js readline module](https://nodejs.org/api/readline.html)