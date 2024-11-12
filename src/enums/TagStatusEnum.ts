/**
 * 标签状态枚举
 */
export enum TagStatusEnum {
  NOT_IS_PARENT = 0,
  IS_PARENT = 1,
}

/**
 * 标签状态枚举
 */
export const tagStatus = {
  [TagStatusEnum.NOT_IS_PARENT]: {
    text: '不是父标签',
    value: TagStatusEnum.NOT_IS_PARENT
  },
  [TagStatusEnum.IS_PARENT]: {
    text: '是父标签',
    value: TagStatusEnum.IS_PARENT
  }
}
