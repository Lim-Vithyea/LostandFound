import React, { useEffect } from 'react';
import { Form, Input, Button, Card, Typography, message, Divider } from 'antd';
import { LockOutlined, UserOutlined, GoogleOutlined } from '@ant-design/icons';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import backgroundVideo from '../assets/vid.mp4';
const { Title, Paragraph, Text } = Typography;

const LoginPage: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = (values: { username: string; password: string }) => {
    message.success(`Logged in as ${values.username}`);
    const to = (location.state as any)?.from?.pathname || '/home';
    navigate(to, { replace: true });
  };

  const SignedIn = () => setIsSignedIn( true );
  const LoginState = () => setIsSignedIn( false );

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover top-0 left-0 z-0"
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-600 opacity-80 z-1" />

      {/* Centered Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div data-aos="fade-up" data-aos-delay="200" className="w-full max-w-md">
          {isSignedIn ? (
            <Card className="shadow-lg rounded-2xl">
              <Title
                level={2}
                style={{color:"#3b82f6",textAlign:"center",marginBottom:"1rem",marginTop:"1rem",fontWeight:"bold"}}
              >
                Sign Up
              </Title>
              <Form name="signup" layout="vertical" onFinish={onFinish}>
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input
                    placeholder="Username"
                    prefix={<UserOutlined />}
                    className="h-10"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password
                    placeholder="Password"
                    prefix={<LockOutlined />}
                    className="h-10"
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block className="h-10 mt-2">
                    Sign up
                  </Button>
                </Form.Item>
              </Form>

              <Divider>
                <Text className="text-gray-500 text-sm">or sign in with email</Text>
              </Divider>

              <Button
                size="large"
                block
                icon={<GoogleOutlined />}
                className="h-10 rounded-md border border-gray-300 font-medium mb-4"
              >
                Continue with Google
              </Button>

              <Text className="text-gray-600 text-sm block text-center">
                Already have an account?{' '}
                <Button type="text" onClick={LoginState}>
                  Login
                </Button>
              </Text>
              <NavLink to="/" className="block text-center mt-3">
                Go back
              </NavLink>
            </Card>
          ) : (
            <Card className="shadow-lg rounded-2xl">
              <Title
                level={2}
                style={{color:"#3b82f6",textAlign:"center",marginBottom:"1rem",marginTop:"1rem",fontWeight:"bold"}}
              >
                Login
              </Title>
              <Paragraph className="text-center mb-4">
                Welcome back! Please login to your account.
              </Paragraph>
              <Form name="login" layout="vertical" onFinish={onFinish}>
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input
                    placeholder="Username"
                    prefix={<UserOutlined />}
                    className="h-10"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password
                    placeholder="Password"
                    prefix={<LockOutlined />}
                    className="h-10"
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block className="h-10 mt-2">
                    Log in
                  </Button>
                </Form.Item>
              </Form>

              <Divider>
                <Text className="text-gray-500 text-sm">or sign in with email</Text>
              </Divider>

              <Button
                size="large"
                block
                icon={<GoogleOutlined />}
                className="h-10 rounded-md border border-gray-300 font-medium mb-4"
              >
                Continue with Google
              </Button>

              <Text className="text-gray-600 text-sm block text-center">
                Don’t have an account?{' '}
                <Button type="text" onClick={SignedIn}>
                  Sign up
                </Button>
              </Text>
              <NavLink to="/" className="block text-center mt-3">
                Go back
              </NavLink>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
