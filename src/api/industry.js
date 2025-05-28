import request from "@/utils/request";
export function allChartListApi(params, data) {
  return request({
    url: "/industry/list",
    method: "post",
    params,
    data,
  });
}
