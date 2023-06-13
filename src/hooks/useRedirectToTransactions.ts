import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const useRedirectToTransactions = () => {

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        navigate(`/${params.groupid}/transactions`)
    }, [])

    return null;
}
