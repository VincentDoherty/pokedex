import { State } from "./state.js";

export async function commandExplore(
  state: State,
  ...args: string[]
): Promise<void> {

  if (args.length === 0) {
    console.log("Please provide a location name");
    return;
  }

  const locationName = args[0];

  try {
    const location = await state.pokeapi.fetchLocation(locationName);

    console.log(`Exploring ${location.name}...`);
    console.log("Pokemon found:");

    for (const encounter of location.pokemon_encounters) {
      console.log(` - ${encounter.pokemon.name}`);
    }

  } catch (error) {
    console.error("Error exploring location:", error);
  }
}