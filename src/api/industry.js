import request from "@/utils/request";

//获取所有的图谱
export function allChartListApi(params, data) {
  return request({
    url: "/industry/list",
    method: "post",
    params,
    data,
  });
}

// 获取当前图谱的产业链
export function industryChainApi(code) {
  return request({
    url: `/industry/${code}/chain`,
    method: "get",
  });
}

//给产业链添加关系
export function industryChainRelateApi(data) {
  return request({
    url: `/temp/stream`,
    method: "post",
    data,
  });
}

//获取产业链关系
export function industryChainRelationApi(params) {
  return request({
    url: `/temp/stream/node`,
    method: "get",
    params,
  });
}

//test
export function testApi() {
  const formatData = {};
  let data = [
    {
      source: "Node 1",
      target: "Node 2",
      // symbolSize: [5, 20],
      // label: {
      //   show: true
      // },
    },
    {
      source: "Node 2",
      target: "Node 1",
    },
    {
      source: "Node 1",
      target: "Node 3",
    },
    {
      source: "Node 2",
      target: "Node 3",
    },
    {
      source: "Node 2",
      target: "Node 4",
    },
    {
      source: "Node 1",
      target: "Node 4",
    },
  ];
  return formatData;
  // return data;
}
