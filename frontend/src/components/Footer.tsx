import { Layout, Menu } from 'antd';
import {
  TwitterOutlined,
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined
} from '@ant-design/icons';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: 'center', background: '#FCEDEA' }}>
      <Menu mode="horizontal" style={{ marginBottom: '20px' }}>
        <Menu.Item key="1">
          <a href="/privacy-policy">Privacy Policy</a>
        </Menu.Item>
        <Menu.Item key="2">
          <a href="/terms-of-service">Terms of Service</a>
        </Menu.Item>
        <Menu.Item key="3">
          <a href="/contact-us">Contact Us</a>
        </Menu.Item>
      </Menu>
      <div>
        <p>Follow us:</p>
        <div style={{ fontSize: '24px', marginBottom: '10px' }}>
          <a href="https://twitter.com">
            <TwitterOutlined style={{ color: '#FFBE98', marginRight: '10px' }} />
          </a>
          <a href="https://facebook.com">
            <FacebookOutlined style={{ color: '#FFBE98', marginRight: '10px' }} />
          </a>
          <a href="https://instagram.com">
            <InstagramOutlined style={{ color: '#FFBE98', marginRight: '10px' }} />
          </a>
          <a href="https://linkedin.com">
            <LinkedinOutlined style={{ color: '#FFBE98' }} />
          </a>
        </div>
      </div>
      <p style={{ marginTop: '20px', color: '#8c8c8c' }}>©2024 TinyReservation. All rights reserved.</p>
    </Footer>
  );
};

export default AppFooter;