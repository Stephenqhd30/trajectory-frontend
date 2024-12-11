export enum ChartType {
  Line = '折线图',
  Bar = '柱状图',
  Pie = '饼图',
  Scatter = '散点图',
  KLineChart = 'K线图'
}


export const chartTypeEnum = {
  [ChartType.Line]: {
    value: '折线图',
    text: '折线图',
  },
  [ChartType.Bar]: {
    value: '柱状图',
    text: '柱状图',
  },
  [ChartType.Pie]: {
    value: '饼图',
    text: '饼图',
  },
  [ChartType.Scatter]: {
    value: '散点图',
    text: '散点图',
  },
  [ChartType.KLineChart]: {
    value: 'K线图',
    text: 'K线图',
  }
};
