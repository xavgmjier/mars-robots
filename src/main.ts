// crude CLI interface to accept robot input commands

import inquirer from 'inquirer';
import { run } from './run.ts';
import { standardiseInstructionInput } from '../utils/utils.ts';

inquirer
    .prompt([
        {
            type: "editor",
            message: "Provide an input:",
            name: "instruction-input",
        }
    ])
    .then((answers) => {
        const cleanedInput = standardiseInstructionInput(answers['instruction-input'])
        const outputResult = run(cleanedInput)
        console.log(outputResult)

    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("Could not render", error)
        } else {
            console.log('An error occured', error)
        }
    });