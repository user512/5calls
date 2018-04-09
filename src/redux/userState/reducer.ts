import { Reducer } from 'redux';

import { UserStateAction, UserStateActionType } from './index';

export class UserAuth {
  accessToken: string;
  idToken: string;
  jwtToken: string;
  expiration: Date;
}

export interface UserState {
  userAuth?: UserAuth;
  profile?: UserProfile;
}

export interface UserProfile {
  name: string;
  sub: string; // sub is the user id, either a unique userid or twitter|<twitterid>, etc
  exp: number;
}

const initialState: UserState = {
  userAuth: undefined,
  profile: undefined,
};

export const userStateReducer: Reducer<UserState> = (
  state: UserState = initialState as UserState, action: UserStateAction): UserState => {
  switch (action.type) {
    case UserStateActionType.SET_USER_PROFILE: {
      const profile = action.payload as UserProfile | undefined;

      const newState: UserState = { ...state, profile: profile };
      return newState;
    }
    case UserStateActionType.CLEAR_USER_PROFILE: {
      const newState: UserState = { ...state, profile: undefined };
      return newState;
    }
    default: {
      return state;
    }
  }
};