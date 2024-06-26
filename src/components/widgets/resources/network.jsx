import useSWR from "swr";
import { FaNetworkWired, FaAngleUp, FaAngleDown } from "react-icons/fa";
import { useTranslation } from "next-i18next";

import Resource from "../widget/resource";
import Error from "../widget/error";

export default function Network({ options, refresh = 5000 }) {
  const { t } = useTranslation();

  const { data, error } = useSWR(`/api/widgets/resources?type=network${(options.network || ( options.network !== 'default' && options.network === `false`)) ? `&interfaceName=${options.network}` : '' }`, {
    refreshInterval: refresh,
  });

  if (error || data?.error) {
    return <Error />;
  }

  if (!data) {
    return (
      <Resource
        icon={FaNetworkWired}
        value="-"
        label={<FaAngleUp/>}
        expandedValue="-"
        expandedLabel={<FaAngleDown/>}
        percentage="0"
        expanded="true"
      />
    );
  }

  return (
    <Resource
      icon={FaNetworkWired}
      value={t('common.bbytes', { value: data?.network?.tx_bytes })}
      label={<FaAngleUp/>}
      expandedValue={t('common.bbytes', { value: data?.network?.rx_bytes })}
      expandedLabel={<FaAngleDown/>}
      percentage="0"
      expanded="true"
      iconChildren={<span class="bg-theme-100 text-theme-800 text-xs font-medium px-1 py-1 mt-1 rounded dark:bg-theme-700 dark:text-gray-300 text-center">{data.interface}</span>}
    />
  );
}
