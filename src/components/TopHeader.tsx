
import { Row, Col, Typography, Button, Dropdown, Menu } from 'antd';
import { ShoppingCartOutlined, UserOutlined, LogoutOutlined, HomeOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import { NavLink } from 'react-router-dom';

const {Title} = Typography;


const TopHeader : React.FC = () => {
    return (
        <Header style={{ 
            background: 'white', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            padding: '0 24px'
          }}>
            <Row justify="space-between" align="middle" style={{ height: '100%' }}>
              <Col>
                <Title level={3} style={{ margin: 0, color: '#3b82f6' }}>
                  Lost & Found 
                </Title>
              </Col>
              <Col>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item key="home" icon={<HomeOutlined/>}>
                      <NavLink to="/home">
                        Home
                      </NavLink>
                      </Menu.Item>
                      <Menu.Item key="profile" icon={<UserOutlined />}>
                      <NavLink to="/profile">
                        Profile
                      </NavLink>
                      </Menu.Item>
                      <Menu.Item key="settings" icon={<ShoppingCartOutlined />}>
                      <NavLink to="/foundorlost">
                        Found or Lost items
                      </NavLink>
                      </Menu.Item>
                      
                      <Menu.Divider/>
                      <Menu.Item 
                        key="logout" 
                        icon={<LogoutOutlined />}
                        danger
                      >
                        Logout
                      </Menu.Item>
                    </Menu>
                  }
                  trigger={['click']}
                  placement="bottomRight"
                  arrow
                >
                  <Button>
                    <UserOutlined />
                    <span>Lim Vithyea</span>
                  </Button>
                </Dropdown>
              </Col>
            </Row>
          </Header>
    );
};

export default TopHeader;