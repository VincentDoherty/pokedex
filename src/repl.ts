import { createInterface } from 'readline';
import { getCommands } from "./commands.js";
import { State } from "./state.js";
import { cleanInput } from "./cleanInput.js";

export function startREPL(state: State) {
  state.rl.prompt();

  state.rl.on("line", async (line) => {
  const input = cleanInput(line);

  if (input.length === 0) {
    state.rl.prompt();
    return;
  }

  const commandName = input[0];
  const args = input.slice(1);

  try {
    if (commandName in state.commands) {
      await state.commands[commandName].callback(state, ...args);
    } else {
      console.log("Unknown command");
    }
  } catch (err) {
    console.log((err as Error).message);
  }

  state.rl.prompt();
});
}
