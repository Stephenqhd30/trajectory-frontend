import { StatisticCard } from '@ant-design/pro-components';
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { ChartAvatarCard, MdViewer } from '@/components';
import { Grid } from 'antd';

interface Props {
  chart: API.ChartVO;
}

const { useBreakpoint } = Grid;
/**
 * 图表卡片
 * @constructor
 */
const ChartCard: React.FC<Props> = (props) => {
  const { chart } = props;
  const scene = useBreakpoint();
  const isMobile = !scene.md;
  return (
    <StatisticCard
      statistic={{
        title: <ChartAvatarCard chart={chart} />,
        valueRender: () => <MdViewer value={chart.genResult} id={`my-chart-${chart.id}`} />,
      }}
      chart={<ReactECharts option={chart.genChart ? JSON.parse(chart.genChart) : {}} />}
    />
  );
};

export default ChartCard;
