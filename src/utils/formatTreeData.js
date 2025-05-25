//重组树形数据结构
export function formatTreeNode(node, level) {
  const treeData = { data: {}, children: [] };
  level = level || 1;
  if (node) {
    treeData.data = {
      text: node.name,
      code: node.code,
      uid: node.code,
      level: level,
    };
    if (node.children?.length) {
      node.children.forEach((item) => {
        treeData.children.push(formatTreeNode(item, level + 1));
      });
    }
    return treeData;
  } else {
    return;
  }
}

// export function test() {
// const treeData = {
//   code: "101",
//   name: "商务服务",
//   num: 581983,
//   concept: false,
//   stream: null,
//   children: [
//     {
//       code: "10101",
//       name: "组织管理服务",
//       num: 10520,
//       concept: false,
//       stream: null,
//       children: [
//         {
//           code: "1010101",
//           name: "企业总部管理",
//           num: 5642,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010102",
//           name: "投资与国有资产管理",
//           num: 218,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010103",
//           name: "资源与产权交易服务",
//           num: 343,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010104",
//           name: "组织后勤管理服务",
//           num: 3018,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010105",
//           name: "农村集体经济组织管理",
//           num: 845,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010106",
//           name: "其他组织管理服务",
//           num: 139,
//           concept: false,
//           stream: null,
//         },
//       ],
//     },
//     {
//       code: "10102",
//       name: "综合管理服务",
//       num: 54801,
//       concept: false,
//       stream: null,
//       children: [
//         {
//           code: "1010201",
//           name: "园区管理服务",
//           num: 3609,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010202",
//           name: "商业综合体管理服务",
//           num: 7317,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010203",
//           name: "市场管理服务",
//           num: 2852,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010204",
//           name: "供应链管理服务",
//           num: 37858,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010205",
//           name: "其他综合管理服务",
//           num: 1184,
//           concept: false,
//           stream: null,
//         },
//       ],
//     },
//     {
//       code: "10103",
//       name: "法律服务",
//       num: 10924,
//       concept: false,
//       stream: null,
//       children: [
//         {
//           code: "1010301",
//           name: "律师及相关法律服务",
//           num: 9574,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010302",
//           name: "公证服务",
//           num: 73,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010303",
//           name: "其他法律服务",
//           num: 780,
//           concept: false,
//           stream: null,
//         },
//       ],
//     },
//     {
//       code: "10104",
//       name: "咨询与调查",
//       num: 177998,
//       concept: false,
//       stream: null,
//       children: [
//         {
//           code: "1010401",
//           name: "会计、审计及税务服务",
//           num: 15562,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010402",
//           name: "市场调查",
//           num: 2719,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010403",
//           name: "社会经济咨询",
//           num: 146715,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010404",
//           name: "健康咨询",
//           num: 12656,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010405",
//           name: "环保咨询",
//           num: 3294,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010406",
//           name: "体育咨询",
//           num: 1539,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010407",
//           name: "其他咨询与调查",
//           num: 3362,
//           concept: false,
//           stream: null,
//         },
//       ],
//     },
//     {
//       code: "10105",
//       name: "广告服务业",
//       num: 146268,
//       concept: false,
//       stream: null,
//       children: [
//         {
//           code: "1010501",
//           name: "互联网广告服务",
//           num: 3386,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010502",
//           name: "其他广告服务",
//           num: 85282,
//           concept: false,
//           stream: null,
//         },
//       ],
//     },
//     {
//       code: "10106",
//       name: "人才服务",
//       num: 30101,
//       concept: false,
//       stream: null,
//       children: [
//         {
//           code: "1010601",
//           name: "公共就业服务",
//           num: 389,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010602",
//           name: "职业中介服务",
//           num: 8265,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010603",
//           name: "劳务派遣服务",
//           num: 21563,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010604",
//           name: "创业指导服务",
//           num: 574,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010605",
//           name: "其他人才服务",
//           num: 1577,
//           concept: false,
//           stream: null,
//         },
//       ],
//     },
//     {
//       code: "10107",
//       name: "安全保护服务",
//       num: 6245,
//       concept: false,
//       stream: null,
//       children: [
//         {
//           code: "1010701",
//           name: "安全服务",
//           num: 1562,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010702",
//           name: "安全系统监控服务",
//           num: 3312,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010703",
//           name: "其他安全保护服务",
//           num: 854,
//           concept: false,
//           stream: null,
//         },
//       ],
//     },
//     {
//       code: "10108",
//       name: "会议、展览及相关服务",
//       num: 40544,
//       concept: false,
//       stream: null,
//       children: [
//         {
//           code: "1010801",
//           name: "科技会展服务",
//           num: 398,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010802",
//           name: "旅游会展服务",
//           num: 348,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010803",
//           name: "体育会展服务",
//           num: 114,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010804",
//           name: "文化会展服务",
//           num: 1890,
//           concept: false,
//           stream: null,
//         },
//       ],
//     },
//     {
//       code: "10109",
//       name: "其他专业商务服务",
//       num: 164644,
//       concept: false,
//       stream: null,
//       children: [
//         {
//           code: "1010901",
//           name: "旅行社及相关服务",
//           num: 32674,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010902",
//           name: "包装服务",
//           num: 13264,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010903",
//           name: "办公服务",
//           num: 6651,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010904",
//           name: "翻译服务",
//           num: 20129,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010905",
//           name: "信用服务",
//           num: 3185,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010906",
//           name: "非融资担保服务",
//           num: 1379,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010907",
//           name: "商务代理代办服务",
//           num: 37029,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010908",
//           name: "票务代理服务",
//           num: 12615,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010909",
//           name: "知识产权服务",
//           num: 16076,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010910",
//           name: "物流服务",
//           num: 11435,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010911",
//           name: "融资服务",
//           num: 18667,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010912",
//           name: "政策服务",
//           num: 127,
//           concept: false,
//           stream: null,
//         },
//         {
//           code: "1010913",
//           name: "培训服务",
//           num: 18091,
//           concept: false,
//           stream: null,
//         },
//       ],
//     },
//     {
//       code: "10110",
//       name: "其他商务服务",
//       num: 17795,
//       concept: false,
//       stream: null,
//     },
//   ],
// };
//   const res = formatTreeNode(treeData);
//   console.log(res);
// }
