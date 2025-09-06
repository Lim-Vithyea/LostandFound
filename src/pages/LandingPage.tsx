import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import background from '../assets/background.jpg';
import pic from '../assets/Vithyea.jpg'
import { useNavigate,useLocation } from 'react-router-dom';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  avatar: string;
  rating: number;
  comment: string;
}

interface Step {
  title: string;
  description: string;
}


import {
  Layout,
  Button,
  Typography,
  Row,
  Col,
  Card,
  Space,
  Avatar,
  Rate,
  Steps
} from 'antd';
import {
  SearchOutlined,
  SafetyOutlined,
  TeamOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;


const LandingPage: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: true
    });
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const features: Feature[] = [
    {
      icon: <SearchOutlined style={{ fontSize: '2rem', color: '#3b82f6' }} />,
      title: 'Campus-Wide Search',
      description: 'Search across all campus locations including dorms, libraries, cafeterias, and academic buildings.'
    },
    {
      icon: <SafetyOutlined style={{ fontSize: '2rem', color: '#3b82f6' }} />,
      title: 'Student Verified',
      description: 'Secure platform integrated with university systems for verified student interactions.'
    },
    {
      icon: <TeamOutlined style={{ fontSize: '2rem', color: '#3b82f6' }} />,
      title: 'Campus Community',
      description: 'Connect with fellow students, staff, and faculty who want to help reunite you with your items.'
    },
    {
      icon: <ClockCircleOutlined style={{ fontSize: '2rem', color: '#3b82f6' }} />,
      title: 'Always Active',
      description: 'Report and search for items 24/7 during the academic year. Perfect for busy student schedules.'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: 'Vithyea',
      avatar: pic,
      rating: 5,
      comment: 'Lost my student ID in the library and found it within hours! Fellow students are so helpful.'
    },
    {
      name: 'Dara',
      avatar: pic,
      rating: 5,
      comment: 'Left my laptop charger in the computer lab. Someone posted it here and I got it back the same day!'
    },
    {
      name: 'Kim',
      avatar: pic,
      rating: 5,
      comment: 'Perfect for campus life! Found my textbook that I dropped somewhere between classes.'
    }
  ];

  const steps: Step[] = [
    {
      title: 'Report',
      description: 'Describe your lost item with details and location'
    },
    {
      title: 'Search',
      description: 'Browse found items or let others find yours'
    },
    {
      title: 'Connect',
      description: 'Get in touch with finders securely'
    },
    {
      title: 'Reunite',
      description: 'Get your belongings back safely'
    }
  ];

  const getStarted = (e:any) => {
    e.preventDefault()
    console.log("Get Started Clicked")
    const to = location.state?.from?.pathname || "/login"
    navigate(to,{replace:true})
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        background: 'white', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: '0 50px'
      }}>
        <Row justify="space-between" align="middle" style={{ height: '100%' }}>
          <Col>
            <Title level={3} style={{ margin: 0, color: '#3b82f6' }}>
               Lost & Found 
            </Title>
          </Col>
          <Col>
            <Space size="large">
              <Button type="text">How it Works</Button>
            </Space>
          </Col>
        </Row>
      </Header>

      <Content>
        <div 
        className="relative bg-cover bg-center pt-[250px] pb-[250px]"
        style={{ 
        backgroundImage: `url(${background})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',  }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/100 to-transparent"></div>
        <div className="relative z-10 text-center text-white">
          <Row justify="center">
            <Col xs={24} md={16} lg={12}>
              <div data-aos="fade-up" data-aos-delay="200">
                <Title level={1}>
                  <div className='text-center'>
                      <span className='text-white font-bold text-5xl'>Find Your Lost Items</span>
                      <br/>
                      <Text><span className='text-blue-500 font-bold text-2xl'>Around Campus</span></Text>
                  </div>
                </Title>
              </div>
              <div data-aos="fade-up" data-aos-delay="400">
                <Paragraph style={{color: 'white'}}>
                  Connect with your campus community to recover lost items. From textbooks to laptops, 
                  student IDs to headphones - we help you get your belongings back with AI smart scan search
                </Paragraph>
              </div>
              <div data-aos="fade-up" data-aos-delay="600">
                <Space size="large" style={{display: 'flex', justifyContent: 'center',paddingTop: '2rem'  }}>
                  <Button type="primary" size="large" icon={<SearchOutlined />} onClick={getStarted}>
                    Get started
                  </Button>
                 
                </Space>
              </div>
            </Col>
          </Row>
          </div>
        </div>

        {/* How It Works Section */}
        <div style={{ padding: '80px 50px'}}>
          <Row justify="center">
            <Col xs={24} md={20} lg={16}>
              <div data-aos="fade-up">
                <Title level={2} style={{ textAlign: 'center', marginBottom: '3rem' }}>
                  How It Works
                </Title>
              </div>
              <div data-aos="fade-up" data-aos-delay="200">
                <Steps current={-1} style={{ marginBottom: '3rem' }}>
                  {steps.map((step, index) => (
                    <Step key={index} title={step.title} description={step.description} />
                  ))}
                </Steps>
              </div>
            </Col>
          </Row>
        </div>

        {/* Features Section */}
        <div style={{ padding: '80px 50px', background: 'white' }}>
          <div data-aos="fade-up">
            <Title level={2} style={{ textAlign: 'center', marginBottom: '3rem' }}>
              Why Use Campus Lost & Found?
            </Title>
          </div>
          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} md={12} lg={6} key={index}>
                <div data-aos="fade-up" data-aos-delay={index * 100}>
                  <Card 
                    hoverable
                    style={{ height: '100%', textAlign: 'center' }}
                    bodyStyle={{ padding: '2rem' }}
                  >
                    <div style={{ marginBottom: '1rem' }}>
                      {feature.icon}
                    </div>
                    <Title level={4}>{feature.title}</Title>
                    <Paragraph style={{ color: '#6b7280' }}>
                      {feature.description}
                    </Paragraph>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Testimonials Section */}
        <div style={{ padding: '80px 50px'}}>
          <div data-aos="fade-up">
            <Title level={2} style={{ textAlign: 'center', marginBottom: '3rem' }}>
              What People Say
            </Title>
          </div>
          <Row gutter={[32, 32]}>
            {testimonials.map((testimonial, index) => (
              <Col xs={24} md={8} key={index}>
                <div data-aos="fade-up" data-aos-delay={index * 150}>
                  <Card style={{ height: '100%' }}>
                    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                      <Avatar size={64} src={testimonial.avatar} />
                      <Title level={5} style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
                        {testimonial.name}
                      </Title>
                      <Rate disabled defaultValue={testimonial.rating} />
                    </div>
                    <Paragraph style={{ fontStyle: 'italic', textAlign: 'center' }}>
                      "{testimonial.comment}"
                    </Paragraph>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* CTA Section */}
        {/* <div style={{ 
          padding: '80px 50px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          color: 'white',
          textAlign: 'center'
        }}>
          <Row justify="center">
            <Col xs={24} md={16} lg={12}>
              <div data-aos="fade-up">
                <Title level={2} style={{ color: 'white', marginBottom: '1rem' }}>
                  Ready to Get Your Items Back?
                </Title>
              </div>
              <div data-aos="fade-up" data-aos-delay="200">
                <Paragraph style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'rgba(255,255,255,0.9)' }}>
                  try it now
                </Paragraph>
              </div>
              <div data-aos="fade-up" data-aos-delay="400">
                <Space size="large">
                  <Button type="default" size="large">
                    Get Started Now
                  </Button>
                  <Button type="link" size="large" style={{ color: 'white' }}>
                    Learn More →
                  </Button>
                </Space>
              </div>
            </Col>
          </Row>
        </div>*/}
      </Content> 
      

      {/* Footer */}
      <Footer style={{ background: '#ffffff', padding: '40px 50px' }}>
        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          © 2025 Campus Lost & Found. All rights reserved.
        </div>
      </Footer>
    </Layout>
  );
};

export default LandingPage;