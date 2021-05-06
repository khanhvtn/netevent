import {useState, useEffect} from 'react'
import axios from 'axios'

function UsersAPI() {

    const [users, setUsers] = useState([])

    const getUsers = async () => {
        const res = await axios.get('/api/user/users')
        setUsers(res.data.users)
    }

    useEffect(() => {
        getUsers()
    },[])

    return {
        users: [users, setUsers]
    }
}

export default UsersAPI