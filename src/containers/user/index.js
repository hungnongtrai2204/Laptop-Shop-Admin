import React, { useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { usersGrid } from "../../data/dummy";
import HeaderOrder from "./HeaderOrder";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { deleteUserById } from "../../actions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const Users = (props) => {
  const [open, setOpen] = useState(false);
  const [userDeleteId, setUserDeleteId] = useState("");

  const user = useSelector((state) => state.user);
  const users = user.users;
  console.log("User List", users);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleClickAgree = () => {
    const payload = {
      _id: userDeleteId,
    };
    dispatch(deleteUserById(payload));
    setOpen(false);
  };

  const usersData = [];

  for (let i = 0; i < users.length; i++) {
    const item = users[i];
    usersData.push({
      UserFirstName: item.firstName,
      UserLastName: item.lastName,
      UserEmail: item.email,
      StatusBg: item.role === "admin" ? "#FF5C8E" : "#8BE78B",
      Status: item.role,
      UserCreatedAt: `${new Date(item.createdAt).getDate()}/${
        new Date(item.createdAt).getMonth() + 1
      }/${new Date(item.createdAt).getFullYear()}`,
      onClick: () => {
        setUserDeleteId(item._id);
        // const payload = {
        //   _id: item._id,
        // };
        // dispatch(deleteUserById(payload));
        handleClickOpen();
      },
    });
  }
  return (
    <Layout sidebar>
      <Dialog
        open={open}
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xóa mã giảm giá?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có đồng ý xóa tài khoản?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Hủy</Button>
          <Button onClick={handleClickAgree} autoFocus>
            Đồng Ý
          </Button>
        </DialogActions>
      </Dialog>{" "}
      <HeaderOrder category="Page" title="Users" />
      <GridComponent
        id="gridcomp"
        dataSource={usersData}
        allowPaging
        allowSorting
        // rowSelected={onOrderSelected}
      >
        <ColumnsDirective>
          {usersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            Edit,
            PdfExport,
          ]}
        />
      </GridComponent>
    </Layout>
  );
};

export default Users;
