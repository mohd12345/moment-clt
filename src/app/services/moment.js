import config from "../../config";

const getToken = () => localStorage.getItem("token");

export const createMoment = (payload) => {
  return fetch(`${config.apiUrl}/api/moments/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", authorization: getToken() },
    body: JSON.stringify(payload),
  });
};

export const updateMoment = (payload) => {
  return fetch(`${config.apiUrl}/api/moments/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", authorization: getToken() },
    body: JSON.stringify(payload),
  });
};

export const getMoments = (payload) => {
  return fetch(`${config.apiUrl}/api/moments/list`, {
    method: "POST",
    headers: { "Content-Type": "application/json", authorization: getToken() },
    body: JSON.stringify(payload),
  });
};

export const deleteMoment = (id) => {
  return fetch(`${config.apiUrl}/api/moments/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", authorization: getToken() },
  });
};
