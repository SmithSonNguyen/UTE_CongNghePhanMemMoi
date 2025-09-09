import { Card, Avatar, Typography, Tag, Space } from 'antd';
import { UserOutlined, MailOutlined, CalendarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const UserCard = ({ user, index, isVisible }) => {
    const getRoleColor = (role) => {
        switch (role?.toLowerCase()) {
            case 'admin':
                return 'red';
            case 'user':
                return 'blue';
            case 'moderator':
                return 'green';
            default:
                return 'default';
        }
    };

    return (
        <Card
            hoverable
            style={{
                marginBottom: 16,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-in-out',
                transitionDelay: `${index * 0.1}s`,
            }}
            bodyStyle={{ padding: '16px' }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Avatar
                    size={64}
                    icon={<UserOutlined />}
                    style={{
                        backgroundColor: '#1890ff',
                        fontSize: '24px',
                    }}
                >
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </Avatar>

                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <Title level={4} style={{ margin: 0 }}>
                            {user.name || 'Unknown User'}
                        </Title>
                        <Tag color={getRoleColor(user.role)}>
                            {user.role || 'User'}
                        </Tag>
                    </div>

                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <MailOutlined style={{ color: '#666' }} />
                            <Text copyable style={{ color: '#666' }}>
                                {user.email || 'No email'}
                            </Text>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CalendarOutlined style={{ color: '#666' }} />
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                Created: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                            </Text>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                ID: {user._id?.substring(0, 8)}...
                            </Text>
                        </div>
                    </Space>
                </div>
            </div>
        </Card>
    );
};

export default UserCard;
