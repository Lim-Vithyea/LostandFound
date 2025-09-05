import React from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import backgroundVideo from '../assets/vid.mp4';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import AOS from 'aos';
import { useEffect } from 'react';
import { Divider } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import Text from 'antd/es/typography/Text';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const { Title } = Typography;


const LoginPage: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false)
  const onFinish = (values: { username: string; password: string }) => {
    message.success(`Logged in as ${values.username}`);
    const to = location.state?.from?.pathname || "/home"
    navigate(to,{replace:true})
  };

  const navigate = useNavigate();
  const location = useLocation();

  const SignedIn = () => {
    setIsSignedIn(true)
  }
  const LoginState = () => {
    setIsSignedIn(false)
  }
  useEffect(() => {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true
      });
    }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Video Background */}
      <video autoPlay loop muted playsInline className='absolute w-full h-full object-cover top-0 left-0 z-0'>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='absolute inset-0 bg-gradient-to-b from-black to-gray-600 opacity-80 z-1'/>
      {/* Login Card */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div data-aos="fade-up" data-aos-delay="200">
          {isSignedIn ? 
          <Card style={{ width: 450, height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center'}} >
          <Title level={2} style={{ textAlign: 'center', marginBottom: 20, marginTop:10 ,color:"blue" ,fontWeight:"bold"}}>Sign Up</Title>
          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input placeholder="Username" prefix={<UserOutlined />} style={{height: '40px'}} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Password" prefix={<LockOutlined/>} style={{height: '40px'}}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block style={{ marginTop: 16,height: '40px', }}>
                Log in
              </Button>
            </Form.Item>
          </Form>
          <div className='text-center border-t'>
              <Divider style={{ color: '#999' }}>
              <Text style={{ color: '#999', fontSize: '14px' }}>or sign in with email</Text>
            </Divider>
            <div className='mb-5'>
              <Button
                size="large"
                block
                icon={<GoogleOutlined />}
                style={{
                  height: '40px',
                  borderRadius: '5px',
                  border: '1px solid #e0e0e0',
                  fontSize: '15px',
                  fontWeight: 500
                }}
              >
                Continue with Google
              </Button>
            </div>
            <Text style={{ color: '#666', fontSize: '14px' }}>
                Already have an account? <Button type="text" onClick={LoginState}>Login</Button>
              </Text>
              <NavLink to="/" style={{ display: 'block', textAlign: 'center', marginTop: 12}}>Go back</NavLink>
            </div>
        </Card>
        :<Card style={{ width: 450, height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center'}} >
        <Title level={2} style={{ textAlign: 'center', marginBottom: 20, marginTop:10 ,color:"blue",fontWeight:"bold" }}>Login</Title>
        <Typography.Paragraph style={{ textAlign: 'center', marginBottom: 15 }}>
          Welcome back! Please login to your account.
        </Typography.Paragraph>
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input placeholder="Username" prefix={<UserOutlined />} style={{height: '40px'}} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" prefix={<LockOutlined/>} style={{height: '40px'}}/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block style={{ marginTop: 16,height: '40px', }}>
              Log in
            </Button>
          </Form.Item>
        </Form>
        <div className='text-center border-t'>
            <Divider style={{ color: '#999' }}>
            <Text style={{ color: '#999', fontSize: '14px' }}>or sign in with email</Text>
          </Divider>
          <div className='mb-5'>
            <Button
              size="large"
              block
              icon={<GoogleOutlined />}
              style={{
                height: '40px',
                borderRadius: '5px',
                border: '1px solid #e0e0e0',
                fontSize: '15px',
                fontWeight: 500
              }}
            >
              Continue with Google
            </Button>
          </div>
          <Text style={{ color: '#666', fontSize: '14px' }}>
              Don't have an account?<Button type='text' style={{cursor: 'pointer'}} onClick={SignedIn}>Sign up</Button>
            </Text>
            <NavLink to="/" style={{ display: 'block', textAlign: 'center', marginTop: 12}}>Go back</NavLink>
          </div>
      </Card>
      }
        </div>
      </div>
    </div>
  );
};

export default LoginPage;