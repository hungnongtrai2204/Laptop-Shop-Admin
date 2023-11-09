import React, { useState } from "react";
import { Container, Col, Row, Table } from "react-bootstrap";
import Layout from "../../components/Layout";
import Pagination from "../../components/Pagination";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import {
  addDiscount,
  deleteDiscountById,
  updateDiscount,
} from "../../actions/discount.actions";
import InforProductModal from "../products/components/InforProductModal";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Discounts = (props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [percent, setPercent] = useState("");
  const [discountDetails, setDiscountDetails] = useState(null);
  const [discountDetailModal, setDiscountDetailModal] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const [sortcate, setSortCate] = useState("");
  const [postsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [nameEdit, setNameEdit] = useState("");
  const [percentEdit, setPercentEdit] = useState(0);
  const [endDateEdit, setEndDateEdit] = useState(null);
  const [discountDeleteId, setDiscountDeleteId] = useState("");
  const dispatch = useDispatch();
  const discount = useSelector((state) => state.discount);
  const auth = useSelector((state) => state.auth);
  console.log("DISCOUNT USER", auth);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    // const form = new FormData();
    // form.append("name", name);
    // form.append("quantity", quantity);
    // form.append("price", price);
    // form.append("description", description);
    // form.append("category", categoryId);
    // form.append("percent", percent);
    // form.append("endDate", endDate);
    // for (let pic of productPictures) {
    //   form.append("productPicture", pic);
    // }
    dispatch(
      addDiscount({
        name: name,
        percent: percent,
        endDate: endDate,
        createdBy: auth.user._id,
      })
    );

    setShow(false);
    // if (name !== null && quantity !== null && price !== null
    //   && description !== null && category !== null && productPictures.length > 0) {

    //   window.location.reload()
    // }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleClickAgree = () => {
    const payload = {
      _id: discountDeleteId,
    };
    dispatch(deleteDiscountById(payload));
    setOpen(false);
  };
  const resetFilter = () => {
    document.getElementById("search_bar").value = "";
    setQuery("");
    document.getElementById("sort_products_category").value = null;
    setSortCate("");
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = discount.discounts
    .sort((a, b) => (a._id > b._id ? -1 : 1))
    .slice(indexOfFirstPost, indexOfLastPost);
  const renderProducts = () => {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClickClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Xóa mã giảm giá?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Bạn có đồng ý xóa mã giảm giá ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickClose}>Hủy</Button>
            <Button onClick={handleClickAgree} autoFocus>
              Đồng Ý
            </Button>
          </DialogActions>
        </Dialog>
        <Table
          style={{ fontSize: 12 }}
          responsive="sm"
          className="product_list"
        >
          <thead>
            <tr>
              <th>Name</th>
              {/* <th className="product_picture">Picture</th> */}
              {/* <th className="product_price">Price</th> */}
              <th className="product_quantity">Percent</th>
              <th className="product_category">End Date</th>
              <th className="product_button">Button</th>
            </tr>
          </thead>
          <tbody>
            {discount.discounts.length > 0
              ? currentPosts.map((discount) => (
                  <tr
                    // onClick={console.log(product.productPictures[1])}
                    // onClick={() => showProductDetailsModal(product)}
                    key={discount._id}
                  >
                    <td className="product_name">{discount.name}</td>
                    {/* <td className="product_picture">
                      <img
                        src={generatePublicUrl(product.productPictures[0].img)}
                        alt="product_image"
                      />
                    </td> */}
                    {/* <td className="product_price">
                      <Price value={product.price} />
                    </td> */}
                    <td className="product_quantity">{discount.percent}</td>
                    <td className="product_category">
                      {`${new Date(discount.endDate).getDate()}/${
                        new Date(discount.endDate).getMonth() + 1
                      }/${new Date(discount.endDate).getFullYear()}`}
                    </td>
                    <td className="product_button">
                      <button
                        className="product_info_btn"
                        onClick={() => showDiscountDetailsModal(discount)}
                      >
                        Info
                      </button>
                      <button
                        className="product_delete_btn"
                        // onClick={() => {
                        //   const payload1 = {
                        //     productId: product._id,
                        //   };
                        //   setPayload(payload1);
                        //   showDeleteModal(payload);
                        // }}
                        onClick={() => {
                          // console.log("DISCOUNT DELETE", discount);
                          setDiscountDeleteId(discount._id);
                          handleClickOpen();
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={discount.discounts.length}
          paginate={paginate}
        />
      </div>
    );
  };

  const showDiscountDetailsModal = (discount) => {
    setDiscountDetails(discount);
    setNameEdit(discount.name);
    setPercentEdit(discount.percent);
    setEndDateEdit(discount.endDate);
    setDiscountDetailModal(true);
  };

  const renderAddProductModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Discount"}
      >
        <Input
          label="Name"
          value={name}
          type="text"
          placeholder={`Discount Name`}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Percent"
          value={percent}
          type="number"
          placeholder={`Percent`}
          onChange={(e) => setPercent(e.target.value)}
        />
        <DatePicker
          label="End Date"
          renderInput={(params) => <TextField {...params} />}
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
        />
      </Modal>
    );
  };

  const handleCloseDiscountDetailsModal = () => {
    setDiscountDetailModal(false);
    // const payload = {
    //   productId: productDetails._id,
    //   sale: sale.numberformat,
    //   name: nameEdit,
    //   price: priceEdit,
    //   quantity: quantityEdit,
    //   description: descriptionEdit,
    // };
    // dispatch(addSaleProduct(payload));
    const payload = {
      discountId: discountDetails._id,
      name: nameEdit,
      percent: percentEdit,
      endDate: endDateEdit,
    };
    dispatch(updateDiscount(payload));
    window.location.reload();
  };
  const handleCloseDetailsModal = () => {
    setDiscountDetailModal(false);
  };
  const renderDiscountDetailModal = () => {
    if (!discountDetails) {
      return null;
    }
    // console.log("DETAIL", productDetails);
    // const productSale = {
    //   numberformat: productDetails.sale,
    // };
    return (
      <InforProductModal
        show={discountDetailModal}
        handleClose={handleCloseDiscountDetailsModal}
        modalTitle={"Discount Details"}
        size="lg"
        close={handleCloseDetailsModal}
      >
        <Row>
          <Col md="12">
            {/* <label className="key">Name</label>
            <p className="value">{productDetails.name}</p> */}
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={nameEdit}
              onChange={(e) => setNameEdit(e.target.value)}
              fullWidth
              style={{ marginBottom: 11 }}
            />
          </Col>
          <Col md="6">
            {/* <label className="key">Price</label>
            <p className="value">
              <Price value={productDetails.price} />
            </p> */}
            <TextField
              id="outlined-basic"
              label="Percent"
              variant="outlined"
              value={percentEdit}
              onChange={(e) => setPercentEdit(e.target.value)}
            />
          </Col>
          <Col md="6">
            <DatePicker
              label="End Date"
              renderInput={(params) => <TextField {...params} />}
              value={endDateEdit}
              onChange={(newValue) => setEndDateEdit(newValue)}
            />
          </Col>
        </Row>
      </InforProductModal>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div
              className="product_container"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h2 className="product_title">Discounts</h2>
              <button className="add_product_btn" onClick={handleShow}>
                Add Discount
              </button>
            </div>
            <div className="search_container">
              {/* <input
                type="text"
                placeholder="Search"
                className="search_bar"
                id="search_bar"
                onChange={(e) => {
                  setQuery(e.target.value.toLowerCase());
                }}
              /> */}
              {/* <label htmlFor="sort_products_category" className="label_sort">
                Sort by percent:
              </label> */}
              {/* <select
                id="sort_products_category"
                className="sort_products_category"
                // value={category.categories.name}
                value={""}
                onChange={(e) => setSortCate(e.target.value)}
              >
                <option hidden>Select percent</option>
                {createCategoryList(category.categories).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select> */}
              {/* <button className="reset_filter" onClick={resetFilter}>
                Reset filter
              </button> */}
            </div>
          </Col>
        </Row>
        <Row>
          {/* <Col>{sortcate === '' && query === '' ?
            renderProducts()
            : renderProductsWithSort()
          }</Col> */}
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderDiscountDetailModal()}
    </Layout>
  );
};

export default Discounts;
