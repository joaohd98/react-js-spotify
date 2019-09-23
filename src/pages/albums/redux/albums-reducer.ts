import {AlbumActionConst, AlbumsAction} from "./albums-action";
import {ServiceStatus} from "../../../service";
import {AlbumsPageModel} from "../services/albums-page-model";
import {AlbumsPageInteractor} from "../services/albums-page-interactor";

export const AlbumsInitialState: AlbumsPageModel.Props = {

  text: "",
  cards: [],
  status: ServiceStatus.noAction,
  offset: 0,
  footerLoading: {
    seeMore: false,
    reachedBottom: false,
    hasNext: false,
    status: ServiceStatus.noAction
  },
  limit: AlbumsPageInteractor.getOffset(),
  functions: {
    searchAlbums: (text, offset, limit) => AlbumsAction.searchAlbums(text, offset, limit),
    addAlbums: (text, offset, limit) => AlbumsAction.addAlbums(text, offset, limit),
  }

};

export const AlbumsReducer = (state = AlbumsInitialState, action: { type: AlbumActionConst, payload: any}) => {

  switch (action.type) {

    case AlbumActionConst.LOADING_SEARCH_ALBUM: {

      return {
        ...state,
        cards: [],
        text: action.payload.text,
        offset: 0,
        footerLoading: {
          hasNext: true,
          seeMore: false,
          reachedBottom: false,
          status: ServiceStatus.noAction
        },
        status: ServiceStatus.loading
      };

    }

    case AlbumActionConst.SUCCESS_SEARCH_ALBUM: {

      return {
        ...state,
        cards: action.payload.cards,
        status: action.payload.status,
        footerLoading: {
          ...state.footerLoading,
          hasNext: action.payload.hasNext
        }
      };

    }

    case AlbumActionConst.FAILED_SEARCH_ALBUM: {

      return {
        ...state,
        status: action.payload.status
      };

    }

    case AlbumActionConst.LOADING_ADD_ALBUM: {

      return {
        ...state,
        footerLoading: {
          ...state.footerLoading,
          seeMore: true,
          status: ServiceStatus.loading,
          reachedBottom: true
        }
      };

    }

    case AlbumActionConst.SUCCESS_ADD_ALBUM: {

      return {
        ...state,
        cards: state.cards.concat(action.payload.cards),
        offset: action.payload.offset,
        footerLoading: {
          ...state.footerLoading,
          status: action.payload.status,
          hasNext: action.payload.hasNext,
        }
      };

    }

    case AlbumActionConst.FAILED_ADD_ALBUM: {

      return {
        ...state,
        footerLoading: {
          ...state.footerLoading,
          status: action.payload.status,
        }
      };

    }

    default: return state;

  }

};
