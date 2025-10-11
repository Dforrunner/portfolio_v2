
import { useThemeStore } from "@/hooks/use-is-dark-mode";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function CalCom() {
  const { isDark } = useThemeStore();

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "1-hr-meeting" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: isDark ? "dark" : "light",
      });
    })();

    console.log({ isDark });
  }, [isDark]);

  return (
    <Cal
      namespace="30min"
      calLink="mo-barut/30min"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view", theme: isDark ? "dark" : "light" }}
    />
  );
}
