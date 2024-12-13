import execSh from "exec-sh";
export class CommandRunner {
    constructor() { }
    async executeCommand(inputCommand) {
        let result;
        try {
            result = await execSh.promise(inputCommand, { stdio: false });
            return { ...result, code: 0 };
        }
        catch (err) {
            return err;
        }
    }
}
