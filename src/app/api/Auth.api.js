import Axios from '../utils/Axios.utils';
import { endPoints as AuthEndpoints } from '../constants/Auth.constants';

class AuthApi {

	static logout(config) {
		return Axios.POST(AuthEndpoints.LOGOUT, {}, config);
	}
}

export default AuthApi;
