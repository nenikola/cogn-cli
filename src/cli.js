import { configure, newPassword, signIn } from './amplify';
import { Commands } from './constants';
import {
  helpPrinter,
  parseArgumentsIntoOptions,
  promptForMissingOptions,
} from './helpers';
export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);

  if (options.help) {
    helpPrinter();
    return;
  }
  configure(options.region, options.poolId, options.clientId);
  switch (options.command) {
    case Commands.SIGN_IN:
      const res = await signIn(options.uname, options.pass);
      if (options.idtoken) {
        return process.stdout.write(res.signInUserSession.idToken.jwtToken);
      }
      console.log(res);
      break;
    case Commands.NEW_PASSWORD:
      await newPassword(options.uname, options.pass, options.newpass);
      break;
  }
}
