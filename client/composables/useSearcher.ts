import type { AxiosResponse } from "axios";

type SearcherOptions = {
  api: string;
  limit?: number;
  method?: "get" | "post";
  appendToUrl?: boolean;
  onPageChange?: (page: number) => void;
};

export const useSearcher = (options: SearcherOptions) => {
  const $route = useRoute();
  const $router = useRouter();
  const { $api } = useNuxtApp();

  const _options: SearcherOptions = Object.assign(
    {
      limit: 25,
      method: "get",
      onPageChange: (p: number) => {},
      appendToUrl: false,
    },
    options,
  );

  const pagination = ref(
    Object.assign(
      {
        total: 0,
        page: 1,
        limit: _options.limit,
      },
      {
        page: Math.max(
          1,
          Number(_options.appendToUrl ? $route.query.page : "" || 1) || 1,
        ),
        limit: Math.max(
          1,
          Number(
            _options.appendToUrl ? $route.query.limit : "" || _options.limit,
          ) || _options.limit!,
        ),
      },
    ),
  );

  const bounce = ref(true);
  const userParams = ref<any>({});

  const searcher = async (search?: any): Promise<AxiosResponse> => {
    return new Promise((resolve, reject) => {
      Object.assign(userParams.value, search);

      const params = Object.assign(
        {
          page: pagination.value.page,
          limit: pagination.value.limit,
        },
        search,
      );

      if (_options.appendToUrl) {
        $router.push({
          name: $route.name,
          query: params,
        });
      }

      $api[_options.method!](
        _options.api,
        _options.method == "get" ? { params } : params,
      )
        .then((response: AxiosResponse) => {
          pagination.value.total = response.data.total;
          if (response.data.page != pagination.value.page) {
            pagination.value.page = response.data.page;
            bounce.value = false;
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const debounced = useDebounceFn(() => {
    if (bounce.value) {
      _options.onPageChange?.(pagination.value.page);
    }
    bounce.value = true;
  }, 250);

  watch(() => pagination.value.page, debounced);

  onMounted(() => nextTick(() => {}));

  return {
    pagination,
    searcher,
  };
};
