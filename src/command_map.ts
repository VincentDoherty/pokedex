import { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
  const locations = await state.pokeapi.fetchLocations(
    state.nextLocationsURL ?? undefined
  );

  for (const loc of locations.results) {
    console.log(loc.name);
  }

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;
}

export async function commandMapb(state:State): Promise<void> {
  const locations = await state.pokeapi.fetchLocations(
    state.prevLocationsURL ?? undefined
  );

  for (const loc of locations.results) {
    console.log(loc.name);
  }

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;
  
}