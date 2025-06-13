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
  console.log("token --> ", data.token);

  console.log("Captured Data --> ", formData);
  return data;
};

// //login

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

//me
const me = async () => {
  console.log(" I am here <------");
  const response = await instance.get("/mini-project/api/auth/me");
  console.log("me data api  -----> ", response.data);
  return response.data;
};

//deposite
const deposite = async (amount: number) => {
  const { data } = await instance.put(
    "/mini-project/api/transactions/deposit",
    { amount }
  );
  return data;
};

//withdraw
const withdraw = async (amount: number) => {
  const { data } = await instance.put(
    "/mini-project/api/transactions/withdraw",
    { amount }
  );
  return data;
};

//list of transactions
const listOfTransactions = async () => {
  const response = await instance.get("/mini-project/api/transactions/my");
  console.log("This is my Trasfer list --> ", response.data);
  return response.data;
};

export { deposite, listOfTransactions, login, me, register, withdraw };
