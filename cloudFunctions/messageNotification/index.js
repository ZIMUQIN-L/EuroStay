const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境
const db = cloud.database();

exports.main = async (event, context) => {
  const result = await cloud.openapi.subscribeMessage.send({
    touser: event.userid,
    page: 'pages/user-profile/index',
    data: {
      thing2: {
        value: event.content,
      },
      thing4: {
        value: 'test',
      },
      thing17: {
        value: 'test',
      },
    },
    templateId: 'I5kMb7W6-QbKBqcXLlzqZzK9N97JPkrFWdMHBI7hyA4',
  });
  return event;
};
