import {AlbumService} from "../../../service/album";
import {AlbumTracksService} from "../../../service/album-tracks";
import {TracksPageInteractor} from "../providers/tracks-page-interactor";
import {TracksPageModel} from "../providers/tracks-page-model";

export enum TracksPageConst {

  SERVICE_LOADING = "TRACK_PAGE_SERVICE_LOADING",
  SERVICE_FAILED = "TRACK_PAGE_SERVICE_FAILED",
  SET_CARD_ALBUM = "TRACK_PAGE_SET_CARD_ALBUM",
  GET_ALBUM_TRACKS = "TRACK_PAGE_GET_ALBUM_TRACKS",
  GET_TRACKS = "TRACK_PAGE_GET_TRACKS",
  CHANGE_CURRENT_MUSIC = "TRACK_PAGE_CHANGE_CURRENT_MUSIC",

}

export class TracksPageAction {

  static goBack = (history) => {

    return dispatch => {

      history.goBack()

    }

  };

  static findAlbum = (id: string) => {

    return dispatch => {

      dispatch({type: TracksPageConst.SERVICE_LOADING});

      AlbumService.makeRequest(id, responseAlbum => {

        AlbumTracksService.makeRequest(id, responseTracks => {

          dispatch({type: TracksPageConst.GET_ALBUM_TRACKS, payload: {
            card: TracksPageInteractor.formatAlbum(responseAlbum.data!),
            tracks: TracksPageInteractor.formatTracks(responseTracks.data!),
            status: responseTracks.cod,
          }});


        }, error => {

          dispatch({type: TracksPageConst.SERVICE_FAILED, payload: { status: error.cod }});

        })

      }, error => {

        dispatch({type: TracksPageConst.SERVICE_FAILED, payload: { status: error.cod }});

      })

    }

  };

  static getTracks = (id: string) => {

    return dispatch => {

      dispatch({type: TracksPageConst.SERVICE_LOADING});

      AlbumTracksService.makeRequest(id, response => {

        dispatch({type: TracksPageConst.GET_TRACKS, payload: {
            tracks: TracksPageInteractor.formatTracks(response.data!),
            status: response.cod,
        }});


      }, error => {

        dispatch({type: TracksPageConst.SERVICE_FAILED, payload: { status: error.cod }});


      })

    }

  };

  static selectMusic = (currentIndex: number) => {

    return dispatch => {

      dispatch({type: TracksPageConst.CHANGE_CURRENT_MUSIC, payload: { currentIndex }})

    }

  };

  static changeMusic = (change: "previous" | "next", currentIndex: number, tracks: TracksPageModel.TrackRow[]) => {

    return dispatch => {

      const tracksLength = tracks.length;

      currentIndex += change === "previous" ? -1 : 1;

      if(currentIndex < 0)
        currentIndex = tracksLength - 1;

      else if(currentIndex >= tracksLength)
        currentIndex = 0;

      dispatch({type: TracksPageConst.CHANGE_CURRENT_MUSIC, payload: { currentIndex }})

    }

  }

}