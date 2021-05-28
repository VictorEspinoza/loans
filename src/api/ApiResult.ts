export default class ApiResult {
	success: boolean;
	data: any;

	constructor(success: boolean, data: any) {
		this.success = success;

		if (!data) {
			throw new Error('No data provided');
		}

		this.data = data;
	}

	isSuccess() {
		return this.success === true;
	}

	isFail() {
		return !this.success;
	}

	getResult() {
		return this.data.result;
	}

	getMessage() {
		return this.data.message;
	}
}
