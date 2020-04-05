import axios from 'axios';

export default axios.create({
  // The URL I configured the json-server api server to run on (see the package.json in api directory)
  baseURL: 'http://localhost:3001',
});
