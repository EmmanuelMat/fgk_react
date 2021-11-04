import React, { useEffect, useState } from "react";
import service from "../../service";
import { Container, CssBaseline, LinearProgress } from "@material-ui/core";
import ReactIf from "../../../../helpers/ReactIf";

const CustomTable = React.lazy(() =>
  import("../../../../partials/content/custom-components/CustomTable")
);

const columns = [
  { label: "Codigo", value: "code" },
  { label: "Nombre", value: "name" },
  { label: "Cel", value: "cNumber" },
  { label: "Tel", value: "pNumber" },
  { label: "Direccion", value: "address" },
  { label: "RNC", value: "taxId" },
];

const ClientsListContainer = ({ onRowClickHandler }) => {
  const [clients, setClients] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = async (pageNumber, pageSize, name) => {
    const payload = await service.getClientByNameOrId(pageNumber, pageSize, name);
    setClients(payload.data);
  };

  return (
    <>
      <CssBaseline />
        <ReactIf condition={clients} Or={<LinearProgress />}>
          <CustomTable
            onClick={onRowClickHandler}
            data={clients}
            getData={getData}
            columns={columns}
          />
        </ReactIf>
    </>
  );
};

export default ClientsListContainer;
