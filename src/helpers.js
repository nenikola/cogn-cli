import arg from 'arg';
import inquirer from 'inquirer';
import { Commands } from './constants';

export async function promptForMissingOptions(options) {
  let questions = [];
  if (options.help) {
    return options;
  }

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
      '--help': Boolean,
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
    help: args['--help'] || '',
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

function helpOptionStringer(option) {
  const numofchars = 13;
  const dif = numofchars - option.length;
  if (dif > 0) {
    return option + ' '.repeat(dif);
  }
  return option;
}
export function helpPrinter() {
  console.log(
    'hello from cogn-cli - your lifesaving jacket when authenticating with cognito\n'
  );
  console.log('\tcogn-cli [option] command');
  console.log('command:');
  console.log('\t' + helpOptionStringer('signin') + ' - signin user');
  console.log(
    '\t' +
      helpOptionStringer('newpassword') +
      ' - complete new password challenge for admin created user'
  );
  console.log('option:');
  console.log('\t' + helpOptionStringer('--help') + ' - show help');
  console.log('\t' + helpOptionStringer('--region') + ' - aws region');
  console.log('\t' + helpOptionStringer('--clientId') + ' - cognito client id');
  console.log(
    '\t' +
      helpOptionStringer('--username') +
      ' - username of the user you are trying to signin'
  );
  console.log(
    '\t' +
      helpOptionStringer('--password') +
      ' - password of the user you are trying to signin'
  );
  console.log(
    '\t' +
      helpOptionStringer('--newpassword') +
      ' - new password when invoking newpassword command'
  );
  console.log(
    '\t' + helpOptionStringer('--idtoken') + ' - return only idtoken'
  );
}
