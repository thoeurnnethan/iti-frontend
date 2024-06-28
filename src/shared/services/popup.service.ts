import type { DefaultPopup } from '@/shared/types/popup.type';
import { modalController } from '@ionic/vue';
import { markRaw } from 'vue';

class PopupService {
    constructor() {
        //
    }

    async onOpen({ dataProp, component/* , callback, onClose  */}: DefaultPopup) {
        const popup = await modalController.create({
            component: markRaw(component),
            cssClass: "",
            componentProps: dataProp
        });

        await popup.present();

        // const { role, data } = await popup.onWillDismiss();
        // if (role === "confirm" && callback) {
        //     callback(data)
        // } else if (role === "close" && onClose) {
        //     onClose(data)
        // }
    }

}

export default PopupService
