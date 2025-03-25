import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import './index.scss';

// 定义内容类型
type ContentType = 'privacy' | 'service' | 'about' | 'contact' | 'vip';

// 定义内容结构类型
interface ContentSection {
  title: string;
  content?: string;
  sections?: {
    subtitle: string;
    content: string;
    list?: string[];
  }[];
  list?: string[];
}

interface ContentItem {
  title: string;
  content: ContentSection[];
}

// 内容映射
const contentMap: Record<ContentType, ContentItem> = {
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
        content: '如果您对本数据隐私协议有任何疑问或需要进一步的信息，请通过以下方式联系我们：EuroStay@163.com'
      }
    ]
  },
  service: {
    title: '服务协议',
    content: [
      {
        title: '一、借换宿行为的定义',
        content: '借换宿指平台用户以非商业性质的方式，通过协商互相提供或借用短期住宅的行为。本行为旨在促进用户间的互助交流，并非以盈利为目的的商业行为。',
        sections: [
          {
            subtitle: '1.1 定义说明',
            content: '借换宿指平台用户以非商业性质的方式，通过协商互相提供或借用短期住宅的行为。本行为旨在促进用户间的互助交流，并非以盈利为目的的商业行为。'
          }
        ]
      },
      {
        title: '二、非短租、转租行为声明',
        content: '借换宿不同于短租或转租行为，借换宿中的任何交易行为均不构成商业性质的合同关系。',
        sections: [
          {
            subtitle: '2.1 性质说明',
            content: '本平台的借换宿行为与商业性质的短租、转租有本质区别，不以营利为目的。'
          },
          {
            subtitle: '2.2 费用说明',
            content: '双方之间的费用支付仅为成本分摊性费用，以用于覆盖住宅期间可能产生的基本成本（如水电费、清洁费等）。'
          }
        ]
      },
      {
        title: '三、对房源发布的约束',
        sections: [
          {
            subtitle: '3.1 费用限制',
            content: 'Host 在平台上发布的房源价格必须基于实际成本，而非以盈利为目的。任何以商业为目的的价格设置均违反平台规则，Host 将自行承担由此产生的后果，包括但不限于账号限制或房源下架。EuroStay 平台保留对房源价格进行审查和调整的权利，以确保价格合理，符合平台的非商业化原则。'
          },
          {
            subtitle: '3.2 房源合法性',
            content: 'Host 必须对所发布的房源拥有合法的使用权。若房源涉及租赁、共有等特殊情况，Host 需确保其行为符合相关法律法规。若 Host 发布的房源不合法或存在纠纷，Host 将自行承担由此导致的所有法律责任和损失。'
          },
          {
            subtitle: '3.3 房源信息真实性',
            content: 'Host 承诺所发布的房源信息真实、出于自愿，包括但不限于房屋位置、设施状况、图片等。任何虚假信息都可能导致房源下架或账号限制。'
          }
        ]
      },
      {
        title: '四、借换宿用户须知',
        sections: [
          {
            subtitle: '4.1 参与资格',
            content: '用户必须年满 18 周岁，具备完全民事行为能力。用户需提供真实、有效的身份信息进行注册，并确保信息的真实性。'
          },
          {
            subtitle: '4.2 借换宿行为规范',
            content: '用户需尊重房源提供者的规定，合理使用房屋设施。借换宿过程中，用户需保持房屋整洁，并在结束后归还至原始状态。若因用户个人原因造成房屋损坏，用户需承担相应赔偿责任。'
          },
          {
            subtitle: '4.3 费用及支付',
            content: '借换宿仅涉及合理的成本分摊费用，不得以盈利为目的。用户需按约定支付相关费用，并确保支付信息的安全性。'
          }
        ]
      },
      {
        title: '五、责任说明',
        sections: [
          {
            subtitle: '5.1 平台免责声明',
            content: 'EuroStay 平台不对任何房源的财产安全和人身安全承担责任。Host 需自行确保房屋的安全性，并建议用户自行购买相关保险，以降低可能的风险。'
          },
          {
            subtitle: '5.2 争议处理',
            content: '若借换宿过程中发生纠纷，建议双方协商解决。若协商未果，可通过 EuroStay 平台申诉，平台将根据实际情况进行调解，但不对最终结果负责。'
          }
        ]
      },
      {
        title: '六、其他说明',
        content: '本协议最终解释权归 EuroStay 平台所有，用户在使用平台服务前应充分理解并接受上述条款。'
      },
      {
        title: '七、联系我们',
        content: '如果您对本数据隐私协议有任何疑问或需要进一步的信息，请通过以下方式联系我们：EuroStay@163.com'
      }
    ]
  },
  about: {
    title: '关于我们',
    content: [
      {
        title: '关于我们',
        content: '关于我们的内容...'
      }
    ]
  },
  contact: {
    title: '联系我们',
    content: [
      {
        title: '联系我们',
        content: '联系方式...'
      }
    ]
  },
  vip: {
    title: 'EuroStay 会员协议',
    content: [
        {
        title: '一、会员权益',
        content: '成为 EuroStay 会员，您将享有以下权益：',
        sections: [
        {
        subtitle: '1.1 联系 Host',
        content: '会员可优先获取房源信息，并可直接与 Host 交流，促成借换宿。'
        },
        {
        subtitle: '1.2 平台通知',
        content: '会员可及时获取最新房源推荐、社区活动、政策更新等重要信息。'
        },
        {
        subtitle: '1.3 社区互动',
        content: '会员可参与平台组织的线上线下交流活动，与其他旅行者和 Host 建立联系。'
        },
        {
        subtitle: '1.4 专属服务',
        content: '会员可享受平台提供的个性化推荐及优先客服支持。'
        }
        ]
        },
        {
        title: '二、会员义务',
        sections: [
        {
        subtitle: '2.1 真实信息',
        content: '会员应确保其提供的个人资料真实、有效，任何虚假信息可能导致账户限制。'
        },
        {
        subtitle: '2.2 遵守规则',
        content: '会员应遵守 EuroStay 的使用规则，不得进行任何商业性质的活动，如倒卖房源信息等。'
        },
        {
        subtitle: '2.3 文明交流',
        content: '在与 Host 和其他会员交流时，保持尊重、礼貌，不得发布骚扰或不当言论。'
        }
        ]
        },
        {
        title: '三、会员资格与有效期',
        sections: [
        {
        subtitle: '3.1 付费与有效期',
        content: '会员资格按月度或年度订阅模式收费，具体费用及支付方式以平台公告为准。会员资格将在当前订阅周期结束前自动续费，除非会员在续费前手动取消订阅。'
        },
        {
        subtitle: '3.2 取消与退款',
        content: '会员资格在订阅周期内不可提前终止或退款，会员在支付后可持续享受服务至订阅周期结束。若因违反平台规则导致账户被暂停或取消，已支付费用不予退还。'
        }
        ]
        },
        {
        title: '四、责任说明',
        sections: [
        {
        subtitle: '4.1 平台免责声明',
        content: 'EuroStay 平台仅提供信息对接服务，不对会员与 Host 之间的具体交易行为负责。'
        },
        {
        subtitle: '4.2 争议处理',
        content: '若会员权益受到侵害，可通过 EuroStay 平台申诉，平台将根据实际情况进行调解，但不对最终结果负责。'
        }
        ]
        },
        {
        title: '五、其他说明',
        content: '本协议最终解释权归 EuroStay 平台所有，用户在使用平台服务前应充分理解并接受上述条款。'
        },
        {
        title: '六、联系我们',
        content: '如果您对本会员协议有任何疑问或需要进一步的信息，请通过以下方式联系我们：EuroStay@163.com'
        }
    ]
  }
};

const CommonSetting = () => {
  const [type, setType] = useState<ContentType>('about');
  const [content, setContent] = useState(contentMap.about);

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

  const renderContent = (content) => {
    if (Array.isArray(content)) {
      return content.map((section, index) => (
        <View key={index} className='content-section'>
          {section.title && (
            <Text className='content-title'>{section.title}</Text>
          )}
          {section.content && (
            <Text className='content-text'>{section.content}</Text>
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