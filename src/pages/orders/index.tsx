import { View, Text, Image, Button } from '@tarojs/components';
import { observer } from 'mobx-react';
import Taro from '@tarojs/taro';
import { useState } from 'react';
import './index.scss';
import CustemCard from './custom-card/index';

const Index = () => {
  const [currentTab, setCurrentTab] = useState('all');

  const [activeRole, setActiveRole] = useState<'host' | 'guest'>('host')

  const handleRoleChange = (role: 'host' | 'guest') => {
    setActiveRole(role)
    tabTitle()
  }

  const renderContent = () => {
    if (activeRole === 'host') {
      return renderHostContent();
    } else {
      return renderGuestContent();
    }
  }

  const renderGuestContent = () => {
    switch (currentTab) {
      case 'all':
        return (
          <>
            <CustemCard
              imageUrl='https://st3.idealista.com/news/archivos/styles/fullwidth_xl/public/2023-04/media/image/ralph-ravi-kayden-mr1cidduglc-unsplash.jpg?VersionId=okTYWyWvS1CqBAI.l_syVfUcaBsYX07q&itok=L8hAOd9D'
              location='法国巴黎'
              buttonText='查看'
              houseDesc='白色恋人独栋别墅'
              duration='1晚'
              price='€80/晚'
              role={activeRole}
              status='ongoing'
            />
            <CustemCard
              imageUrl='https://www.arredaremoderno.com/blog/wp-content/uploads/2022/12/Arredare-una-cameretta-in-mansarda-in-stile-moderno-idee-e-foto-pexels-andrea-davis-.jpg'
              location='德国柏林'
              buttonText='去审核'
              houseDesc='柏林小木屋'
              duration='2晚'
              price='€30/晚'
              role={activeRole}
              status='awaiting'
            />
          </>
        );
      case 'awaiting':
        return (
          <>
            <CustemCard
              imageUrl='https://www.arredaremoderno.com/blog/wp-content/uploads/2022/12/Arredare-una-cameretta-in-mansarda-in-stile-moderno-idee-e-foto-pexels-andrea-davis-.jpg'
              location='德国柏林'
              buttonText='去审核'
              houseDesc='柏林小木屋'
              duration='2晚'
              price='€30/晚'
              role={activeRole}
              status='awaiting'
            />
          </>
        );
      case 'ongoing':
        return (
          <>
            <CustemCard
              imageUrl='https://st3.idealista.com/news/archivos/styles/fullwidth_xl/public/2023-04/media/image/ralph-ravi-kayden-mr1cidduglc-unsplash.jpg?VersionId=okTYWyWvS1CqBAI.l_syVfUcaBsYX07q&itok=L8hAOd9D'
              location='法国巴黎'
              buttonText='查看'
              houseDesc='白色恋人独栋别墅'
              duration='1晚'
              price='€80/晚'
              role={activeRole}
              status='ongoing'
            />
          </>
        );
      case 'review':
        return (
          <>
            <CustemCard
              imageUrl='https://st3.idealista.com/news/archivos/styles/fullwidth_xl/public/2023-04/media/image/ralph-ravi-kayden-mr1cidduglc-unsplash.jpg?VersionId=okTYWyWvS1CqBAI.l_syVfUcaBsYX07q&itok=L8hAOd9D'
              location='法国巴黎'
              buttonText='去评价'
              houseDesc='白色恋人独栋别墅'
              duration='1晚'
              price='€80/晚'
              role={activeRole}
              status='review'
            />
          </>
        );
      case 'expired':
        return (
          <>
            <CustemCard
              imageUrl='https://www.arredaremoderno.com/blog/wp-content/uploads/2022/12/Arredare-una-cameretta-in-mansarda-in-stile-moderno-idee-e-foto-pexels-andrea-davis-.jpg'
              location='德国柏林'
              buttonText='查看'
              houseDesc='柏林小木屋'
              duration='2晚'
              price='€30/晚'
              role={activeRole}
              status='expired'
            />
          </>
        );
      default:
      return (
        <>
          guest default
        </>
      );
    }
  }

  const renderHostContent = () => {
    switch (currentTab) {
      case 'all':
        return (
          <>
            <CustemCard
              imageUrl='https://www.arredaremoderno.com/blog/wp-content/uploads/2022/12/Arredare-una-cameretta-in-mansarda-in-stile-moderno-idee-e-foto-pexels-andrea-davis-.jpg'
              location='德国柏林'
              buttonText='去审核'
              houseDesc='柏林小木屋'
              duration='2晚'
              price='€30/晚'
              role={activeRole}
              status='awaiting'
            />
            <CustemCard
              imageUrl='https://st3.idealista.com/news/archivos/styles/fullwidth_xl/public/2023-04/media/image/ralph-ravi-kayden-mr1cidduglc-unsplash.jpg?VersionId=okTYWyWvS1CqBAI.l_syVfUcaBsYX07q&itok=L8hAOd9D'
              location='法国巴黎'
              buttonText='查看'
              houseDesc='白色恋人独栋别墅'
              duration='1晚'
              price='€80/晚'
              role={activeRole}
              status='ongoing'
            />
          </>
        );
      case 'awaiting':
        return (
          <>
            <CustemCard
              imageUrl='https://www.arredaremoderno.com/blog/wp-content/uploads/2022/12/Arredare-una-cameretta-in-mansarda-in-stile-moderno-idee-e-foto-pexels-andrea-davis-.jpg'
              location='德国柏林'
              buttonText='去审核'
              houseDesc='柏林小木屋'
              duration='2晚'
              price='€30/晚'
              role={activeRole}
              status='awaiting'
            />
          </>
        );
      case 'ongoing':
        return (
          <>
            <CustemCard
              imageUrl='https://st3.idealista.com/news/archivos/styles/fullwidth_xl/public/2023-04/media/image/ralph-ravi-kayden-mr1cidduglc-unsplash.jpg?VersionId=okTYWyWvS1CqBAI.l_syVfUcaBsYX07q&itok=L8hAOd9D'
              location='法国巴黎'
              buttonText='查看'
              houseDesc='白色恋人独栋别墅'
              duration='1晚'
              price='€80/晚'
              role={activeRole}
              status='ongoing'
            />
          </>
        );
      case 'review':
        return (
          <>
            <CustemCard
              imageUrl='https://www.arredaremoderno.com/blog/wp-content/uploads/2022/12/Arredare-una-cameretta-in-mansarda-in-stile-moderno-idee-e-foto-pexels-andrea-davis-.jpg'
              location='德国柏林'
              buttonText='去评价'
              houseDesc='柏林小木屋'
              duration='2晚'
              price='€30/晚'
              role={activeRole}
              status='review'
            />
          </>
        );
      case 'expired':
        return (
          <>
            <CustemCard
              imageUrl='https://st3.idealista.com/news/archivos/styles/fullwidth_xl/public/2023-04/media/image/ralph-ravi-kayden-mr1cidduglc-unsplash.jpg?VersionId=okTYWyWvS1CqBAI.l_syVfUcaBsYX07q&itok=L8hAOd9D'
              location='法国巴黎'
              buttonText='查看'
              houseDesc='白色恋人独栋别墅'
              duration='1晚'
              price='€80/晚'
              role={activeRole}
              status='expired'
            />
          </>
        );
      default:
      return (
        <>
          host default
        </>
      );
    }
  }

  const isActive = tabName => {
    return currentTab === tabName ? 'active' : '';
  };

  const tabTitle = () => {
    if (activeRole === 'host') {
      return ['全部订单', '待审核', '进行中', '待评价', '已失效'];
    } else {
      return ['全部订单', '待确认', '进行中', '待评价', '已失效'];
    }
  }

  return (
    <View>
      <View className='role-selection'>
        <View className='role-tabs'>
          <View 
            className={`role-tab ${activeRole === 'host' ? 'active' : ''}`}
            onClick={() => handleRoleChange('host')}
          >
            我是Host
          </View>
          <View 
            className={`role-tab ${activeRole === 'guest' ? 'active' : ''}`}
            onClick={() => handleRoleChange('guest')}
          >
            我是Guest
          </View>
        </View>
      </View>

      <View className='order-tabs'>
        <View 
          className={isActive('all')} 
          onClick={() => setCurrentTab('all')}
        >
          <View className={`order-tab ${isActive('all')}`}>
            全部订单
          </View>
        </View>

        <View 
          className={isActive('awaiting')} 
          onClick={() => setCurrentTab('awaiting')}
        >
          <View className={`order-tab ${isActive('awaiting')}`}>
            待审核
            <View className='order-badge'>
              1
            </View>
          </View>
        </View>

        <View 
          className={isActive('ongoing')} 
          onClick={() => setCurrentTab('ongoing')}>
          <View className={`order-tab ${isActive('ongoing')}`}>
            进行中
            <View className='order-badge'>
              3
            </View>
          </View>
        </View>

        <View 
          className={isActive('review')} 
          onClick={() => setCurrentTab('review')}
        >
          <View className={`order-tab ${isActive('review')}`}>
            待评价
          </View>
        </View>

        <View
          className={isActive('expired')}
          onClick={() => setCurrentTab('expired')}
        >
          <View className={`order-tab ${isActive('expired')}`}>
            已失效
          </View>
        </View>
      </View>
    
      <View className='order-list-scrollable'>{renderContent()}</View>
    </View>
  );
};

export default observer(Index);
