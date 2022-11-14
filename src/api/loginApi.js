import * as fetchApi from "./fetch";

const LOGIN_URL = "http://dev.rapptrlabs.com/Tests/scripts/user-login.php";

function parseUserFromResponse(obj) {
  return {
    userId: obj.user_id,
    userEmail: obj.user_email,
    userName: obj.user_username,
    userIsActive: obj.user_is_active,
    userProfileImage: obj.user_profile_image,
    userLastActiveEpoch: obj.user_last_active_epoch,
    userCreationEpoch: obj.user_creation_epoch,
    userIsNew: obj.user_is_new,
    userToken: obj.user_token,
  };
}

export const login = (email, password) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  return fetchApi
    .post(`${LOGIN_URL}`, formData, { isFormData: true })
    .then((resp) => parseUserFromResponse(resp));
};
