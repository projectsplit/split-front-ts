import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const useRedirectToTransactions = () => {

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('RAN')
        //navigate(`/${params.groupid}/transactions`)
        navigate(`/groups/active/${params.groupid}/transactions`)
    }, [])

    return null;
}
