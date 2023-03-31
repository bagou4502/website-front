import { config } from '../../config/config';
import http from '../http';


const registerUser = (email: string, password: string, name: string): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    http
      .post(`${config.privateapilink}/auth/register`, { email, password, name })
      .then((data) => resolve(data))
      .catch(reject);
  });
};

export default registerUser;