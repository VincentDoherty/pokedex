import { inspect } from "node:util";
import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapb } from "./command_map.js";
import { CLICommand } from "./state.js";
import { commandInspect } from "./commandInspect.js";
import { commandPokedex } from "./commandPokedex.js";


export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
    name: "map",
    description: "Displays next 20 locations",
    callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays previous 20 locations",
      callback: commandMapb,
    },
    explore: {
      name: "explore",
      description: "Explores a location by name",
      callback: commandExplore,
      
    },
    catch: {
      name: "catch",
      description: "Catches a pokemon by name",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Inspects a pokemon by name",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "Lists all caught pokemon",
      callback: commandPokedex,
    }
  };
}