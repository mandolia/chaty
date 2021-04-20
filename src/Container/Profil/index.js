import React, { useEffect, useCallback } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import * as Style from './style';
import BodyContainer from '../../Common/Body';
import ProfilComponent from '../../Components/Profil';
import { fetchMyData, editProfil, saveAvatar } from '../../store/Me/action';

const Contact = (props) => {
    const {
        fetchMyData,
        editProfil,
        saveAvatar
    } = props;

    const dispatch = useDispatch()
    const me = useSelector((state) => state.MeReducer.Me);
    const LoadingAvatar = useSelector((state) => state.MeReducer.avatarLoading);
    const avatarFaild = useSelector((state) => state.MeReducer.avatarFaild);
    const Loading = useSelector((state) => state.MeReducer.Loading);

    const fetchMyDataCall = useCallback(
        () => dispatch(fetchMyData),
        [dispatch, fetchMyData]
    );

    useEffect(() => {
        fetchMyDataCall();
    }, [fetchMyDataCall]);

    return (
        Loading ? <h1>Loading ...</h1> :
            <Style.Wrapper as={BodyContainer}>
                <ProfilComponent
                    editProfil={editProfil}
                    LoadingAvatar={LoadingAvatar}
                    avatarFaild={avatarFaild}
                    saveAvatar={saveAvatar}
                    me={me} />

            </Style.Wrapper>
    );
};

export default connect(null,
    {
        fetchMyData,
        editProfil,
        saveAvatar
    })(Contact);
