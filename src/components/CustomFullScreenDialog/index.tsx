import { View, Text } from '@tarojs/components';

const CustomFullScreenDialog = ({ title, children }) => {
  return (
    <View
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: 'white',
          width: '90%',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ marginTop: '24px' }}>{title}</Text>
        {children}
        <View
          style={{
            width: '50%',
            height: '30px',
            borderRadius: '30px',
            backgroundColor: '#FFD111',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            marginTop: '32px',
            marginBottom: '32px',
          }}
        >
          <Text style={{ color: 'white' }}>保存</Text>
        </View>
      </View>
    </View>
  );
};
export default CustomFullScreenDialog;
