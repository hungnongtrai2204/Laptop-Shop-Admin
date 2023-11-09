import React from "react";

/**
 * @author
 * @function Price
 **/

const Price = (props) => {
    const money = (+props.value).toLocaleString("vi", {
        style: "currency",
        currency: "VND",
    });
    return (
        <div>
            {money}
        </div>
    );
};

export default Price;
