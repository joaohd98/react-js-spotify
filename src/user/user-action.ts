import {AnyAction, Dispatch} from "redux";

export enum UserActionConst {

  SAVE_TOKEN = "USER_ACTION_SAVE_TOKEN"

}

export class UserAction {

  static saveToken = (authCode: string, dispatch: Dispatch<AnyAction>) => {

    dispatch({type: UserActionConst.SAVE_TOKEN, payload: {authCode}});

  };

}
