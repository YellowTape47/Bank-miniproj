// we will create the functions responsible for calling the auth endpoints

import instance from ".";
import { storeToken } from "./storage";

// register

const register = async (username: string, password: string, image: string) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  // if no image in backend no need
  formData.append("image", {
    name: "image.jpeg",
    uri: image,
    type: "image/jpeg",
    quality: "low",
  } as any);

  //response
  const { data } = await instance.post(
    "/mini-project/api/auth/register",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  ); //request
  // response alot of info { data: {"token": "eyekdhfiohsifoisyfowefh", "message": "user created succesfully"}}

  if (data.token) {
    await storeToken(data.token);
  }

  console.log("Captured Data --> ", formData);
  return data;
};

//login
const login = async (username: string, password: string) => {
  const { data } = await instance.post("/mini-project/api/auth/login", {
    username,
    password,
  });

  if (data.token) {
    await storeToken(data.token);
  }

  return data;
};

export { login, register };
