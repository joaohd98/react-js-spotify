import {ServiceStatus} from "../../../service";
import {CustomHistory, GlobalProps} from "../../../config/global-props";
import {TracksPageModel} from "../../tracks/providers/tracks-page-model";

export namespace AlbumsPageModel {

  export interface Props extends GlobalProps{

    isFirstTime: boolean
    text: string;
    cards: cardView[];
    status: ServiceStatus;
    hasNext: boolean,
    offset: number,
    limit: number,
    albumsRecent: {
      card: TracksPageModel.AlbumCard,
      tracks: TracksPageModel.TrackRow[],
    }[],
    functions: {
      searchAlbums: (text: string, offset: number, limit: number, isTyping?: boolean) => void,
      addAlbums: (text: string, offset: number, limit: number) => void,
      goToAlbumTracks: (history: CustomHistory, card: TracksPageModel.AlbumCard, tracks?: TracksPageModel.TrackRow[]) => void,
    }

  }

  export interface State {

  }

  export interface cardView {

    id: string,
    type: "artist" | "track" | "album",
    albumName: string,
    artistName: string,
    trackName: string,
    img: string,

  }

}
