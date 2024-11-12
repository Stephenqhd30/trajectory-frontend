/**
 * 用户角色枚举
 */
export enum ReviewStatusEnum {
  REVIEWING = 0,
  PASS = 1,
  REJECT = 2,
}

/**
 * 用户角色枚举
 */
export const reviewStatus = {
  [ReviewStatusEnum.REVIEWING]: {
    text: '审核中',
    value: ReviewStatusEnum.REVIEWING,
    color: 'processing',
  },
  [ReviewStatusEnum.PASS]: {
    text: '审核通过',
    value: ReviewStatusEnum.PASS,
    color: 'success',
  },
  [ReviewStatusEnum.REJECT]: {
    text: '拒绝',
    value: ReviewStatusEnum.REJECT,
    color: 'error',
  },
};
