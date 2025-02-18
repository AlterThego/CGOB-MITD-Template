// Import
import { modalFormData } from './modal-shared';

// Data
const { $api } = useNuxtApp();

const toast = useToast();
const route = useRoute();
const router = useRouter();

// Export (functions)
export const modalUpdate = async () => {
    /*const submit = modalFormData; // For some reason, this local variable is needed instead of directly calling the imported vaiablee
    const updateAPI = useNuxtApp().$api; // For some reason, this local variable is needed instead of directly calling the $api keyword

    await updateAPI.put(`tickets/${route.params.id}`, submit.value);*/
        
        
    $api.put(`tickets/${route.params.id}`, modalFormData.value)
        .then(() => {
            toast.add({
                title: 'Success',
                description: 'The ticket was updated successfully.',
            });
            router.push('/tickets');
        });
};
export const modalDelete = () => {
    $api.delete(`tickets/${route.params.id}`)
        .then(() => {
            toast.add({
                title: 'Success',
                description: 'The ticket was deleted successfully.',
            });
            router.push('/tickets');
        });
};
export const modalRestore = () => {
    $api.patch(`tickets/${route.params.id}`)
        .then(() => {
            toast.add({
                title: 'Success',
                description: 'The ticket was restored successfully.',
            });
            router.push('/tickets');
        });
};