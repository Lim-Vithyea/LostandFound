import { useState } from 'react';
import { Card, Avatar, Tabs, Row, Col, Button, Statistic, List, Tag, Input } from 'antd';
import { UserOutlined, EditOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import TopHeader from "../components/TopHeader";
import profilepic from "../assets/Vithyea.jpg";

const { TabPane } = Tabs;

// Mock data
const userData = {
  name: 'Vithyea',
  email: 'vithyea@example.com',
  phone: '(+855) 925-894',
  location: 'Phnom Penh, Cambodia',
  joinDate: 'January 2023',
  avatar: profilepic,
  bio: 'Passionate about helping people find their lost items. Always keeping an eye out for misplaced belongings!',
  stats: {
    itemsReported: 24,
    itemsFound: 18,
    itemsReturned: 15,
    rating: 4.8
  },
  recentActivity: [
    { id: 1, type: 'found', title: 'Black Wallet', date: '2 hours ago', status: 'pending' },
    { id: 2, type: 'lost', title: 'iPhone 13 Pro', date: '1 day ago', status: 'resolved' },
    { id: 3, type: 'found', title: 'Laptop Bag', date: '3 days ago', status: 'returned' },
  ]
};

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('activity');

  const renderStatusTag = (status: string) => {
    switch(status) {
      case 'pending':
        return <Tag color="orange">Pending</Tag>;
      case 'resolved':
        return <Tag color="blue">Resolved</Tag>;
      case 'returned':
        return <Tag color="green">Returned</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TopHeader />
      <div className="container mx-auto px-2 py-2 max-w-8xl">
        {/* Profile Header */}
        <Card className="mb-6 shadow-sm">
          <Row gutter={[24, 16]} align="middle">
            <Col xs={24} md={6} style={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar 
                size={220} 
                icon={<UserOutlined />} 
                src={userData.avatar}
                className="border-2 border-blue-500"
              />
            </Col>
            <Col xs={24} md={12}>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold mb-1">{userData.name}</h1>
                  <p className="text-gray-600 mb-2">Member since {userData.joinDate}</p>
                  <div className="flex items-center mb-2">
                    <Tag color="blue" className="text-sm">
                      <CheckCircleOutlined className="mr-1" /> Verified User
                    </Tag>
                    <span className="ml-2 text-yellow-500">
                      ★ {userData.stats.rating} (24 reviews)
                    </span>
                  </div>
                </div>
                <Button type="primary" icon={<EditOutlined />}>Edit Profile</Button>
              </div>
              
              <p className="text-gray-700 mt-3">{userData.bio}</p>
              
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center text-gray-600">
                  <MailOutlined className="mr-2" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <PhoneOutlined className="mr-2" />
                  <span>{userData.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <EnvironmentOutlined className="mr-2" />
                  <span>{userData.location}</span>
                </div>
              </div>
            </Col>
            <Col xs={24} md={6}>
              <div className="grid grid-cols-2 gap-4">
                <Statistic title="Items Reported" value={userData.stats.itemsReported} />
                <Statistic title="Items Found" value={userData.stats.itemsFound} />
                <Statistic title="Items Returned" value={userData.stats.itemsReturned} />
                <Statistic title="Success Rate" value={`${Math.round((userData.stats.itemsReturned / userData.stats.itemsReported) * 100)}%`} />
              </div>
            </Col>
          </Row>
        </Card>

        {/* Tabs Section */}
        <Card className="shadow-sm">
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="Activity" key="activity">
              <List
                itemLayout="horizontal"
                dataSource={userData.recentActivity}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <span key="time" className="text-gray-400">
                        <ClockCircleOutlined className="mr-1" />
                        {item.date}
                      </span>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          item.type === 'found' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {item.type === 'found' ? 'F' : 'L'}
                        </div>
                      }
                      title={
                        <div className="flex items-center">
                          <span className="font-medium">{item.title}</span>
                          <span className="ml-2">{renderStatusTag(item.status)}</span>
                        </div>
                      }
                      description={`You ${item.type} this item`}
                    />
                  </List.Item>
                )}
              />
            </TabPane>
            <TabPane tab="Settings" key="settings">
              <div className="max-w-md">
                <h3 className="text-lg font-medium mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input 
                      value={userData.email} 
                      prefix={<MailOutlined className="text-gray-400" />} 
                      readOnly 
                      className="bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <Input 
                      value={userData.phone} 
                      prefix={<PhoneOutlined className="text-gray-400" />} 
                      readOnly 
                      className="bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <Input 
                      value={userData.location} 
                      prefix={<EnvironmentOutlined className="text-gray-400" />} 
                      readOnly 
                      className="bg-gray-100"
                    />
                  </div>
                  <Button type="primary" className="mt-2">Update Information</Button>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Profile;