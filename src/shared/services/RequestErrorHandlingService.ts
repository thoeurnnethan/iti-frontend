import { modalController } from "@ionic/vue";
import DialogService from "./dialog.service";
// import Utils from "../util";
// import i18n from "@/i18n";

const dialog = new DialogService()
// const utils = new Utils()
// const translate = i18n.global.t
export class RequestErrorHandlingService {

	/**
	 * Display dialog upon request error
	 * @param {any} res server response
	 * @param {HttpHeader} httpStatus http response
	 * 
	 * Display dialog base on request or http response. 
	 */

	public static requestErrorHandler(res: any) {
		if(!res.data.header.result){
			setTimeout(async () => {
				await dialog.onOpen({
					showCancel: false,
					title: res?.data?.header?.error_code,
					content: res?.data?.header?.error_text,
					callback: () => {
						modalController.dismiss()
					}
				});
			}, 300);
		}else {
			setTimeout(async () => {
				await dialog.onOpen({
					showCancel: false,
					title: 'Success',
					content: 'successfully',
					callback: () => {
						modalController.dismiss()
					}
				});
			}, 300);
		}
	}
}