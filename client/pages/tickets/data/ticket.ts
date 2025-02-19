// IMPORT
import { genderData } from './gender';
import { modalFormData } from './modal-shared';

// EXPORT (variables)
export const ticketDataAll = ref([]);
export const ticketDataSingle = ref();
export const ticketColumns = [
    {
        label: 'ID',
        key: 'id',
        sortable: true,
    },
    {
        label: 'Violator',
        key: 'violator.full_name',
        sortable: true,
    },
    {
        label: 'Citation Number',
        key: 'citation_number',
        sortable: true,
    },
    {
        label: 'Created At',
        key: 'created_at',
        sortable: true,
    },
    {
        label: 'Status',
        key: 'status',
        sortable: true,
    },
    {
        key: 'actions',
    },
];

// EXPORT (functions)
