import request from "../utils/request";

export const getUserData = () => {
  return request.get("/user.json");
};
