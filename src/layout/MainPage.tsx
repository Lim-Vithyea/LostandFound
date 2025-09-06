import React, { useEffect, useState, useMemo } from 'react';
import { Card, Row, Col, Typography, Button, Badge, Space, Statistic, Layout, Pagination, Input, Select, Spin } from 'antd';
import { ShoppingCartOutlined, EyeOutlined, HeartOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { sampleItems } from '../properties/properties';
import TopHeader from '../components/TopHeader';

const { Text } = Typography;
const { Meta } = Card;
const { Search } = Input;
const { Option } = Select;

const MainPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loading, setLoading] = useState(false);


  // Filter and search items
  const filteredItems = useMemo(() => {
    return sampleItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchTerm, statusFilter, categoryFilter]);

  // Paginate items
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredItems.slice(startIndex, endIndex);
  }, [filteredItems, currentPage, pageSize]);

  const totalItems = filteredItems.length;
  const lostItems = filteredItems.filter(item => item.status === 'Lost').length;
  const foundItems = filteredItems.filter(item => item.status === 'Found').length;

  // Get unique categories for filter
  const categories = useMemo(() => {
    return [...new Set(sampleItems.map(item => item.category))];
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 300,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
      offset: 100
    });
  }, []);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, categoryFilter]);

  const handleSearch = (value: string) => {
    setLoading(true);
    setSearchTerm(value);
    setTimeout(() => setLoading(false), 300);
  };

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size) setPageSize(size);
  };

  return (
    <Layout style={{ minHeight: '100vh', overflow: 'hidden' }}>
      <div className='fixed top-0 z-10 w-full'>
        <TopHeader/>
      </div>
      <div style={{ overflow: 'auto', minHeight: 'calc(100vh10 - 64px)', paddingTop: '65px' }}>
        <div style={{ backgroundColor: '#fff', padding: '10px', borderBottom: '1px solid #f0f0f0', position: 'sticky' }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Search
                placeholder="Search items, locations, descriptions..."
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={handleSearch}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Select
                placeholder="Status"
                size="large"
                style={{ width: '100%' }}
                value={statusFilter}
                onChange={setStatusFilter}
                suffixIcon={<FilterOutlined />}
              >
                <Option value="all">All Status</Option>
                <Option value="Lost">Lost</Option>
                <Option value="Found">Found</Option>
              </Select>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Select
                placeholder="Category"
                size="large"
                style={{ width: '100%' }}
                value={categoryFilter}
                onChange={setCategoryFilter}
                suffixIcon={<FilterOutlined />}
              >
                <Option value="all">All Categories</Option>
                {categories.map(category => (
                  <Option key={category} value={category}>{category}</Option>
                ))}
              </Select>
            </Col>
          </Row>
        </div>

        {/* Statistics Cards */}
        <div data-aos="fade-up" style={{ backgroundColor: '#f5f5f5', padding: '24px' }}>
        <Row gutter={[16, 16]} style={{ marginBottom: '5px' }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Items"
              value={totalItems}
              valueStyle={{ color: '#1890ff' }}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Lost Items"
              value={lostItems}
              valueStyle={{ color: '#ff4d4f' }}
              prefix={<EyeOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Found Items"
              value={foundItems}
              valueStyle={{ color: '#52c41a' }}
              prefix={<HeartOutlined />}
            />
          </Card>
        </Col>
          </Row>
        </div>

        {/* Items Grid */}
        <div style={{ padding: '24px', backgroundColor: '#fff', minHeight: '400px' }}>
          <Spin spinning={loading}>
            <Row gutter={[16, 16]}>
              {paginatedItems.map((item, index) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={6} key={item.id}>
            <div data-aos="fade-up" data-aos-delay={index * 100}>
            <Card
              hoverable
              style={{ height: '100%' }}
              cover={
                <div style={{ position: 'relative' }}>
                  <img
                    alt={item.title}
                    src={item.image}
                    style={{ 
                      height: '200px', 
                      width: '100%', 
                      objectFit: 'cover' 
                    }}
                  />
                  <Badge
                    status={item.status === 'Lost' ? 'error' : 'success'}
                    text={item.status}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}
                  />
                </div>
              }
              actions={[
                <EyeOutlined key="view" />,
                <HeartOutlined key="favorite" />,
                <Button type="primary" size="small">
                  Contact
                </Button>
              ]}
            >
              <Meta
                title={
                  <div style={{ 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis' 
                  }}>
                    {item.title}
                  </div>
                }
                description={
                  <div>
                    <Text 
                      type="secondary" 
                      style={{ 
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontSize: '12px',
                        marginBottom: '8px'
                      }}
                    >
                      {item.description}
                    </Text>
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text strong style={{ fontSize: '12px', color: '#1890ff' }}>
                          {item.location}
                        </Text>
                        <Text type="secondary" style={{ fontSize: '11px' }}>
                          {item.date}
                        </Text>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Badge 
                          color={item.status === 'Lost' ? 'red' : 'green'} 
                          text={item.category}
                          style={{ fontSize: '11px' }}
                        />
                        <Text 
                          strong 
                          style={{ 
                            fontSize: '12px',
                            color: item.reward === 'No reward' ? '#999' : '#52c41a'
                          }}
                        >
                          {item.reward}
                        </Text>
                      </div>
                    </Space>
                  </div>
                }
              />
                </Card>
                </div>
              </Col>
              ))}
            </Row>
          </Spin>
          
          {/* Pagination */}
          <div style={{ textAlign: 'center', marginTop: '32px', paddingBottom: '24px' }}>
            <Pagination
              current={currentPage}
              total={totalItems}
              pageSize={pageSize}
              showSizeChanger
              showQuickJumper
              showTotal={(total, range) => 
                `${range[0]}-${range[1]} of ${total} items`
              }
              onChange={handlePageChange}
              pageSizeOptions={['12', '24', '48', '96']}
              size="default"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MainPage;