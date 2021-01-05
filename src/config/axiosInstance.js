import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://localhost:3000'
  baseURL: 'https://gentle-meadow-81433.herokuapp.com'
})

export default instance
