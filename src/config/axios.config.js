import axios from "axios";

const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3MyIsIkhldEhhblN0cmluZyI6IjAzLzA2LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0ODkwODgwMDAwMCIsIm5iZiI6MTcyMTkyNjgwMCwiZXhwIjoxNzQ5MDU2NDAwfQ.4vXhg2MxiO2LMiVclRYdrEmoivaG2QbYXjyqWf9mxGk";

export const apiInstance = (settings = {}) => {
  const AUTHORIZATION = localStorage.getItem("token")
    ? `Bearer ${localStorage.getItem("token")}`
    : "";

  return axios.create({
    ...settings,
    headers: {
      ...settings.headers,
      TokenCybersoft: TOKEN_CYBERSOFT,
      Authorization: AUTHORIZATION
    }
  });
};
