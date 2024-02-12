import { User } from "../../../graphql/generated";

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const LOGOUT = 'LOGOUT';
export const TOKEN_EXPIRED = 'TOKEN_EXPIRED';

export interface LoggedInPayload {
  token: string | null | undefined
  user: User | null | undefined
}

export interface AuthState {
  authToken: string | null | undefined;
  user: User | null | undefined;
}

export interface SetAuthTokenAction {
  type: typeof SET_AUTH_TOKEN;
  payload: {
    token: string;
  };
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export interface TokenExpiredAction {
  type: typeof TOKEN_EXPIRED;
}

export type AuthActions =
  | SetAuthTokenAction
  | LogoutAction
  | TokenExpiredAction;
