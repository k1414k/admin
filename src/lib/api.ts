import axios from 'axios'

const api = axios.create({
    baseURL: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true
})

export default api