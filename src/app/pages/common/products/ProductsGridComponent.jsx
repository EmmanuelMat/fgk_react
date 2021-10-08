import React, { useEffect, useState } from "react";
import _helpers from "../../../helpers/_helpers";
import CustomTable from "../../../partials/content/custom-components/CustomTable";
import service from "../../billing/service";
import { columns } from "./config";

const ProductsGridComponent = ({ onClick }) => {
  const [products, setProducts] = useState(false);

  const getData = async (pageNumber, pageSize, name) => {
    const products = await service.getProducts(pageNumber, pageSize, name);
    const data = _helpers._select(products.data.data, [
      "code",
      "name",
      "cost",
      "unit",
      "price",
      "_id",
    ]);
    setProducts({ data, count: products.data.count });
  };

  useEffect(() => {
    getData(null, null, null);
  }, []);
  return (
    <div>
      {products && (
        <CustomTable
          columns={columns}
          onClick={onClick}
          data={products}
          getData={getData}
        />
      )}
    </div>
  );
};

export default ProductsGridComponent;
