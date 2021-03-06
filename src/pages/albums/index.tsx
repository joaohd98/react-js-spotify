import React from 'react';
import {SearchBar} from "./components/search-bar";
import {SubHeaderTitle} from "./components/sub-header-title";
import {ListAlbums} from "./components/list-albums";
import {StatesReducers} from "../../config/store";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {AlbumsPageModel} from "./providers/albums-page-model";
import {FooterLoading} from "./components/footer-loading";
import {AlbumsPageInitialState} from "./redux/albums-page-reducer";

class Albums extends React.Component<AlbumsPageModel.Props, AlbumsPageModel.State> {

  componentDidMount() {

    const {cards, offset, limit, isFirstTime} = this.props;
    const { search } = this.props.match!.params;


    if(cards.length === 0 && search && isFirstTime)
      this.props.functions.searchAlbums(search, limit, offset)

  }

  render() {

    return (
      <div>
        <SearchBar {...this.props}/>
        <SubHeaderTitle {...this.props}/>
        <ListAlbums {...this.props} />
        <FooterLoading {...this.props} />
      </div>
    )

  }

}

const mapStateToProps = (state: StatesReducers) => {
  return {
    ...state.AlbumsReducer,
    albumsRecent: state.UserPersistedReducer.albumsRecent}
};

const mapDispatchToProps = dispatch => ({
  functions: bindActionCreators(AlbumsPageInitialState.functions, dispatch)
});

export const AlbumsPage = connect(mapStateToProps, mapDispatchToProps)(Albums);
