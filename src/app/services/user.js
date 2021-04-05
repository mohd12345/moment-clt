import config from "../../config";

export const registerUser = (payload) => {
  return fetch(`${config.apiUrl}/api/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

export const loginUser = (payload) => {
  return fetch(`${config.apiUrl}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};
