// Import
import { modalFormData } from './modal-shared';

// Data
const { $api } = useNuxtApp();

const toast = useToast();

// Export (functions)
export const modalSubmit = () => {
    const submit = modalFormData; // For some reason, this local variable is needed instead of directly calling the imported vaiable

    $api.post('tickets', submit.value)
        .then((response) => {
            toast.add({
                title: 'Success',
                description: 'The ticket was created successfully.',
            });
        });
};