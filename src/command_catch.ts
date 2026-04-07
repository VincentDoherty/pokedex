import { State } from "./state.js";

export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {

  if (args.length === 0) {
    console.log("Please provide a Pokemon name");
    return;
  }

  const pokemonName = args[0];

  try {
    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    const pokemon = await state.pokeapi.fetchPokemon(pokemonName);

    const catchChance = 50 / pokemon.base_experience;
    const roll = Math.random();

    if (roll < catchChance) {
      console.log(`${pokemon.name} was caught!`);

      
      state.pokedex[pokemon.name] = pokemon;

    } else {
      console.log(`${pokemon.name} escaped!`);
    }

  } catch (error) {
    console.error("Error catching Pokemon:", error);
  }
}