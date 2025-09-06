import { useState } from 'react';
import { Form, Input, Button, Select, DatePicker, message, Card, Row, Col, Typography, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import TopHeader from '../components/TopHeader';
import Bookimage from '../assets/vector.png';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const FoundorLostForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [itemType, setItemType] = useState<'lost' | 'found'>('lost');

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      console.log('Form values:', values);
      message.success('Item reported successfully!');
      form.resetFields();
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <TopHeader/>
      <div className="flex-grow flex items-center justify-center p-1">
        <div className="w-full max-w-7xl">
          <div data-aos="fade-up" data-aos-delay="200">
          <Card className="shadow-lg" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12} className="p-4">
              <Title level={4} className="text-center mb-4">
                {itemType === 'lost' ? 'Report Lost Item' : 'Report Found Item'}
              </Title>
              
              <Form form={form} layout="vertical" onFinish={onFinish} size="middle">
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="type"
                      label="Report Type"
                      rules={[{ required: true }]}
                      className="mb-2"
                    >
                      <Select 
                        placeholder="Select type"
                        onChange={(value) => setItemType(value as 'lost' | 'found')}
                      >
                        <Option value="lost">I Lost Something</Option>
                        <Option value="found">I Found Something</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="category"
                      label="Category"
                      rules={[{ required: true }]}
                      className="mb-2"
                    >
                      <Select placeholder="Select category">
                        <Option value="electronics">Electronics</Option>
                        <Option value="documents">Documents</Option>
                        <Option value="clothing">Clothing</Option>
                        <Option value="other">Other</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      name="date"
                      label={itemType === 'lost' ? 'Date Lost' : 'Date Found'}
                      rules={[{ required: true }]}
                      className="mb-2"
                    >
                      <DatePicker className="w-full" />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="title"
                      label="Item Title"
                      rules={[{ required: true, max: 50 }]}
                      className="mb-2"
                    >
                      <Input placeholder="e.g., Black Wallet, iPhone 13" />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="description"
                      label="Description"
                      rules={[{ required: true, min: 10, max: 300 }]}
                      className="mb-2"
                    >
                      <TextArea rows={3} placeholder="Provide details about the item..." />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      name="location"
                      label={itemType === 'lost' ? 'Last Seen Location' : 'Found Location'}
                      rules={[{ required: true }]}
                      className="mb-2"
                    >
                      <Input placeholder="e.g., Building A, Room 101" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      name="contact"
                      label="Contact Email"
                      rules={[{ required: true, type: 'email' }]}
                      className="mb-2"
                    >
                      <Input type="email" placeholder="your.email@example.com" />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="photos"
                      label="Upload Photos (Optional)"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      className="mb-4"
                    >
                      <Upload.Dragger 
                        multiple 
                        maxCount={3}
                        beforeUpload={() => false}
                        listType="picture"
                        className="text-sm"
                      >
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined className="text-blue-400" />
                        </p>
                        <p className="ant-upload-text">Click or drag files here</p>
                        <p className="ant-upload-hint text-xs">Max 3 photos, 5MB each</p>
                      </Upload.Dragger>
                    </Form.Item>
                  </Col>

                  <Col span={24} className="text-center">
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      loading={loading}
                      className="w-full"
                    >
                      {loading ? 'Submitting...' : 'Submit Report'}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>

            <Col xs={24} md={12} className="hidden md:flex flex-col items-center justify-center p-4 bg-blue-50 rounded-r-lg">
              <div className="text-center">
                <Title level={4} className="text-gray-700 mb-3">
                  {itemType === 'lost' ? 'Lost Something?' : 'Found Something?'}
                </Title>
                <Text type="secondary" className="block mb-4 text-sm">
                  {itemType === 'lost' 
                    ? 'Fill out this form to report your lost item. We\'ll help you find it!' 
                    : 'Help us return this item to its owner by providing as much detail as possible.'}
                </Text>
                <img 
                  src={Bookimage} 
                  alt="Lost and Found" 
                  className="w-4/5 mx-auto mt-4"
                />
              </div>
            </Col>
          </Row>
          </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundorLostForm;