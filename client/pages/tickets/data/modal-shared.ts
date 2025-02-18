// Import
import { z } from 'zod';
import { ref } from 'vue';

// Export (variables)
export const modalToggle = ref(false);
export const modalFormData = ref({
    citation_number: '',
    status: '',
    violator: {
        first_name: '',
        middle_name: '',
        last_name: '',
        gender_id: '',
    },
});
export const modalFormCNMaxLength = 13;
export const modalFormSchema = z.object({
    citation_number: z.string().regex(/^\d{3}-\d{4}-\d{4}$/, "Invalid citation number format is 123-4567-8910"),
    status: z.string().min(1),
    violator: z.object({
        first_name: z.string(),
        middle_name: z.string().optional(), 
        last_name: z.string().optional(),
        gender_id: z.number(),
    }),
});

// Other
type FormSchema = z.output<typeof modalFormSchema>