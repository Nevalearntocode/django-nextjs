import wretch from "wretch";
import Cookies from "js-cookie";
import { env } from "@/env";

// Base API setup for making HTTP requests
const api = wretch(env.NEXT_PUBLIC_BACKEND_URL).accept("application/json");

/**
 * Why store tokens inside cookies instead of localStorage? Storing tokens in cookies rather than localStorage offers several advantages:
 * Security: Cookies can be configured as HttpOnly, meaning they are inaccessible to JavaScript running in the browser. This reduces the risk of Cross-Site Scripting (XSS) attacks being able to steal the tokens.
 * Cross-Origin Read Blocking (CORB) Protection: Cookies adhere to the same-origin policy, offering an additional layer of security by restricting how cookies can be shared across sites.
 * Automatic Sending: Cookies are automatically included in every HTTP request made to the server, simplifying the process of sending tokens for authentication.
 * Domain and Path Restrictions: Cookies allow for fine-grained control over which domains and paths can access them, providing tighter  security controls compared to localStorage. */

/**
 * Stores a token in cookies.
 * @param {string} token - The token to be stored.
 * @param {"access" | "refresh"} type - The type of the token (access or refresh).
 */
const storeToken = (token: string, type: "access" | "refresh") => {
  Cookies.set(type + "Token", token);
};

/**
 * Retrieves a token from cookies.
 * @param {"access" | "refresh"} type - The type of the token to retrieve (access or refresh).
 * @returns {string | undefined} The token, if found.
 */
const getToken = (type: string) => {
  return Cookies.get(type + "Token");
};

/**
 * Removes both access and refresh tokens from cookies.
 */
const removeTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

const register = (email: string, username: string, password: string) => {
  return api.post({ email, username, password }, "/auth/users/");
};

const login = (email: string, password: string) => {
  return api.post({ username: email, password }, "/auth/jwt/create");
};

const logout = () => {
  const refreshToken = getToken("refresh");
  return api.post({ refresh: refreshToken }, "/auth/logout/");
  // backend will use simplejwt blacklist to blacklist the token, preventing it from being re-used
};

const handleJWTRefresh = () => {
  const refreshToken = getToken("refresh");
  return api.post({ refresh: refreshToken }, "/auth/jwt/refresh");
};

const resetPassword = (email: string) => {
  return api.post({ email }, "/auth/users/reset_password/");
};

const resetPasswordConfirm = (
  new_password: string,
  re_new_password: string,
  token: string,
  uid: string,
) => {
  return api.post(
    { uid, token, new_password, re_new_password },
    "/auth/users/reset_password_confirm/",
  );
};

export const AuthActions = () => {
  return {
    storeToken,
    getToken,
    removeTokens,
    register,
    login,
    logout,
    handleJWTRefresh,
    resetPassword,
    resetPasswordConfirm,
  };
};
