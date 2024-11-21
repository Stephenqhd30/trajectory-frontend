import { StatisticCard } from '@ant-design/pro-components';
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { ChartAvatarCard, MdViewer } from '@/components';

interface Props {
  chart: API.ChartVO;
}
/**
 * 图表卡片
 * @constructor
 */
const ChartCard: React.FC<Props> = (props) => {
  const { chart } = props;

  return (
    <StatisticCard
      statistic={{
        title: <ChartAvatarCard chart={chart} />,
        valueRender: () => <MdViewer value={chart.genResult} id={`my-chart-${chart.id}`} />,
      }}
      chart={
        <ReactECharts
          option={chart.genChart ? JSON.parse(chart.genChart) : {}}
          notMerge={true}
          lazyUpdate={true}
        />
      }
    />
  );
};

export default ChartCard;
