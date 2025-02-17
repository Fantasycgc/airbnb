import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import { NavLink, Outlet } from "react-router-dom";
import { PATH } from "../constants/PATH";

const { Header, Sider, Content } = Layout;

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();

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
              label: <NavLink to={PATH.USER_MANAGER}>Quản lý Người dùng</NavLink>
            },
            {
              key: "2",
              icon: <LocationOnIcon />,
              label: <NavLink to={PATH.LOCATION_MANAGER}>Quản lý vị trí</NavLink>
            },
            {
              key: "3",
              icon: <RoomPreferencesIcon />,
              label: <NavLink to={PATH.ROOM_MANAGER}>Quản lý Phòng</NavLink>
            },
            {
              key: "4",
              icon: <AssignmentTurnedInIcon />,
              label: <NavLink to={PATH.BOOK_MANAGER}>Quản lý Booking</NavLink>
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64
            }}
          />
        </Header>
        <Content
          style={{
            margin: "10px",
            padding: "10px",
            background: colorBgContainer,
            borderRadius: "8px",
            overflow: "auto"
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
