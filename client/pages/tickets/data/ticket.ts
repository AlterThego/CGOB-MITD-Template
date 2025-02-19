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
export const ticketFetchAll = () => {
    const { $api } = useNuxtApp();

    $api.get('tickets')
        .then((response) => {
            ticketDataAll.value = response.data;
        });
};
export const ticketFetchSingle = () => {
    const { $api } = useNuxtApp();

    const route = useRoute();

    $api.get(`tickets/${route.params.id}`)
        .then((response) => {
            // Get
            ticketDataSingle.value = response.data;

            // Property "gender" is retrieved. Do not be confused with "gender_id".
            // Get "gender_id" using "gender".
            const getGenderID = (name : any) => {
                const gender = genderData.find(g => g.name === name);
                return gender ? gender.id : "Unknown";
            };

            // Set
            ticketDataSingle.value.violator.gender_id = getGenderID(ticketDataSingle.value.violator.gender);
            modalFormData.value = ticketDataSingle.value;
        });
};