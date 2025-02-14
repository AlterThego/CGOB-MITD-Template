<script setup lang="ts">
import type { Ref } from "vue";
import type { FormError } from "#ui/types";

const props = withDefaults(
  defineProps<{
    modelValue?: number | null;
    label?: string;
    name?: string;
    disabled?: boolean;
  }>(),
  {
    label: "USN",
    name: "usn",
    disabled: false,
  },
);

const emit = defineEmits(["update:modelValue"]);

const { $api } = useNuxtApp();

const formErrors = inject<Ref<FormError[]> | null>("form-errors", null);

type USNTestResult = {
  USN: string;
  health: {
    battery: number;
    charging: number;
    gpsfix: number;
    network: number;
    network_reg: number;
    supply: number;
  };
  location:
    | {
        latitude: number;
        longitude: number;
        altitude?: number;
      }
    | [];
  name: string;
  time: number;
  timestamp: {
    date: string;
    time: string;
  };
  params: Array<{
    caption: string;
    unit: string;
    value: number;
  }>;
};

const usnTest = ref<{
  loading: boolean;
  result?: USNTestResult;
  failed: boolean;
}>({
  loading: false,
  result: undefined,
  failed: false,
});

const data = computed<number | null | undefined>({
  get: () => props.modelValue,
  set: (val: number | null | undefined) =>
    emit("update:modelValue", (val as any) == "" ? null : val),
});

const dateString = computed(() => {
  if (!!usnTest.value.result) {
    const dt = (usnTest.value.result as USNTestResult).timestamp;
    return `${dt.date} ${dt.time}`;
  }
  return null;
});

const testUSN = (usn: number | null | undefined) => {
  usnTest.value.loading = true;
  clearResult();

  $api
    .get(`/aeron/sensor/${usn}/test`)
    .then((response) => {
      usnTest.value.result = response.data as USNTestResult;
    })
    .catch((error) => {
      usnTest.value.failed = true;
      formErrors?.value?.push({
        path: "usn",
        message: error.response.data.error,
      });
    })
    .finally(() => {
      usnTest.value.loading = false;
    });
};

const clearResult = () => {
  usnTest.value.failed = false;
  usnTest.value.result = undefined;
  formErrors!.value =
    formErrors?.value?.filter((fe) => fe.path !== "usn") || [];
};

defineExpose({
  clearResult,
});
</script>

<template>
  <TFormGroup
    :label
    :name
    required
    :ui="{
      error: 'absolute top-full mt-0 px-2 text-xs transition-all',
    }"
  >
    <TButtonGroup size="md" class="w-full">
      <TInput
        v-model.number="data"
        autocomplete="off"
        :disabled
        :ui="{ base: 'appearance-none' }"
        class="flex-auto"
        type="number"
      />
      <TButton
        color="gray"
        :label="usnTest.loading ? null : 'Test'"
        :disabled="!data || disabled"
        :loading="usnTest.loading"
        class="flex min-w-16 items-center justify-center"
        @click="testUSN(data)"
      />
    </TButtonGroup>

    <template v-if="!!usnTest.result" #hint>
      <TPopover
        mode="hover"
        :popper="{ placement: 'right' }"
        class="flex items-center"
      >
        <TButton
          variant="ghost"
          :color="usnTest.failed ? 'red' : 'green'"
          icon="tabler:info-circle"
          :padded="false"
        />
        <template #panel>
          <div class="max-h-screen-85 overflow-y-auto px-3 py-2">
            <div class="flex items-center justify-between">
              <TTypography> Result </TTypography>
              <TTypography variant="xs">
                {{ $dayjs(dateString).format("MMM DD, YYYY hh:mm A") }}
              </TTypography>
            </div>
            <TTable :rows="(usnTest.result as USNTestResult).params" />
          </div>
        </template>
      </TPopover>
    </template>
  </TFormGroup>
</template>
