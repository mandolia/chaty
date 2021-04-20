import { useCallback, useEffect, useState } from 'react';
import { getUserDataById } from '../helpers'


const useUserData = (Members) => {
    const [usersData, setUsersData] = useState([]);
    const [loading, setLOading] = useState(true);

    const usersDataMemo = useCallback(async () => {
        const data = await Members.map(async e => {
            const user = await getUserDataById(e);
            return { ...user, id: e };
        })
        Promise.all(data).then((values) => {
            setUsersData(values);
            setLOading(false);
        });

    }, [Members])

    useEffect(() => {
        usersDataMemo()
    }, [Members, loading])

    return [usersData]
}

export default useUserData;