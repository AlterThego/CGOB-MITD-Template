// IMPORT
import { modalToggle, modalToggleDefault, modalFormData, modalFormDataDefault } from './modal-shared';
import { ticketFetchAll } from './ticket';

// EXPORT (functions)
export const modalSubmit = () => {
    const { $api } = useNuxtApp();

    const toast = useToast();

    $api.post('tickets', modalFormData.value)
        .then(() => {
            modalFormData.value = modalFormDataDefault.value;
            modalToggle.value = modalToggleDefault.value;

            toast.add({
                title: 'Success',
                description: 'The ticket was created successfully.',
            });
            ticketFetchAll();
        });
};