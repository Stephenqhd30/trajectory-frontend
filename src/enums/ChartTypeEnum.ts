export enum ChartType {
  Line = '折线图',
  Bar = '柱状图',
  Pie = '饼图',
  Scatter = '散点图',
  Bubble = '气泡图',
  Area = '面积图',
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
  [ChartType.Bubble]: {
    value: '气泡图',
    text: '气泡图',
  },
  [ChartType.Area]: {
    value: '面积图',
    text: '面积图',
  },
};
