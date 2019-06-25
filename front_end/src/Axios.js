import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://todolist-50cd3.firebaseio.com/mathubs/'  
});
export default instance