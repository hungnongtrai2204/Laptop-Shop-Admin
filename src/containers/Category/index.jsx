import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategory,
  addCategory,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
} from "../../actions";
import Layout from "../../components/Layout";
import CheckboxTree from "react-checkbox-tree";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload,
} from "react-icons/io";
import {MdOutlineModeEditOutline} from 'react-icons/md'
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import UpdateCategoriesModal from "./components/UpdateCategoriesModal";
import AddCategoryModal from "./components/AddCategoryModal";
import DeleteCategoryModal from "./components/DeleteCategoryModal";
import "./style.css";

function Category() {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  // checkedArray và expandedArray là hai mảng dùng để lưu trữ các Category nào đang được mở và Category nào đang được chọn để thực hiện Edit hoặc Delete
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

  useEffect(() => {
    if (!category.loading) {
      setShow(false);
    }
  }, [category.loading]);

  const handleClose = () => {
    const form = new FormData();
    // if (categoryName === "") {
    //   alert("Category name is required");
    //   setShow(false);
    //   return;
    // }

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    form.append("type", "store");
    console.log("TESTTTTTTTTTTTTTTTTTT");
    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategoryId("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let mycategories = [];
    for (let category of categories) {
      mycategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return mycategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    console.log(e);
    setCategoryImage(e.target.files[0]);
  };

  const updateCategory = () => {
    updateCheckAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const updateCheckAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && checkedArray.push(category);
      });

    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && expandedArray.push(category);
      });

    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type === "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  const updateCategoriesForm = () => {
    const form = new FormData();

    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    dispatch(updateCategories(form));
    setUpdateCategoryModal(false);
  };

  const deleteCategory = () => {
    updateCheckAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdsArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));
    const idsArray = expandedIdsArray.concat(checkedIdsArray);

    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdsArray)).then((result) => {
        if (result) {
          dispatch(getAllCategory());
          setDeleteCategoryModal(false);
        }
      });
    }
    setDeleteCategoryModal(false);
  };

  const categoryList = createCategoryList(category.categories);
  return (
    <Layout sidebar>
      <Container className="category-container">
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <div className="actionBtnContainer">
                <span>Action: </span>
                <button onClick={handleShow} className=' btn-add-cate'>
                  {" "}
                  <span>Add</span> <IoIosAdd />
                </button>
                <button onClick={updateCategory} className=' btn-edit-cate'>
                  {" "}
                  <span>Edit</span> <MdOutlineModeEditOutline />
                </button>
                <button onClick={deleteCategory} className=' btn-delete-cate'>
                  {" "}
                  <span>Delete</span> <IoIosTrash />
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <Row className='list-container-row'>
          <Col md={12} className='list-container'>
            <CheckboxTree
              className='category-list-check'
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
      </Container>
      <AddCategoryModal
        show={show}
        // handleClose={() => setShow(false)}
        // onSubmit={handleClose}
        handleClose={handleClose}
        modalTitle="Add New Category"
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        parentCategoryId={parentCategoryId}
        setParentCategoryId={setParentCategoryId}
        categoryList={categoryList}
        handleCategoryImage={handleCategoryImage}
      />
      <UpdateCategoriesModal
        show={updateCategoryModal}
        // handleClose={() => setUpdateCategoryModal(false)}
        // onSubmit={updateCategoriesForm}
        handleClose={updateCategoriesForm}
        modalTitle={"Update Categories"}
        size="lg"
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
        categoryList={categoryList}
      />
      <DeleteCategoryModal
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        deleteCategories={deleteCategories}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
      />
    </Layout>
  );
}

export default Category;
