import { ProCard } from '@ant-design/pro-components';
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { MdViewer, UserAvatarCard } from '@/components';
import { Grid } from 'antd';
import dayjs from 'dayjs';

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
    <ProCard>
      <ProCard
        bodyStyle={{ padding: isMobile ? 4 : 16 }}
        headStyle={{ padding: isMobile ? 4 : 16 }}
        extra={isMobile ? null : <div>{dayjs(chart.createTime).format('YYYY-MM-DD')}</div>}
        title={<UserAvatarCard user={chart?.userVO ?? {}} />}
      >
        <ReactECharts option={JSON.parse(chart.genChart as string)} />
        <MdViewer value={chart.genResult} />
      </ProCard>
    </ProCard>
  );
};

export default ChartCard;
