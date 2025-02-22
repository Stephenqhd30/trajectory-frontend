// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addPostComment POST /api/postComment/add */
export async function addPostCommentUsingPost(
  body: API.PostCommentAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/postComment/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deletePostComment POST /api/postComment/delete */
export async function deletePostCommentUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/postComment/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** editPostComment POST /api/postComment/edit */
export async function editPostCommentUsingPost(
  body: API.PostCommentEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/postComment/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getPostCommentVOById GET /api/postComment/get/vo */
export async function getPostCommentVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPostCommentVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePostCommentVO_>('/api/postComment/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listPostCommentByPage POST /api/postComment/list/page */
export async function listPostCommentByPageUsingPost(
  body: API.PostCommentQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostComment_>('/api/postComment/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listPostCommentVOByPage POST /api/postComment/list/page/vo */
export async function listPostCommentVoByPageUsingPost(
  body: API.PostCommentQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostCommentVO_>('/api/postComment/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMyPostCommentVOByPage POST /api/postComment/my/list/page/vo */
export async function listMyPostCommentVoByPageUsingPost(
  body: API.PostCommentQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePostCommentVO_>('/api/postComment/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updatePostComment POST /api/postComment/update */
export async function updatePostCommentUsingPost(
  body: API.PostCommentUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/postComment/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
