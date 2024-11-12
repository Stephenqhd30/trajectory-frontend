// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addTag POST /api/tag/add */
export async function addTagUsingPost(body: API.TagAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/tag/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteTag POST /api/tag/delete */
export async function deleteTagUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/tag/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** editTag POST /api/tag/edit */
export async function editTagUsingPost(body: API.TagEditRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/tag/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getTagVOById GET /api/tag/get/vo */
export async function getTagVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTagVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseTagVO_>('/api/tag/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listTagByPage POST /api/tag/list/page */
export async function listTagByPageUsingPost(
  body: API.TagQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageTag_>('/api/tag/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listTagVOByPage POST /api/tag/list/page/vo */
export async function listTagVoByPageUsingPost(
  body: API.TagQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageTagVO_>('/api/tag/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listTagByTree GET /api/tag/list/tree */
export async function listTagByTreeUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListTagDTO_>('/api/tag/list/tree', {
    method: 'GET',
    ...(options || {}),
  });
}

/** listMyTagVOByPage POST /api/tag/my/list/page/vo */
export async function listMyTagVoByPageUsingPost(
  body: API.TagQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageTagVO_>('/api/tag/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateTag POST /api/tag/update */
export async function updateTagUsingPost(
  body: API.TagUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/tag/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
