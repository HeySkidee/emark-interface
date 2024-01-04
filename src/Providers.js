import AppProvider from './contexts/AppProvider';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, theme } from "antd";
import WalletProvider from "./contexts/WalletProvider";

function Providers({children}) {
  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          algorithm: [theme.darkAlgorithm],
          token: {
            colorPrimary: '#ecbc55',
            colorBgContainer: '#111',
          },
          components: {
            Button: {
              primaryColor: '#000',
            },
            Segmented: {
              itemSelectedColor:'#ecbc55',
              itemHoverColor:'#ecbc55',
            }
          },
        }}
      >
        <WalletProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </WalletProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default Providers;