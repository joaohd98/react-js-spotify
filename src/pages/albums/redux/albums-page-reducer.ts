import {AlbumActionConst, AlbumsPageAction} from "./albums-page-action";
import {ServiceStatus} from "../../../service";
import {AlbumsPageModel} from "../providers/albums-page-model";
import {AlbumsPageInteractor} from "../providers/albums-page-interactor";


export const AlbumsPageInitialState: AlbumsPageModel.Props = {

  isFirstTime: true,
  text: "",
  cards: [],
  status: ServiceStatus.noAction,
  offset: 0,
  hasNext: false,
  limit: AlbumsPageInteractor.getOffsetOrLimit(),
  albumsRecent: [],
  functions: {
    searchAlbums: (text, offset, limit, isTyping?) => AlbumsPageAction.searchAlbums(text, offset, limit, isTyping),
    addAlbums: (text, offset, limit) => AlbumsPageAction.addAlbums(text, offset, limit),
    goToAlbumTracks: (history, card, tracks) => AlbumsPageAction.goToAlbumTracks(history, card, tracks)
  }

};

export const AlbumsPageReducer = (state = AlbumsPageInitialState, action: { type: AlbumActionConst, payload: AlbumsPageModel.Props}) => {

  switch (action.type) {

    case AlbumActionConst.LOADING_SEARCH_ALBUM: {

      return {
        ...state,
        cards: [],
        isFirstTime: false,
        text: action.payload.text,
        status: action.payload.text ? ServiceStatus.loading : ServiceStatus.noAction,
        offset: 0,
      };

    }

    case AlbumActionConst.FAILED_SEARCH_ALBUM: {

      return {
        ...state,
        status: action.payload.status
      };

    }

    case AlbumActionConst.SUCCESS_SEARCH_ALBUM: {

      return {
        ...state,
        cards: action.payload.cards,
        status: action.payload.status,
        hasNext: action.payload.hasNext,
      };

    }


    case AlbumActionConst.LOADING_ADD_ALBUM: {

      return {
        ...state,
        status: ServiceStatus.loading
      };

    }

    case AlbumActionConst.SUCCESS_ADD_ALBUM: {

      return {
        ...state,
        cards: state.cards.concat(action.payload.cards),
        offset: action.payload.offset,
        hasNext: action.payload.hasNext,
      };

    }

    case AlbumActionConst.FAILED_ADD_ALBUM: {

      return {
        ...state,
        status: action.payload.status,
      };

    }

    default: return state;

  }

};
