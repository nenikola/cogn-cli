import { configure, newPassword, signIn } from './amplify';
import { Commands } from './constants';
import { parseArgumentsIntoOptions, promptForMissingOptions } from './helpers';
export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);

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
  console.log(options);
}
