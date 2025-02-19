// IMPORT
import { modalToggle, modalToggleDefault, modalFormData, modalFormDataDefault } from './modal-shared';

// EXPORT (functions)
export const modalUpdate = async () => {
    const { $api } = useNuxtApp();

    const toast = useToast();
    const route = useRoute();
    const router = useRouter();

    $api.put(`tickets/${route.params.id}`, modalFormData.value)
        .then(() => {
            modalFormData.value = modalFormDataDefault.value;
            modalToggle.value = modalToggleDefault.value;

            toast.add({
                title: 'Success',
                description: 'The ticket was updated successfully.',
            });
            router.push('/tickets');
        });
};
export const modalDelete = () => {
    const { $api } = useNuxtApp();

    const toast = useToast();
    const route = useRoute();
    const router = useRouter();

    $api.delete(`tickets/${route.params.id}`)
        .then(() => {
            modalFormData.value = modalFormDataDefault.value;
            modalToggle.value = modalToggleDefault.value;

            toast.add({
                title: 'Success',
                description: 'The ticket was deleted successfully.',
            });
            router.push('/tickets');
        });
};
export const modalRestore = () => {
    const { $api } = useNuxtApp();

    const toast = useToast();
    const route = useRoute();
    const router = useRouter();

    $api.patch(`tickets/${route.params.id}`)
        .then(() => {
            modalFormData.value = modalFormDataDefault.value;
            modalToggle.value = modalToggleDefault.value;

            toast.add({
                title: 'Success',
                description: 'The ticket was restored successfully.',
            });
            router.push('/tickets');
        });
};