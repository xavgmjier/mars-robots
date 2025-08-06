// Explored potential to create a CLI interface to accept robot input commands
// Experimented with @clack framework, however may use something else if eventually implemented




// import { cancel, intro, isCancel, outro, text } from '@clack/prompts'

// intro("Martian Robots")

// const worldBoundary: string[] = []
// // Do stuff

// const xAxisGrid = await text({
//   message: "Let's start with the grid size. Enter the maximum X axis value.",
//   placeholder: 'e.g. 5',
// //   initialValue: '42',
//   validate(value) {
//     const parsedVal = parseInt(value)
//     if (Number.isNaN(parsedVal)) return `Please enter a number! It must be less than 50!`
//      worldBoundary.push(value)
//   },
// })

// const yAxisGrid = await text({
//   message: "Next, enter the maximum Y axis value.",
// //   placeholder: '',
// //   initialValue: '42',
//   validate(value) {
//     const parsedVal = parseInt(value)
//     if (Number.isNaN(parsedVal)) return `Please enter a number! It must be less than 50!`
//     worldBoundary.push(value)
//   },
// })


// if (isCancel([xAxisGrid, yAxisGrid])) {
//   cancel('Operation cancelled.')
//   process.exit(0)
// }

// outro("Here's your output: " + worldBoundary)