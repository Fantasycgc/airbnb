import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { LogOut } from "lucide-react";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import { NavLink, Outlet, Navigate } from "react-router-dom"; // Import Navigate
import { PATH } from "../constants/PATH";
import { useAuth } from "../../hooks";

const { Header, Sider, Content } = Layout;

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const auth = useAuth();
  const { user, logout } = auth;
  const [redirect, setRedirect] = useState(null);

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      toast.success(response.message);
      setRedirect("/"); // Set redirect to the homepage or login
    } else {
      toast.error(response.message);
    }
  };

  // If there is no user, redirect to login page
  if (!user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  // If redirect is set, navigate to the specified path
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <Layout style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          className="mt-8"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: (
                <NavLink to={PATH.USER_MANAGER}>Quản lý Người dùng</NavLink>
              ),
            },
            {
              key: "2",
              icon: <LocationOnIcon />,
              label: (
                <NavLink to={PATH.LOCATION_MANAGER}>Quản lý vị trí</NavLink>
              ),
            },
            {
              key: "3",
              icon: <RoomPreferencesIcon />,
              label: <NavLink to={PATH.ROOM_MANAGER}>Quản lý Phòng</NavLink>,
            },
            {
              key: "4",
              icon: <AssignmentTurnedInIcon />,
              label: <NavLink to={PATH.BOOK_MANAGER}>Quản lý Booking</NavLink>,
            },
            {
              key: "5",
              icon: <LogOut />,
              label: <span onClick={handleLogout}>Đăng xuất</span>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "10px",
            padding: "10px",
            background: colorBgContainer,
            borderRadius: "8px",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
