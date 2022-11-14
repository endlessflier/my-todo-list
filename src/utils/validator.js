export const MAX_EMAIL_LENGTH = 50;
export const MAX_PASSWORD_LENGTH = 16;
const MIN_PASSWORD_LENGTH = 4;

export function getValidateEmail(email) {
  return (
    email.length <= MAX_EMAIL_LENGTH &&
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  );
}

export function getValidatePassword(password) {
  return (
    MIN_PASSWORD_LENGTH <= password.length &&
    password.length <= MAX_PASSWORD_LENGTH
  );
}
