import { request } from "@/plugins/request";

// 获取用户简介
export const getUserProfile = (username) => {
  return request({
    url: `/api/profiles/${username}`,
    method: "GET",
  });
};
