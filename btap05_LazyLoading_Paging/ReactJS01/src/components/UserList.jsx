import { useState, useEffect, useRef } from "react";
import { Spin, Button, Space, Typography, notification } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import UserCard from "./UserCard";
import { getUserApi } from "../util/api";

const { Title, Text } = Typography;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pagination, setPagination] = useState({});
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const pageSize = 5; // Load 5 users/lần
  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  // Fetch users từ API
  const fetchUsers = async (page = 1, append = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const res = await getUserApi(page, pageSize);

      if (res?.EC === 0) {
        if (append) {
          setUsers((prev) => [...prev, ...res.DT.users]);
        } else {
          setUsers(res.DT.users);
        }
        setPagination(res.DT.pagination);
      } else if (res?.message) {
        if (append) {
          setUsers((prev) => [...prev, ...res]);
        } else {
          setUsers(res);
        }
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalUsers: res.length,
          limit: res.length,
          hasNextPage: false,
          hasPrevPage: false,
        });
      } else {
        notification.error({
          message: "Lỗi",
          description: res?.EM || "Không thể tải danh sách users",
        });
      }
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra khi tải dữ liệu",
      });
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Refresh users
  const refreshUsers = () => {
    setUsers([]);
    setVisibleUsers([]);
    setIsInitialLoad(true);
    fetchUsers(1, false);
  };

  // Initial load
  useEffect(() => {
    fetchUsers(1, false);
  }, []);

  // Hiển thị users one by one với delay
  useEffect(() => {
    if (users.length > 0 && isInitialLoad) {
      setIsInitialLoad(false);

      users.forEach((user, index) => {
        setTimeout(() => {
          setVisibleUsers((prev) => {
            if (!prev.find((u) => u._id === user._id)) {
              return [...prev, { ...user, isVisible: true }];
            }
            return prev;
          });
        }, index * 200);
      });
    }
  }, [users, isInitialLoad]);

  // Thêm user mới khi load thêm
  useEffect(() => {
    if (users.length > visibleUsers.length && !isInitialLoad) {
      const newUsers = users.slice(visibleUsers.length);
      newUsers.forEach((user, index) => {
        setTimeout(() => {
          setVisibleUsers((prev) => {
            if (!prev.find((u) => u._id === user._id)) {
              return [...prev, { ...user, isVisible: true }];
            }
            return prev;
          });
        }, index * 200);
      });
    }
  }, [users, visibleUsers.length, isInitialLoad]);

  // IntersectionObserver cho lazy loading
  useEffect(() => {
    if (!sentinelRef.current) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && pagination.hasNextPage && !loadingMore) {
          fetchUsers(pagination.nextPage, true);
        }
      },
      { threshold: 1.0 }
    );

    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [pagination, loadingMore]);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <Title level={2} style={{ margin: 0 }}>
            Danh sách Users
          </Title>
          <Text type="secondary">
            {pagination.totalUsers
              ? `Hiển thị ${visibleUsers.length} / ${pagination.totalUsers} users`
              : `Đang tải...`}
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

      {/* Loading indicator */}
      {loading && users.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <Spin size="large" />
          <div style={{ marginTop: "16px" }}>
            <Text>Đang tải danh sách users...</Text>
          </div>
        </div>
      )}

      {/* Users List */}
      <div style={{ marginBottom: "24px" }}>
        {visibleUsers.map((user, index) => (
          <UserCard
            key={user._id}
            user={user}
            index={index}
            isVisible={user.isVisible}
          />
        ))}
      </div>

      {/* Loading more indicator */}
      {loadingMore && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Spin />
          <div style={{ marginTop: "8px" }}>
            <Text>Đang tải thêm...</Text>
          </div>
        </div>
      )}

      {/* End of list */}
      {!pagination.hasNextPage && users.length > 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            color: "#999",
            borderTop: "1px solid #f0f0f0",
            marginTop: "20px",
          }}
        >
          <Text type="secondary">🎉 Đã tải hết tất cả users!</Text>
        </div>
      )}

      {/* Sentinel cho lazy load */}
      <div ref={sentinelRef} style={{ height: "1px" }} />

      {/* Empty state */}
      {!loading && users.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#999",
          }}
        >
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
