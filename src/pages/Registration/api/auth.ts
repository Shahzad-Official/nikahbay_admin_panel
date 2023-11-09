import axios from "axios";
import { ApiConstants } from "constants/api_constants";
import { UserModel } from "../models/UserModel";

export async function login(
  email: string,
  password: string
): Promise<UserModel> {
  var body = JSON.stringify({
    email: email,
    password: password,
  });
  try {
    var response = await axios.post(
      `${ApiConstants.baseUrl}${ApiConstants.login}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return {
      success: false,
      message: "Something went wrong. Please try again",
    };
  }
}

export async function pinVerify(pin: string): Promise<UserModel> {
  try {
    var body = JSON.stringify({
      otp: pin,
    });
    console.log(localStorage.getItem("token"));
    console.log(body);
    const response = await axios.post(
      `${ApiConstants.baseUrl}${ApiConstants.verify}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return {
      success: false,
      message: "Something went wrong. Please try again",
    };
  }
}

export async function signup(
  profile: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<UserModel> {
  try {
    var body = JSON.stringify({
      profile: profile,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    const response = await axios.post(
      `${ApiConstants.baseUrl}${ApiConstants.signup}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return {
      success: false,
      message: "Something went wrong. Please try again",
    };
  }
}
