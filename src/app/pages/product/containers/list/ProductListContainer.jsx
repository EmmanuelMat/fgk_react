import React, { useEffect, useState } from "react";
import service from "../../service";
import { Container, CssBaseline, LinearProgress } from "@material-ui/core";
import ReactIf from "../../../../helpers/ReactIf";

const CustomTable = React.lazy(() =>
  import("../../../../partials/content/custom-components/CustomTable")
);

const columns = [
  { label: "Codigo", value: "code" },
  { label: "Producto", value: "name" },
  { label: "Precio", value: "price" },
  { label: "Costo", value: "cost" },
  { label: "Unidad", value: "unit" },
];
const ProductListContainer = ({ onRowClickHandler }) => {
  const [products, setproducts] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = async (pageNumber, pageSize, name) => {
    const payload = await service.get(pageNumber, pageSize, name);
    setproducts(payload.data);
  };

  return (
    <>
      <CssBaseline />
      <Container fixed>
        <ReactIf condition={products} Or={<LinearProgress />}>
          <CustomTable
            onClick={onRowClickHandler}
            data={products}
            getData={getData}
            columns={columns}
          />
        </ReactIf>
      </Container>
    </>
  );
};

export default ProductListContainer;
