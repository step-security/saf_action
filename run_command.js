const path = require('path');
const {spawnSync} = require('child_process');
const core = require('@actions/core');
const parse = require('shell-quote/parse');

async function runCommand({overrideCommand, safRoot}) {
    const command_string = core.getInput('command_string') || overrideCommand;
    if (!command_string) {
        throw new Error("SAF CLI Command String argument is required.");
    }

    const saf_command = parse(command_string);

    const allowable_topics = ['attest', 'convert', 'generate', 'harden', 'scan', 'validate', 'view'];
    const topic = saf_command[0].includes(':') ? saf_command[0].split(':')[0] : saf_command[0];

    if (!allowable_topics.includes(topic)) {
        throw new Error("The command string did not include one of the allowable topics: " + allowable_topics.join(', ') + ". Please reference the documentation for more details.");
    }

    const command = saf_command[0].includes(':') ? saf_command[0].split(':')[1] : saf_command[1];

    if (topic === "view" && command === "heimdall") {
        throw new Error("The SAF Action does not support the 'view heimdall' command. Please reference the documentation for other uses.");
    }

    const safBin = path.join(safRoot, 'bin', 'run');
    const result = spawnSync(process.execPath, [safBin, ...saf_command], {
        stdio: 'inherit',
        cwd: process.env.GITHUB_WORKSPACE || process.cwd()
    });

    if (result.error) throw result.error;
    if (result.status !== 0) process.exit(result.status);
}

module.exports = runCommand;
