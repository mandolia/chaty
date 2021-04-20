import React, { useEffect, useCallback } from 'react';
import AddCard from '../../../Components/GroupChat/AddGroup';
import * as Style from '../style';
import BodyContainer from '../../../Common/Body';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
  addGroupAction,
  getAllGroups,
  goToGroupDetail,
  goToPrivateRoom
} from '../../../store/GroupChat/action';

const AddGroup = (props) => {

  const {
    addGroupAction,
    getAllGroups,
    goToGroupDetail,
    goToPrivateRoom
  } = props;

  const dispatch = useDispatch();
  const AllGroups = useSelector((state) => state.GroupChatReducer.allGroups)
  const loadGroups = useSelector((state) => state.GroupChatReducer.loadGroups)

  const getAllGroupsCall = useCallback(() => {
    dispatch(getAllGroups)
  }, [dispatch, getAllGroups])

  useEffect(() => {
    getAllGroupsCall()
  }, [getAllGroups, getAllGroupsCall])

  return loadGroups ? <h1>Loading ...</h1> :
    <Style.Wrapper as={BodyContainer}>
      <AddCard
        AllGroups={AllGroups}
        addGroupAction={addGroupAction}
        goToGroupDetail={goToGroupDetail}
        goToPrivateRoom={goToPrivateRoom}
      />
    </Style.Wrapper>;
};
export default connect(null,
  {
    addGroupAction,
    getAllGroups,
    goToGroupDetail,
    goToPrivateRoom
  })(AddGroup);
