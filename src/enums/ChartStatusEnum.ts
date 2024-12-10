export enum ChartStatus {
  WAIT = 'wait',
  RUNNING = 'running',
  SUCCEED = 'succeed',
  FAILED = 'failed',
}

export const chartStatusEnum = {
  [ChartStatus.WAIT]: {
    value: 'wait',
    text: '等待中',
    color: 'processing',
  },
  [ChartStatus.RUNNING]: {
    value: 'running',
    text: '执行中',
    color: 'warning',
  },
  [ChartStatus.SUCCEED]: {
    value: 'succeed',
    text: '执行成功',
    color: 'success',
  },
  [ChartStatus.FAILED]: {
    value: 'failed',
    text: '执行失败',
    color: 'error',
  },
};
