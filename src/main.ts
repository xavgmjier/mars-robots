// crude CLI interface to accept robot input commands

import inquirer from 'inquirer';
import { run } from './run.ts';
import { standardiseInstructionInput } from '../utils/utils.ts';

inquirer
    .prompt([
        {
            type: "editor",
            message: "Martian Robots - provide an input to return a result:",
            name: "instruction-input"
        }
    ])
    .then((answers) => {
        const cleanedInput = standardiseInstructionInput(answers['instruction-input'])
        const outputResult = run(cleanedInput)
        console.log('\n')
        console.log('Result Output:\n')
        console.log(outputResult)
        console.log('\n')

    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("Could not render", error)
        } else {
            console.log('Execution Cancelled: ', error.message)
        }
    });
