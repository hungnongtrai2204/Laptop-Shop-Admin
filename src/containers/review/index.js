import React, { useEffect, useState } from "react";
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
import HeaderOrder from "./HeaderOrder";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { reviewsGrid } from "../../data/dummy";
import { generatePublicUrl } from "../../urlConfig";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InforReviewModal from "../review/components/InforReviewModal";
import { Col, Container, Row, Table } from "react-bootstrap";

const Reviews = (props) => {
  const [reviewDetailModal, setReviewDetailModal] = useState(false);

  const product = useSelector((state) => state.product);
  const products = product.products;
  const [reviewDetails, setReviewDetails] = useState(null);

  const [reviewSearch, setReviewSearch] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const reviewsData = [];

    for (let i = 0; i < products.length; i++) {
      const item = products[i];
      if (item.reviews.length > 0) {
        if (searchValue === "" || searchValue === null) {
          for (let j = 0; j < item.reviews.length; j++) {
            reviewsData.push({
              ProductImage: generatePublicUrl(item.productPictures[0].img),
              Name: item.name,
              Category: item.category.name,
              CustomerName:
                item.reviews[j].userId.firstName +
                " " +
                item.reviews[j].userId.lastName,
              Review: item.reviews[j].review,
              Rating: item.reviews[j].rating,
            });
          }
        } else {
          for (let j = 0; j < item.reviews.length; j++) {
            if (item.name === searchValue) {
              reviewsData.push({
                ProductImage: generatePublicUrl(item.productPictures[0].img),
                Name: item.name,
                Category: item.category.name,
                CustomerName:
                  item.reviews[j].userId.firstName +
                  " " +
                  item.reviews[j].userId.lastName,
                Review: item.reviews[j].review,
                Rating: item.reviews[j].rating,
              });
            }
          }
        }
      }
    }
    setReviewSearch(reviewsData);
  }, [searchValue]);

  const handleCloseReviewDetailsModal = () => {
    setReviewDetailModal(false);
  };
  const handleCloseDetailsModal = () => {
    setReviewDetailModal(false);
  };

  const renderReviewDetailModal = () => {
    if (!reviewDetails) {
      return null;
    }

    return (
      <InforReviewModal
        show={reviewDetailModal}
        handleClose={handleCloseReviewDetailsModal}
        modalTitle={"Review Details"}
        size="lg"
        close={handleCloseDetailsModal}
      >
        <Row>
          <Col md="12">
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={reviewDetails.Name}
              fullWidth
              disabled
            />
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <TextField
              id="outlined-basic"
              label="Customer Name"
              variant="outlined"
              value={reviewDetails.CustomerName}
              style={{ marginTop: 11 }}
              disabled
            />
          </Col>
          <Col md="6">
            <TextField
              id="outlined-basic"
              label="Category"
              variant="outlined"
              value={reviewDetails.Category}
              style={{ marginTop: 11 }}
              disabled
            />
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <TextField
              id="outlined-basic"
              label="Rating"
              variant="outlined"
              value={reviewDetails.Rating}
              style={{ marginTop: 11 }}
              disabled
            />
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              value={reviewDetails.Review}
              style={{ marginTop: 11 }}
              multiline
              rows={8}
              fullWidth
              disabled
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{ display: "flex" }}>
              <div className="productImgContainer">
                <img src={reviewDetails.ProductImage} alt="product_image" />
              </div>
            </div>
          </Col>
        </Row>
      </InforReviewModal>
    );
  };
  const onReviewSelected = (item) => {
    console.log(item.data);
    setReviewDetails(item.data);
    setReviewDetailModal(true);
  };
  return (
    <Layout sidebar>
      {" "}
      <HeaderOrder category="Page" title="Reviews" />
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        // disableClearable
        options={products.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              // type: "search",
            }}
          />
        )}
        style={{ marginBottom: "11px" }}
        value={searchValue}
        onChange={(event, newValue) => {
          setSearchValue(newValue);
        }}
      />
      <GridComponent
        id="gridcomp"
        dataSource={reviewSearch}
        allowPaging
        allowSorting
        rowSelected={onReviewSelected}
      >
        <ColumnsDirective>
          {reviewsGrid.map((item, index) => (
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
      {renderReviewDetailModal()}
    </Layout>
  );
};

export default Reviews;
