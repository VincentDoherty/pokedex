import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval = 1000 * 60 * 5) {
    this.cache = new Cache(cacheInterval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;

    //check cache first
    const cached = this.cache.get<ShallowLocations>(url);
    if (cached) {
      console.log("Using cached locations");
      return cached;
    }

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch locations");
    }

    const data = await res.json();

    // store in cache
    this.cache.add(url, data);

    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached = this.cache.get<Location>(url);
    if (cached) {
      console.log("Using cached location");
      return cached;
    }

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch location");
    }

    const data = await res.json();

    this.cache.add(url, data);

    return data;
  };

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
  const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

  const cached = this.cache.get<Pokemon>(url);
  if (cached) {
    return cached;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch pokemon");
  }

  const data = await res.json();

  const pokemon: Pokemon = {
    name: data.name,
    base_experience: data.base_experience,
  };

  this.cache.add(url, pokemon);

  return pokemon;
};
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  id: number;
  name: string;
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};

export type Pokemon = {
  name: string;
  base_experience: number;
};