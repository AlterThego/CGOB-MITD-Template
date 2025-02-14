<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { TForm } from "#components";
import type { Coordinate } from "~/types";
import type { AirSensor } from "~/types/models";

const USNField = defineAsyncComponent(() => import("./usnField.vue"));

const props = defineProps<{
  modelValue?: AirSensor;
}>();

const emit = defineEmits(["update:modelValue", "close"]);

const { $api } = useNuxtApp();
const toast = useToast();

const errorMessages = {
  lat: "Latitude must be between -90 and 90",
  long: "Longitude must be between -180 and 180",
};

const schema = z
  .object({
    name: z.string({ message: "Device Name is required" }),
    usn: z.number({ message: "Device USN is required" }),
    latitude: z.coerce
      .number()
      .min(-90, { message: errorMessages.lat })
      .max(90, { message: errorMessages.lat })
      .nullable()
      .transform((e) => ((e as any) == "" ? null : e)),
    longitude: z.coerce
      .number()
      .min(-180, { message: errorMessages.long })
      .max(180, { message: errorMessages.long })
      .nullable()
      .transform((e) => ((e as any) == "" ? null : e)),
  })
  .refine(
    ({ longitude, latitude }) => {
      if (latitude == null && longitude == null) return true;
      return !(
        (!!latitude && longitude == null) ||
        (latitude == null && !!longitude)
      );
    },
    {
      message: "Coordinate must have a latitude and longitude",
      path: ["longitude", "latitude"],
    },
  );
type Schema = z.output<typeof schema>;
const state = reactive<{
  name: string | null;
  usn: number | null;
  latitude: number | null;
  longitude: number | null;
}>({
  name: props.modelValue?.name ?? null,
  usn: props.modelValue?.usn ?? null,
  latitude: props.modelValue?.coordinates?.latitude ?? null,
  longitude: props.modelValue?.coordinates?.longitude ?? null,
});

const form = ref<InstanceType<typeof TForm>>(null);
const usnField = ref<InstanceType<typeof USNField> | null>(null);
const loading = ref(false);
const loadingMessage = ref("");

const coordinate = computed<Coordinate>({
  get: (): Coordinate => ({
    longitude: state.longitude,
    latitude: state.latitude,
  }),
  set: (val: Coordinate) => {
    state.longitude = val.longitude;
    state.latitude = val.latitude;
  },
});

const saveDevice = async (e: FormSubmitEvent<Schema>) => {
  loading.value = true;
  loadingMessage.value = "Saving Device...";

  usnField.value?.clearResult();

  return new Promise((resolve) => {
    const method = props.modelValue?.id ? "patch" : "post";
    const uri = props.modelValue?.id
      ? `/aeron/sensor/${props.modelValue.id}`
      : "/aeron/sensor";

    $api[method](uri, e.data)
      .then((response) => {
        emit("update:modelValue", response.data.data as AirSensor);

        toast.add({
          title: "Success",
          description: response.data.message ?? "Device saved successfully",
          color: "primary",
          icon: "tabler:circle-check",
        });
        resolve(response);
      })
      .catch((error) => {
        const errors = Object.keys(error.response.data.errors).map((k) => {
          return { path: k, message: error.response.data.errors[k][0] };
        });
        form.value?.setErrors(errors);
      })
      .finally(() => {
        loading.value = false;
      });
  });
};
</script>

<template>
  <TCard :ui="{ footer: { base: 'flex items-center justify-end gap-2' } }">
    <template #header>
      <div
        class="relative flex w-full items-center justify-between gap-2 px-6 py-2"
      >
        <TTypography variant="h4"> Sensor Editor </TTypography>
        <TButton
          variant="ghost"
          color="gray"
          icon="tabler:x"
          :disabled="loading"
          :ui="{ roudned: 'rounded-h-full' }"
          @click="emit('close')"
        />
        <div v-if="loading" class="absolute inset-x-6 bottom-0">
          <TProgress size="2xs" />
        </div>
      </div>
    </template>
    <TForm
      :schema="schema"
      :state="state"
      :validateOn="['submit']"
      ref="form"
      class="flex flex-col gap-5 px-6 pb-5"
      @submit="saveDevice"
    >
      <TFormGroup
        label="Sensor Name"
        name="name"
        required
        :ui="{ error: 'absolute top-full mt-0 px-2 text-xs transition-all' }"
      >
        <TInput
          v-model="state.name"
          size="md"
          autocomplete="off"
          :disabled="loading"
        />
      </TFormGroup>

      <USNField
        ref="usnField"
        v-model="state.usn"
        :disabled="loading || !!modelValue?.id"
      />

      <TCoordinate v-model="coordinate" required :disabled="loading" />

      <div class="flex items-center justify-end gap-2">
        <TButton
          label="Save"
          icon="tabler:device-floppy"
          class="flex min-w-16 items-center justify-center gap-1.5"
          type="submit"
          :disabled="loading"
        />
        <TButton
          variant="ghost"
          color="gray"
          label="Cancel"
          class="flex min-w-16 items-center justify-center gap-1.5"
          :disabled="loading"
          @click="emit('close')"
        />
      </div>
    </TForm>
  </TCard>
</template>
