// Export (variables)
export const ticketData = ref([]);
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
        label: 'Status',
        key: 'status',
        sortable: true,
    },
    {
        label: 'Created At',
        key: 'created_at',
        sortable: true,
    },
    {
        key: 'actions',
    },
];