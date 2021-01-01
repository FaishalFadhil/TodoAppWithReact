import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000'
  // baseURL: 'https://murmuring-chamber-41748.herokuapp.com'
})

export default instance
