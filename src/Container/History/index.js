import React, { useEffect, useCallback } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import * as Style from "./style";
import BodyContainer from "../../Common/Body";
import DumbHistoryComponent from "../../Components/History";
import SearchInput from "../../Components/UI/SearchInput";
import SortInput from "../../Components/UI/SortInput";
import {
  getMyHistory,
  goToPrivateRoom,
  blockContact,
  ClearHistory,
  DeleteHistory
} from "../../store/History/action";
import { fetchMyData } from "../../store/Me/action";

const History = (props) => {
  const { getMyHistory,DeleteHistory, goToPrivateRoom, blockContact,ClearHistory } = props;

  const dispatch = useDispatch();
  const Loading = useSelector((state) => state.HistoryReducer.Loading);
  const MyHistory = useSelector((state) => state.HistoryReducer.MyHistory);
  const me = useSelector((state) => state.MeReducer.Me);

  const getMyHistoryCall = useCallback(() => dispatch(getMyHistory), [
    dispatch,
    getMyHistory,
  ]);
  const fetchMyDataCall = useCallback(() => dispatch(fetchMyData), [dispatch]);

  useEffect(() => {
    fetchMyDataCall();
  }, [fetchMyDataCall]);

  useEffect(() => {
    getMyHistoryCall();
  }, [getMyHistoryCall]);

   return Loading ? (
    <h1>Loading ...</h1>
  ) : (
    <Style.Wrapper as={BodyContainer}>
      <Style.SearchBar>
        <SearchInput placeholder="Search" name="Search" iconSearch />
        <SortInput width="150px" height="40px" />
      </Style.SearchBar>

      <DumbHistoryComponent
        HistoryData={MyHistory}
        goToPrivateRoom={goToPrivateRoom}
        blockContact={blockContact}
        me={me}
        ClearHistory={ClearHistory}
        DeleteHistory={DeleteHistory}
      />
    </Style.Wrapper>
  );
};

export default connect(null, {
  getMyHistory,
  goToPrivateRoom,
  blockContact,
  ClearHistory,
  DeleteHistory
})(History);
