import {AnyAction, Dispatch} from "redux";
import {store} from "../config/store";
import {TracksPageModel} from "../pages/tracks/providers/tracks-page-model";

export interface UserModel {

  authToken: string,
  accessToken: string,
  refreshToken: string,
  albumsRecent: {
    card: TracksPageModel.AlbumCard,
    tracks: TracksPageModel.TrackRow[],
  }[],

  functions: {
    saveToken: (accessToken: string, refreshToken: string, dispatch: Dispatch<AnyAction>) => void,
    addAlbumRecent: (card: TracksPageModel.AlbumCard, tracks: TracksPageModel.TrackRow[], dispatch: Dispatch<AnyAction>) => void,
  }

}

export const getUserCode = (type: "refreshToken" | "accessToken") => {

  return store.getState().UserPersistedReducer[type];

};


export const getRedirectUri = () => {

  return window.location.origin + "/auth";

};

