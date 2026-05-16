import { spawn } from "node:child_process";

const args = process.argv.slice(2);
if (args[1] === "--") {
  args.splice(1, 1);
}

const child = spawn("astro", args, {
  stdio: "inherit",
  shell: process.platform === "win32",
  env: {
    ...process.env,
    ASTRO_TELEMETRY_DISABLED: "1",
  },
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
