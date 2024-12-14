export enum SearchResource {
  POST = 'post',
  CONSUMER = 'consumer',
  CHART = 'chart',
}

export const searchResourceEnum = {
  [SearchResource.POST]: {
    label: '帖子',
    value: SearchResource.POST,
  },
  [SearchResource.CONSUMER]: {
    label: '用户',
    value: SearchResource.CONSUMER,
  },
  [SearchResource.CHART]: {
    label: '图表',
    value: SearchResource.CHART,
  },
};
