export default () => {
  const colorMode = useColorMode();
  return computed(() => ({
    chart: {
      background: "rgba(0,0,0,0)",
      width: "100%",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    theme: {
      mode: colorMode.value === "dark" ? "dark" : "light",
    },
  }));
};
