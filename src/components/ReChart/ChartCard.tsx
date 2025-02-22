import { StatisticCard } from '@ant-design/pro-components';
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { ChartAvatarCard, MdViewer } from '@/components';
import { ChartStatus } from '@/enums/ChartStatusEnum';
import { Result } from 'antd';

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
    <>
      {/*生成成功*/}
      {chart.status === ChartStatus.SUCCEED && (
        <StatisticCard
          statistic={{
            title: <ChartAvatarCard chart={chart} />,
            valueRender: () => <MdViewer value={chart.genResult}/>,
          }}
          chart={
            <ReactECharts
              option={chart.genChart ? JSON.parse(chart.genChart) : {}}
              notMerge={true}
              lazyUpdate={true}
            />
          }
        />
      )}
      {/*等待生成中*/}
      {chart.status === ChartStatus.WAIT && (
        <StatisticCard
          statistic={{
            title: <ChartAvatarCard chart={chart} />,
            valueRender: () => undefined,
          }}
          chart={
            <Result
              status="403"
              title="您的图表正在等待生成哦~"
              subTitle="您的图表正在等待生成哦~"
            />
          }
        />
      )}
      {/*等待生成中*/}
      {chart.status === ChartStatus.FAILED && (
        <StatisticCard
          statistic={{
            title: <ChartAvatarCard chart={chart} />,
            valueRender: () => undefined,
          }}
          chart={<Result status="500" title="您的图表生成失败了" subTitle="您的图表生成失败了" />}
        />
      )}
      {/*正在生成中*/}
      {chart.status === ChartStatus.RUNNING && (
        <StatisticCard
          statistic={{
            title: <ChartAvatarCard chart={chart} />,
            valueRender: () => undefined,
          }}
          chart={<Result status="404" title="您的图表正在生成中!" subTitle="您的图表正在生成中!" />}
        />
      )}
    </>
  );
};

export default ChartCard;
