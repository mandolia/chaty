import React, { useEffect, useCallback } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestoreFirebase } from '../../firebaseService/FirebaseIndex';
import * as Style from './style';
import BodyContainer from '../../Common/Body';
import ProfilComponent from '../../Components/UserProfil';
import { fetchClientData, blockContact, unBlockContact, fetchMyData } from '../../store/Me/action';

const userRef = firestoreFirebase.collection('/users');

const UserProfil = (props) => {
    const { fetchClientData, blockContact, fetchMyData, unBlockContact } = props;

    const userProfil = useSelector((state) => state.MeReducer.userProfil);
    const loadingUser = useSelector((state) => state.MeReducer.loadingUser);
    const me = useSelector((state) => state.MeReducer.Me);
    const Loading = useSelector((state) => state.MeReducer.Loading);

    useEffect(() => {
        fetchClientData(props.match.params.id);
    }, [fetchClientData, props.match.params.id]);
    const dispatch = useDispatch()

    const fetchMyDataCall = useCallback(
        () => dispatch(fetchMyData),
        [dispatch, fetchMyData]
    );

    useEffect(() => {
        fetchMyDataCall();
    }, [fetchMyDataCall]);


    const query = me.id && userRef
        .where(firebase.firestore.FieldPath.documentId(),
            "==",
            me.id);

    const [MyData, loading1, error1] = useCollectionData(query, { idField: 'id' });

    return (
        loading1 ? <h1>Loading ...</h1> :
            loadingUser ? <h1>Loading ....</h1> :
                <Style.Wrapper as={BodyContainer}>
                    <ProfilComponent
                        unBlockContact={unBlockContact}
                        blockContact={blockContact}
                        userProfil={userProfil}
                        me={MyData[0]}
                    />
                </Style.Wrapper>
    );
};

export default connect(null,
    {
        fetchClientData,
        blockContact,
        unBlockContact,
        fetchMyData
    })(UserProfil);
