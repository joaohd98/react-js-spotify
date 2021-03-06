import {SearchService} from "../../../service/search";
import {AlbumsPageInteractor} from "../providers/albums-page-interactor";
import {ArtistAlbumservice} from "../../../service/artist-albums";
import {TracksPageConst} from "../../tracks/redux/tracks-page-action";
import {CustomHistory} from "../../../config/global-props";
import {TracksPageModel} from "../../tracks/providers/tracks-page-model";
import {Dispatch} from "redux";

export enum AlbumActionConst {

  LOADING_SEARCH_ALBUM = "ALBUM_ACTION_LOADING_SEARCH_ALBUM",
  SUCCESS_SEARCH_ALBUM = "ALBUM_ACTION_SUCCESS_SEARCH_ALBUM",
  FAILED_SEARCH_ALBUM = "ALBUM_ACTION_FAILED_SEARCH_ALBUM",

  LOADING_ADD_ALBUM = "ALBUM_ACTION_LOADING_ADD_ALBUM",
  SUCCESS_ADD_ALBUM = "ALBUM_ACTION_SUCCESS_ADD_ALBUM",
  FAILED_ADD_ALBUM = "ALBUM_ACTION_FAILED_ADD_ALBUM"

}

export class AlbumsPageAction {

  static searchAlbums = (text: string, limit: number, offset: number, isTyping = false) => {

    return dispatch => {

      dispatch({
        type: AlbumActionConst.LOADING_SEARCH_ALBUM, payload: {
          text: text,
        }
      });
      
      if(text === "" || isTyping)
        return;

      SearchService.makeRequest(text, limit, offset, response => {

        let artist = AlbumsPageInteractor.findArtist(response.data!.artists.items, text);

        if(artist)
          AlbumsPageAction.getArtistAlbum(artist.id, dispatch);

        else {

          dispatch({
            type: AlbumActionConst.SUCCESS_SEARCH_ALBUM, payload: {
              cards: AlbumsPageInteractor.formatRequest(response.data!.albums.items, response.data!.tracks.items),
              hasNext: AlbumsPageInteractor.verifyHasNext(response.data!),
              status: response.cod,
            }
          });

        }

      }, response => {

        dispatch({
          type: AlbumActionConst.FAILED_SEARCH_ALBUM, payload: {
            status: response.cod,
          }
        });

      });

    };

  };

  private static getArtistAlbum(id: string, dispatch: Dispatch) {

    ArtistAlbumservice.makeRequest(id, response => {

      dispatch({
        type: AlbumActionConst.SUCCESS_SEARCH_ALBUM, payload: {
          cards: AlbumsPageInteractor.formatRequest(response.data!.items),
          hasNext: false,
          status: response.cod,
        }
      });

    }, (response) => {

      dispatch({
        type: AlbumActionConst.FAILED_SEARCH_ALBUM, payload: {
          status: response.cod,
        }
      });

    });

  }

  static addAlbums = (text: string, offset: number, limit: number) => {

    return dispatch => {

      offset += AlbumsPageInteractor.getOffsetOrLimit();

      dispatch({type: AlbumActionConst.LOADING_ADD_ALBUM});

      SearchService.makeRequest(text, limit, offset, response => {

        dispatch({
          type: AlbumActionConst.SUCCESS_ADD_ALBUM, payload: {
            cards: AlbumsPageInteractor.formatRequest(response.data!.albums.items, response.data!.tracks.items),
            hasNext: AlbumsPageInteractor.verifyHasNext(response.data!),
            status: response.cod,
            offset
          }
        });

      }, response => {

        dispatch({
          type: AlbumActionConst.FAILED_ADD_ALBUM, payload: {
            status: response.cod,
          }
        });

      });

    }

  };

  static goToAlbumTracks = (history: CustomHistory, card: TracksPageModel.AlbumCard, tracks: TracksPageModel.TrackRow[] = []) => {

    return dispatch => {

      dispatch({
        type: TracksPageConst.SET_CARD_ALBUM, payload: {
          card,
          tracks
        }
      });

      history.push(`/${card.id}/tracks`, {
        from: history.location.pathname
      });

    }

  };



}
