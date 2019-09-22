import Axios from '../utils/Axios.utils';
import { endPoints as BudgetEndpoints } from '../constants/Budget.constants';

class BudgetApi {

	static getBoards(formData, config) {
		return Axios.POST(BudgetEndpoints.GET_BOARDS, formData, config);
	}

	static getColumns(formData, config) {
		return Axios.POST(BudgetEndpoints.GET_COLUMNS, formData, config);
	}

	static getRows(formData, config) {
		return Axios.POST(BudgetEndpoints.GET_ROWS, formData, config);
	}

	static addRow(formData, config) {
		return Axios.POST(BudgetEndpoints.ADD_ROW, formData, config);
	}
}

export default BudgetApi;
