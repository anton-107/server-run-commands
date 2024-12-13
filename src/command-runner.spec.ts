import { describe } from "node:test";
import { CommandRunner } from "./command-runner";

describe("Command runner", () => {
  it("should execute a simple command on local OS", async () => {
    const runner = new CommandRunner();
    const result = await runner.executeCommand("date");
    expect(result.code).toBe(0);
    expect(result.stdout.length).toBeGreaterThan(10);
  })
})