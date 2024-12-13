import execSh from "exec-sh";

interface ExecutionResult {
  stdout: string;
  stderr: string;
  code: number;
}

export class CommandRunner {
  constructor() {}
  public async executeCommand(inputCommand: string): Promise<ExecutionResult> {
    let result: { stdout: string; stderr: string };
    try {
      result = await execSh.promise(inputCommand, { stdio: false });
      return { ...result, code: 0 };
    } catch (err) {
      return err as ExecutionResult;
    }
  }
}