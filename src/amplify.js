const { Auth } = require('aws-amplify');

export function configure(region, poolId, clientId) {
  Auth.configure({
    aws_cognito_region: region,
    aws_user_pools_id: poolId,
    aws_user_pools_web_client_id: clientId,
  });
}

export async function signIn(uname, pass) {
  try {
    return await Auth.signIn(uname, pass);
  } catch (error) {
    return error;
  }
}
export async function newPassword(uname, temppass, newpass) {
  try {
    const user = await Auth.signIn(uname, temppass);
    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
      await Auth.completeNewPassword(user, newpass);
      console.log('New password set!');
    } else {
      console.log('User does not require new password.');
    }
  } catch (error) {
    return error;
  }
}
