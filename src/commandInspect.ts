import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        console.log("Please provide a Pokemon name");
        return;
    }

    const pokemonName = args[0];

    if (pokemonName in state.pokedex) {
        const pokemon = state.pokedex[pokemonName];
        console.log(`Name: ${pokemon.name}`);
        console.log(`Base Experience: ${pokemon.base_experience}`);
    } else {
        console.log(`${pokemonName} is not in your Pokedex. Try catching it first!`);
    }
}