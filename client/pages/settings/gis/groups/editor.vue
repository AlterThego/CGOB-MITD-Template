<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import type { LocationGroup } from "~/types/models/gis";
import type { PropType } from "vue";

const model = defineModel({
  default: null,
  type: Object as PropType<LocationGroup>,
});

const emit = defineEmits(["close"]);

const { $api } = useNuxtApp();
const toast = useToast();

const schema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(1, { message: "Name is required" }),
  description: z.string().nullable(),
});

type Schema = z.output<typeof schema>;

const loading = ref(false);
const state = reactive({
  name: model.value?.name ?? null,
  description: model.value?.description ?? null,
});

const isEditing = computed(() => !!model.value?.id);

const saveGroup = async (e: FormSubmitEvent<Schema>) => {
  return new Promise((resolve, reject) => {
    loading.value = true;
    const method = isEditing.value ? "patch" : "post";
    const uri = `/gis/locations/group${isEditing.value ? "/" + model.value?.id : ""}`;

    $api[method](uri, e.data)
      .then((response) => {
        model.value = response.data.data;

        toast.add({
          title: "Success",
          description: response.data.message ?? "Device saved successfully",
          color: "primary",
          icon: "tabler:circle-check",
        });
        resolve(response);
      })
      .catch(reject)
      .finally(() => {
        loading.value = false;
      });
  });
};

defineShortcuts({
  escape: () => {
    emit("close");
  },
});
</script>

<template>
  <TCard
    :ui="{
      width: 'w-screen-95 max-w-md',
      body: {
        base: 'flex flex-col gap-5 ',
        padding: 'p-4',
      },
    }"
  >
    <template #header>
      <TTypography class="px-8" variant="h4">
        {{ isEditing ? "Edit Group" : "Add Group" }}
      </TTypography>
      <div class="px-4">
        <TButton
          icon="tabler:x"
          color="gray"
          variant="ghost"
          @click="emit('close')"
        />
      </div>
    </template>

    <TForm
      :schema="schema"
      :state="state"
      :validateOn="['submit']"
      class="flex flex-col items-center gap-5"
      @submit="saveGroup"
    >
      <TFormGroup label="Name" name="name" required>
        <TInput
          v-model="state.name"
          size="md"
          :disabled="loading"
          :ui="{ base: 'w-screen-95' }"
        />
      </TFormGroup>
      <TFormGroup label="Description" name="description">
        <TTextarea
          v-model="state.description"
          size="md"
          :disabled="loading"
          :ui="{ base: 'w-screen-95 max-w-[400px]' }"
        />
      </TFormGroup>

      <div class="flex w-full max-w-[400px] items-center justify-end gap-4">
        <TButton
          type="submit"
          label="Save"
          icon="tabler:device-floppy"
          size="md"
          :loading="loading"
        />

        <TButton
          label="Cancel"
          size="md"
          color="gray"
          variant="ghost"
          @click="emit('close')"
        />
      </div>
    </TForm>
  </TCard>
</template>
