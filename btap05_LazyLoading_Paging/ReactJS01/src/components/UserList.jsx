import { useState, useEffect, useRef } from 'react';
import { Spin, Button, Space, Typography, notification } from 'antd';
import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import UserCard from './UserCard';
import { getUserApi } from '../util/api';

const { Title, Text } = Typography;

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [visibleUsers, setVisibleUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const pageSize = 5; // Load 5 users at a time for demo
    const observerRef = useRef(null);
    const containerRef = useRef(null);

    // Fetch users from API
    const fetchUsers = async (page = 1, append = false) => {
        if (append) {
            setLoadingMore(true);
        } else {
            setLoading(true);
        }

        try {
            const res = await getUserApi(page, pageSize);

            if (res?.EC === 0) {
                // New API format with pagination
                if (append) {
                    setUsers(prev => [...prev, ...res.DT.users]);
                } else {
                    setUsers(res.DT.users);
                }
                setPagination(res.DT.pagination);
                setCurrentPage(page);
            } else if (res?.message) {
                // Fallback for old API format
                if (append) {
                    setUsers(prev => [...prev, ...res]);
                } else {
                    setUsers(res);
                }
                setPagination({
                    currentPage: 1,
                    totalPages: 1,
                    totalUsers: res.length,
                    limit: res.length,
                    hasNextPage: false,
                    hasPrevPage: false
                });
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: res?.EM || 'Không thể tải danh sách users',
                });
            }
        } catch (error) {
            notification.error({
                message: 'Lỗi',
                description: 'Có lỗi xảy ra khi tải dữ liệu',
            });
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    // Load more users
    const loadMoreUsers = () => {
        if (pagination.hasNextPage && !loadingMore) {
            fetchUsers(pagination.nextPage, true);
        }
    };

    // Refresh users
    const refreshUsers = () => {
        setUsers([]);
        setVisibleUsers([]);
        setCurrentPage(1);
        setIsInitialLoad(true);
        fetchUsers(1, false);
    };

    // Initial load
    useEffect(() => {
        fetchUsers(1, false);
    }, []);

    // Lazy loading effect - show users one by one
    useEffect(() => {
        if (users.length > 0 && isInitialLoad) {
            setIsInitialLoad(false);

            // Show users one by one with delay
            users.forEach((user, index) => {
                setTimeout(() => {
                    setVisibleUsers(prev => {
                        if (!prev.find(u => u._id === user._id)) {
                            return [...prev, { ...user, isVisible: true }];
                        }
                        return prev;
                    });
                }, index * 200); // 200ms delay between each user
            });
        }
    }, [users, isInitialLoad]);

    // Add new users to visible list when loading more
    useEffect(() => {
        if (users.length > visibleUsers.length && !isInitialLoad) {
            const newUsers = users.slice(visibleUsers.length);
            newUsers.forEach((user, index) => {
                setTimeout(() => {
                    setVisibleUsers(prev => {
                        if (!prev.find(u => u._id === user._id)) {
                            return [...prev, { ...user, isVisible: true }];
                        }
                        return prev;
                    });
                }, index * 200);
            });
        }
    }, [users, visibleUsers.length, isInitialLoad]);

    return (
        <div ref={containerRef} style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
            }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>
                        Danh sách Users
                    </Title>
                    <Text type="secondary">
                        {pagination.totalUsers ?
                            `Hiển thị ${visibleUsers.length} / ${pagination.totalUsers} users` :
                            `Đang tải...`
                        }
                    </Text>
                </div>

                <Space>
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={refreshUsers}
                        loading={loading}
                    >
                        Refresh
                    </Button>
                </Space>
            </div>

            {/* Loading indicator for initial load */}
            {loading && users.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <Spin size="large" />
                    <div style={{ marginTop: '16px' }}>
                        <Text>Đang tải danh sách users...</Text>
                    </div>
                </div>
            )}

            {/* Users List */}
            <div style={{ marginBottom: '24px' }}>
                {visibleUsers.map((user, index) => (
                    <UserCard
                        key={user._id}
                        user={user}
                        index={index}
                        isVisible={user.isVisible}
                    />
                ))}
            </div>

            {/* Load More Section */}
            {pagination.hasNextPage && (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <Button
                        type="primary"
                        size="large"
                        icon={<PlusOutlined />}
                        onClick={loadMoreUsers}
                        loading={loadingMore}
                        style={{ minWidth: '200px' }}
                    >
                        {loadingMore ? 'Đang tải thêm...' : 'Tải thêm users'}
                    </Button>
                </div>
            )}

            {/* End of list indicator */}
            {!pagination.hasNextPage && users.length > 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    color: '#999',
                    borderTop: '1px solid #f0f0f0',
                    marginTop: '20px'
                }}>
                    <Text type="secondary">
                        🎉 Đã tải hết tất cả users!
                    </Text>
                </div>
            )}

            {/* Empty state */}
            {!loading && users.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    color: '#999'
                }}>
                    <Title level={4} type="secondary">
                        Không có users nào
                    </Title>
                    <Text type="secondary">
                        Hãy thử refresh hoặc kiểm tra kết nối mạng
                    </Text>
                </div>
            )}
        </div>
    );
};

export default UserList;
