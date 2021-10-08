import React, { forwardRef } from "react";
import { Button } from "react-bootstrap";
import CustomModal from "../../../partials/content/custom-components/CustomModal";
import ProductsGridComponent from "../../common/products/ProductsGridComponent";
import SearchIcon from "@material-ui/icons/Search";

const ProductModal = forwardRef(({handleProductSelect}, ref) => {
  return (
    <CustomModal
      ref={ref}
      children={<ProductsGridComponent onClick={handleProductSelect} />}
      openModalBtn={
        <Button size="sm" variant="primary">
          <SearchIcon />
        </Button>
      }
      title={"Productos"}
      size={"lg"}
    />
  );
});

export default ProductModal;
