import Layout from "../../components/Layout";
import { Col, Container, Row, Table } from "react-bootstrap";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, addSaleProduct, deleteProductById } from "../../actions";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";

import InforProductModal from "../products/components/InforProductModal";
import DeleteProductModal from "../products/components/DeleteProductModal";
import Pagination from "../../components/Pagination";
import Price from "./components/PriceUI";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import { NumericFormat } from "react-number-format";
/**
 * @author
 * @function Home
 **/

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      suffix=" VND"
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Products = (props) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [productDeleteModal, setProductDeleteModall] = useState(false);
  const [productDelete, setProductDelete] = useState(null);
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const [payload, setPayload] = useState({});
  const [query, setQuery] = useState("");
  const [sortcate, setSortCate] = useState("");
  const [sale, setSale] = useState({
    numberformat: 0,
  });
  const [nameEdit, setNameEdit] = useState("");
  const [priceEdit, setPriceEdit] = useState(0);
  const [quantityEdit, setQuantityEdit] = useState(0);
  const [descriptionEdit, setDescriptionEdit] = useState("");

  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);

    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form));

    setShow(false);
    if (
      name !== null &&
      quantity !== null &&
      price !== null &&
      description !== null &&
      category !== null &&
      productPictures.length > 0
    ) {
      window.location.reload();
    }
  };
  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      if (category.children.length === 0) {
        options.push({
          value: category._id,
          name: category.name,
          parentId: category.parentId,
        });
      }

      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  //get current post
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = product.products
    .sort((a, b) => (a._id > b._id ? -1 : 1))
    .slice(indexOfFirstPost, indexOfLastPost);

  //change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = () => {
    return (
      <div>
        <Table
          style={{ fontSize: 12 }}
          responsive="sm"
          className="product_list"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th className="product_picture">Picture</th>
              <th className="product_price">Price</th>
              <th className="product_quantity">Quantity</th>
              <th className="product_category">Category</th>
              <th className="product_button">Button</th>
            </tr>
          </thead>
          <tbody>
            {product.products.length > 0
              ? currentPosts.map((product) => (
                  <tr
                    // onClick={console.log(product.productPictures[1])}
                    // onClick={() => showProductDetailsModal(product)}
                    key={product._id}
                  >
                    <td className="product_name">{product.name}</td>
                    <td className="product_picture">
                      <img
                        src={generatePublicUrl(product.productPictures[0].img)}
                        alt="product_image"
                      />
                    </td>
                    <td className="product_price">
                      <Price value={product.price} />
                    </td>
                    <td className="product_quantity">{product.quantity}</td>
                    <td className="product_category">
                      {product.category.name}
                    </td>
                    <td className="product_button">
                      <button
                        className="product_info_btn"
                        onClick={() => showProductDetailsModal(product)}
                      >
                        Info
                      </button>
                      <button
                        className="product_delete_btn"
                        onClick={() => {
                          const payload1 = {
                            productId: product._id,
                          };
                          setPayload(payload1);
                          showDeleteModal(payload);
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
          totalPosts={product.products.length}
          paginate={paginate}
        />
      </div>
    );
  };

  const renderProductsWithSort = () => {
    return (
      <div>
        <Table
          style={{ fontSize: 12 }}
          responsive="sm"
          className="product_list"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th className="product_picture">Picture</th>
              <th className="product_price">Price</th>
              <th className="product_quantity">Quantity</th>
              <th className="product_category">Category</th>
              <th className="product_button">Button</th>
            </tr>
          </thead>
          <tbody>
            {product.products.length > 0
              ? product.products
                  .filter((product) =>
                    sortcate !== "" && query === ""
                      ? product.category._id.includes(sortcate)
                      : sortcate === "" && query !== ""
                      ? product.name.toLowerCase().includes(query)
                      : sortcate !== "" && query !== ""
                      ? product.name.toLowerCase().includes(query) &&
                        product.category._id.includes(sortcate)
                      : null
                  )
                  .map((product) => (
                    <tr
                      // onClick={console.log(product.productPictures[1])}
                      // onClick={() => showProductDetailsModal(product)}
                      key={product._id}
                    >
                      <td className="product_name">{product.name}</td>
                      <td className="product_picture">
                        <img
                          src={generatePublicUrl(
                            product.productPictures[0].img
                          )}
                          alt="product_image"
                        />
                      </td>
                      <td className="product_price">
                        <Price value={product.price} />
                      </td>
                      <td className="product_quantity">{product.quantity}</td>
                      <td className="product_category">
                        {product.category.name}
                      </td>
                      <td className="product_button">
                        <button
                          className="product_info_btn"
                          onClick={() => showProductDetailsModal(product)}
                        >
                          Info
                        </button>
                        <button
                          className="product_delete_btn"
                          onClick={() => {
                            const payload1 = {
                              productId: product._id,
                            };
                            setPayload(payload1);
                            showDeleteModal(payload);
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
      </div>
    );
  };
  const renderAddProductModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Product"}
      >
        <Input
          label="Name"
          value={name}
          type="text"
          placeholder={`Product Name`}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Quantity"
          value={quantity}
          type="number"
          placeholder={`Quantity`}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Price"
          value={price}
          type="text"
          placeholder={`Price`}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          type="text"
          placeholder={`Description`}
          as="textarea"
          aria="With textarea"
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="select_category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option hidden>Select category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}

        <input
          className="select_file"
          type="file"
          name="productPicture"
          onChange={handleProductPictures}
        />
      </Modal>
    );
  };

  
  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
    const payload = {
      productId: productDetails._id,
      sale: sale.numberformat,
      name: nameEdit,
      price: priceEdit,
      quantity: quantityEdit,
      description: descriptionEdit,
    };
    dispatch(addSaleProduct(payload));
    setTimeout( function (){
      window.location.reload();
    }, 1500)
  };
  const handleCloseDetailsModal = () => {
    setProductDetailModal(false);
  };

  const handleCloseProductDeleteModal = () => {
    setProductDeleteModall(false);
  };
  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setSale({
      numberformat: product && product.sale > 0 ? product.sale : 0,
    });
    setNameEdit(product.name);
    setPriceEdit(product.price);
    setQuantityEdit(product.quantity);
    setDescriptionEdit(product.description);
    setProductDetailModal(true);
  };
  const showDeleteModal = (payload) => {
    setProductDelete(payload);
    setProductDeleteModall(true);
  };

  const deleteProduct = () => {
    console.log(payload);
    dispatch(deleteProductById(payload));
    window.location.reload();
  };
  const resetFilter = () => {
    document.getElementById("search_bar").value = "";
    setQuery("");
    document.getElementById("sort_products_category").value = null;
    setSortCate("");
  };

  const renderProductDeleteModal = () => {
    if (!productDelete) {
      return null;
    }
    return (
      <DeleteProductModal
        show={productDeleteModal}
        handleClose={handleCloseProductDeleteModal}
        modalTitle={"Product Delete"}
        size="lg"
        deleteProduct={deleteProduct}
      ></DeleteProductModal>
    );
  };
  const renderProductDetailModal = () => {
    if (!productDetails) {
      return null;
    }
    // console.log("DETAIL", productDetails);
    // const productSale = {
    //   numberformat: productDetails.sale,
    // };
    return (
      <InforProductModal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={"Product Details"}
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
            />
          </Col>
          <Col md="6">
            {/* <label className="key">Price</label>
            <p className="value">
              <Price value={productDetails.price} />
            </p> */}
            <TextField
              label="Price"
              value={priceEdit}
              // onChange={handleChange}
              // onChange={(e) =>
              //   setSale({
              //     numberformat: e.target.value,
              //   })
              // }
              name="numberformat"
              id="formatted-numberformat-input"
              // id="outlined-basic"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
              variant="outlined"
              style={{ marginTop: 11 }}
              onChange={(e) => setPriceEdit(e.target.value)}
            />
          </Col>
          <Col md="6">
            <TextField
              label="Sale"
              value={sale.numberformat}
              // onChange={handleChange}
              onChange={(e) =>
                setSale({
                  numberformat: e.target.value,
                })
              }
              name="numberformat"
              id="formatted-numberformat-input"
              // id="outlined-basic"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
              variant="outlined"
              style={{ marginTop: 11 }}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6">
            {/* <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p> */}
            <TextField
              id="outlined-basic"
              label="Quantity"
              variant="outlined"
              value={quantityEdit}
              style={{ marginTop: 11 }}
              onChange={(e) => setQuantityEdit(e.target.value)}
            />
          </Col>
          <Col md="6">
            {/* <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p> */}
            <TextField
              id="outlined-basic"
              label="Category"
              variant="outlined"
              value={productDetails.category.name}
              style={{ marginTop: 11 }}
              disabled
            />
          </Col>
        </Row>
        <Row>
          <Col md="12">
            {/* <label className="key">Description</label>
            <p className="value">{productDetails.description}</p> */}
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              value={descriptionEdit}
              style={{ marginTop: 11 }}
              multiline
              rows={8}
              fullWidth
              onChange={(e) => setDescriptionEdit(e.target.value)}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((picture) => (
                <div className="productImgContainer">
                  <img
                    src={generatePublicUrl(picture.img)}
                    alt="product_image"
                  />
                </div>
              ))}
            </div>
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
              <h2 className="product_title">Products</h2>
              <button className="add_product_btn" onClick={handleShow}>
                Add Product
              </button>
            </div>
            <div className="search_container">
              <input
                type="text"
                placeholder="Search"
                className="search_bar"
                id="search_bar"
                onChange={(e) => {
                  setQuery(e.target.value.toLowerCase());
                }}
              />
              <label htmlFor="sort_products_category" className="label_sort">
                Sort by category:
              </label>
              <select
                id="sort_products_category"
                className="sort_products_category"
                value={category.categories.name}
                onChange={(e) => setSortCate(e.target.value)}
              >
                <option hidden>Select category</option>
                {createCategoryList(category.categories).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
              <button className="reset_filter" onClick={resetFilter}>
                Reset filter
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {sortcate === "" && query === ""
              ? renderProducts()
              : renderProductsWithSort()}
          </Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailModal()}
      {renderProductDeleteModal()}
    </Layout>
  );
};

export default Products;
