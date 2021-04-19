import { request } from "@/plugins/request";

// 获取公共文章列表
export const getArticles = (params) => {
  return request({
    url: "/api/articles",
    method: "GET",
    params: params,
  });
};

// 获取文章详情
export const getArticle = (slug) => {
  return request({
    url: `/api/articles/${slug}`,
    method: "GET",
  });
};

// 获取用户关注的文章
export const getFeedArticles = (params) => {
  return request({
    url: "/api/articles/feed",
    method: "GET",
    params: params,
  });
};

export const favoriteArticle = (slug) => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: "POST",
  });
};

export const unfavoriteArticle = (slug) => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: "DELETE",
  });
};

// 发表文章
export const createArticle = (article) => {
  return request({
    url: "/api/articles",
    method: "POST",
    data: {
      article: {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: Array.isArray(article.tagList) ? article.tagList : undefined, //  optional
      },
    },
  });
};

// 更新文章
export const updateArticle = (slug, article) => {
  return request({
    url: `/api/articles/${slug}`,
    method: "PUT",
    data: {
      article: {
        title: article.title, //  optional
        description: article.description, //  optional
        body: article.body, //  optional
      },
    },
  });
};

// 删除文章
export const deleteArticle = (slug) => {
  return request({
    url: `/api/articles/${slug}`,
    method: "DELETE",
  });
};

// 获取文章评论
export const getArticleComments = (slug) => {
  return request({
    url: `/api/articles/${slug}/comments`,
    method: "GET",
  });
};

// 发表文章评论
export const createArticleComment = (slug, body) => {
  return request({
    url: `/api/articles/${slug}/comments`,
    method: "POST",
    data: {
      comment: { body },
    },
  });
};

// 删除文章评论
export const deleteArticleComment = (slug, commentId) => {
  return request({
    url: `/api/articles/${slug}/comments/${commentId}`,
    method: "DELETE",
  });
};
