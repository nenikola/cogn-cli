import arg from 'arg';
import inquirer from 'inquirer';
import { Commands } from './constants';

export async function promptForMissingOptions(options) {
  let questions = [];
  if (options.command == Commands.NEW_PASSWORD && !options.newpassword) {
    questions.push({
      type: 'password',
      name: 'newpass',
      message: 'Please enter new password:',
    });
  }

  if (!options.command) {
    questions.push({
      type: 'list',
      name: 'command',
      message: 'Please select command that you want to perform:',
      choices: [Commands.SIGN_IN, Commands.NEW_PASSWORD],
      default: Commands.SIGN_IN,
    });
  }
  if (!options.region) {
    questions.push({
      type: 'input',
      name: 'region',
      message: 'Please enter region in which is userpool located:',
    });
  }
  if (!options.poolId) {
    questions.push({
      type: 'input',
      name: 'poolId',
      message: 'Please enter Userpool ID of userpool which you are accessing:',
    });
  }

  if (!options.clientId) {
    questions.push({
      type: 'input',
      name: 'clientId',
      message: 'Please enter Client ID of client which you are using:',
    });
  }
  if (!options.uname) {
    questions.push({
      type: 'input',
      name: 'uname',
      message: 'Please enter username:',
    });
  }
  if (!options.pass) {
    questions.push({
      type: 'password',
      name: 'pass',
      message: 'Please enter password:',
    });
  }

  const answers = await inquirer.prompt(questions);

  questions = [];
  if (
    answers.command == Commands.NEW_PASSWORD &&
    !options.newpassword &&
    !answers.newpassword
  ) {
    questions.push({
      type: 'password',
      name: 'newpass',
      message: 'Please enter new password:',
    });
  }
  const answers1 = await inquirer.prompt(questions);

  return {
    ...options,
    ...answers,
    ...answers1,
  };
}
export function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--region': String,
      '--poolId': String,
      '--clientId': String,
      '--username': String,
      '--password': String,
      '--newpassword': String,
      '--idtoken': Boolean,
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    poolId: args['--poolId'] || '',
    clientId: args['--clientId'] || '',
    uname: args['--username'] || '',
    pass: args['--password'] || '',
    newpass: args['--newpassword'] || '',
    region: args['--region'] || '',
    idtoken: args['--idtoken'] || false,
    command: args._[0],
  };
}
