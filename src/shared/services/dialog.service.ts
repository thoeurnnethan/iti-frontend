import type { Dialog } from '@/shared/types/dialog.type'
import i18n from "@/i18n";
import { modalController } from '@ionic/vue';
import baseDialog from '@/components/base-dialog/base-dialog.vue'

/**
   * Dialog 
   * @param title (string) dialog title
   * @param content (string|component) dialog content/description
   * @param btnLabel (string)
   * @param showCancel (boolean)
   * @param callback
*/
class DialogService {
    private translate = i18n.global.t
    constructor() {
        //
    }

    async onOpen({ title, content, btnLabel = this.translate('common.ok'), showCancel, cancelLabel, onSetTimeout = 300 }: Dialog) {
        setTimeout(async() => {
            const modal = await modalController.create({
                component: baseDialog,
                cssClass: "pop_alert",
                componentProps: {
                    title,
                    content,
                    btnLabel,
                    showCancel,
                    cancelLabel
                },
                backdropDismiss: false
            });
            await modal.present();
        }, onSetTimeout);
    }
}

export default DialogService
