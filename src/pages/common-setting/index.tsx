import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import './index.scss';

// 定义内容类型
type ContentType = 'privacy' | 'service' | 'about' | 'contact';

// 定义内容结构的类型
type ListItem = {
  subtitle: string;
  content: string;
  list?: string[];
};

type Section = {
  title: string;
  sections?: ListItem[];
  content?: string;
};

type Content = {
  title: string;
  content: string | Section[];
};

// 内容映射
const contentMap: Record<ContentType, Content> = {
  privacy: {
    title: '隐私政策',
    content: [
      {
        title: '1. 收集的数据类型和方式',
        sections: [
          {
            subtitle: '1.1 收集的数据类型',
            content: '我们在您使用 EuroStay 平台时可能收集以下数据：',
            list: [
              '个人数据：包括姓名、联系方式、身份证明信息、个人个性化信息等',
              '房源数据：包括房源描述、地址、照片等',
              '聊天数据：您与其他用户之间的消息和交流记录',
              '交易数据：包括充值、消费、变现等财务记录'
            ]
          },
          {
            subtitle: '1.2 收集方式',
            content: '我们通过以下方式收集数据：',
            list: [
              '用户主动提供：您在注册账户、发布房源或进行交易时提交的数据',
              '自动收集：我们通过 Cookies、日志文件等技术自动收集您在使用平台时的行为数据',
              '第三方来源：在必要时，我们可能从第三方验证服务获取您的信息'
            ]
          }
        ]
      },
      {
        title: '2. 数据的使用',
        sections: [
          {
            subtitle: '2.1 使用的数据类型和目的',
            content: '我们将收集的数据用于以下目的：',
            list: [
              '个人数据：用于账户管理、身份验证和提供客服支持',
              '房源数据：用于展示房源信息，优化用户搜索体验',
              '聊天数据：用于促进用户间的沟通，确保社区的安全和活跃',
              '交易数据：用于处理财务操作、反欺诈和记录交易历史'
            ]
          },
          {
            subtitle: '2.2 使用限制',
            content: '您的数据仅限于上述目的使用，不会用于未授权的用途。我们不会将您的个人数据出售或用于广告目的。'
          }
        ]
      },
      {
        title: '3. 数据的共享',
        content: '目前，您的数据仅供 EuroStay 内部使用，不会与任何外部第三方共享。'
      },
      {
        title: '4. 数据的存储',
        sections: [
          {
            subtitle: '4.1 存储位置',
            content: '您的数据存储在腾讯云安全服务器上，位于欧洲法兰克福。'
          },
          {
            subtitle: '4.2 存储期限',
            content: '我们仅在必要期间内保留您的数据，以满足收集目的。超过此期限，数据将被安全删除或匿名化处理。具体期限如下：',
            list: [
              '个人数据：账户关闭后 6 个月内删除',
              '交易数据：按照法律要求保留 5 年'
            ]
          },
          {
            subtitle: '4.3 安全措施',
            content: '我们采取行业标准的安全措施，包括加密、访问控制和定期安全审计，保护您的数据免受未经授权的访问、披露或篡改。'
          }
        ]
      },
      {
        title: '5. 用户的权利',
        sections: [
          {
            subtitle: '5.1 访问和更正',
            content: '您有权访问我们持有的关于您的数据，并请求更正任何不准确的信息。'
          },
          {
            subtitle: '5.2 删除数据',
            content: '您可以随时请求删除您的个人数据，除非我们因法律原因需要保留这些数据。'
          },
          {
            subtitle: '5.3 数据迁移',
            content: '在适用情况下，您有权请求将您的数据迁移到其他服务提供商。'
          }
        ]
      },
      {
        title: '6. 法律合规',
        content: '我们致力于遵守《通用数据保护条例》（GDPR）以及其他相关的数据保护法规。我们将确保您的数据在所有处理过程中都符合适用的法律标准。'
      },
      {
        title: '7. 联系我们',
        content: '如果您对本数据隐私协议有任何疑问或需要进一步的信息，请通过以下方式联系我们：电子邮件：eurostay@gmail.com'
      }
    ]
  },
  service: {
    title: '服务协议',
    content: `服务协议内容...`
  },
  about: {
    title: '关于我们',
    content: `关于我们的内容...`
  },
  contact: {
    title: '联系我们',
    content: `联系方式...`
  }
};

const CommonSetting = () => {
  const [type, setType] = useState<ContentType>('about');
  const [content, setContent] = useState<Content>(contentMap.about);

  useEffect(() => {
    // 获取页面参数
    const params = Taro.getCurrentInstance().router?.params;
    const contentType = params?.type as ContentType;
    
    if (contentType && contentMap[contentType]) {
      setType(contentType);
      setContent(contentMap[contentType]);
    }
  }, []);

  const handleBack = () => {
    Taro.navigateBack();
  };

  const renderContent = (content: string | Section[]) => {
    if (Array.isArray(content)) {
      return content.map((section, index) => (
        <View key={index} className='content-section'>
          {section.title && (
            <Text className='content-title'>{section.title}</Text>
          )}
          {section.sections && section.sections.map((subsection, subIndex) => (
            <View key={subIndex} className='content-subsection'>
              {subsection.subtitle && (
                <Text className='content-subtitle'>{subsection.subtitle}</Text>
              )}
              {subsection.content && (
                <Text className='content-text'>{subsection.content}</Text>
              )}
              {subsection.list && (
                <View className='content-list'>
                  {subsection.list.map((item, itemIndex) => (
                    <Text key={itemIndex} className='list-item'>• {item}</Text>
                  ))}
                </View>
              )}
            </View>
          ))}
          {section.content && (
            <Text className='content-text'>{section.content}</Text>
          )}
        </View>
      ));
    }
    return <Text className='content-text'>{content}</Text>;
  };

  return (
    <View className='common-setting'>
      <View className='content'>
        <View className='section'>
          <View className='section-header'>
            <View className='label-bar' />
            <Text className='section-title'>{content.title}</Text>
          </View>
          <View className='section-content'>
            {renderContent(content.content)}
          </View>
        </View>
      </View>

      <View className='button-group'>
        <View className='back-button' onClick={handleBack}>
          返回
        </View>
      </View>
    </View>
  );
};

export default CommonSetting; 