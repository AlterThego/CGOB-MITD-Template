<script setup lang="ts">
import { z } from 'zod'

const schema = z.object({
    citation_number: z.string().regex(/^\d{3}-\d{4}-\d{4}$/, "Invalid citation number format - must be XXX-XXX-XXXX"),
})

type Schema = z.output<typeof schema>

const state = reactive({
    citation_number: '',
    password: undefined
})

</script>

<template>
    <TForm :schema="schema" :state="state" class="space-y-4" >
        <TFormGroup label="Email" name="citation_number">
            <TInput v-model="state.citation_number" />
        </TFormGroup>

        <TFormGroup label="Password" name="password">
            <TInput v-model="state.password" type="password" />
        </TFormGroup>

        <TButton type="submit">
            Submit
        </TButton>
    </TForm>
    {{ state }}
</template>
