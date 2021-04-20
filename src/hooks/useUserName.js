import { useCallback, useEffect, useState } from 'react';
import { getUserNameById } from '../helpers'

const useUserName = (id) => {
    const [userName, setUserName] = useState('')

    const usersNameMemo = useCallback(async () => {
        await getUserNameById(id).then(res => {
            setUserName(res)
        })

    }, [id])

    useEffect(() => {
        usersNameMemo()
    }, [id])

    return [userName]
}

export default useUserName;