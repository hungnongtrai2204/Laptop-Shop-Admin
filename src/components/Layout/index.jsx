import React from "react";
import Header from "../Header";
import { Row, Col, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./style.css";
import { GiCash } from "react-icons/gi";
import { BiCategoryAlt } from "react-icons/bi";
import { HiShoppingCart } from "react-icons/hi";
import { AiTwotoneShop, AiTwotoneCalendar } from "react-icons/ai";
import { BsKanban } from "react-icons/bs";
import { MdOutlineReviews } from "react-icons/md";
import { TbDiscount2, TbUser } from "react-icons/tb";

/**
 * @author
 * @function Layout
 **/

const Layout = (props) => {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <h6 className="nav_title">DASHBOARD</h6>
                </li>
                <li>
                  <NavLink end to={`/`} className="subNav">
                    <GiCash className="nav_icon" />
                    Ecommerce
                  </NavLink>
                </li>
                <li>
                  <h6 className="nav_title">PAGES</h6>
                  {/* <NavLink to={`/page`} className="subNav">Page</NavLink> */}
                </li>
                <li>
                  <NavLink to={`/category`} className="subNav">
                    <BiCategoryAlt className="nav_icon" />
                    Category
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/products`} className="subNav">
                    <AiTwotoneShop className="nav_icon" />
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/orders`} className="subNav">
                    <HiShoppingCart className="nav_icon" />
                    Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/reviews`} className="subNav">
                    <MdOutlineReviews className="nav_icon" />
                    Reviews
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/discounts`} className="subNav">
                    <TbDiscount2 className="nav_icon" />
                    Discount
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/users`} className="subNav">
                    <TbUser className="nav_icon" />
                    User
                  </NavLink>
                </li>
                <li>
                  <h6 className="nav_title">APPS</h6>
                </li>
                <li>
                  <NavLink to={`/calendar`} className="subNav">
                    <AiTwotoneCalendar className="nav_icon" />
                    Calendar
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/kanban`} className="subNav">
                    <BsKanban className="nav_icon" />
                    Kanban
                  </NavLink>
                </li>
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: "auto", paddingTop: "60px" }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
};

export default Layout;
