import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomModal from "../../../partials/content/custom-components/CustomModal";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { setLocale } from "yup";
import { makeStyles, FormControlLabel, Checkbox } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

setLocale({
  number: {
    min: "Deve ser mayor que el total de la factura:  ${min}",
    required: "Campo obligatorio.",
    positive: "Deve ser mayor que el total de la factura:  ${min}",
  },
});

const dynamicSchema = (total) => {
  return yup.object().shape({
    cantidad: yup
      .number()
      .positive()
      .required()
      .min(total),
  });
};

const SubmitModal = ({
  onSave,
  showModalFormOutSide,
  onClose,
  bill,
  setShowSubmitModal,
}) => {
  const classes = useStyles();
  const [copy, setCopy] = useState(false);
  const [conduce, setConduce] = useState(false);

  const onSubmit = (data) => {
    onSave(parseFloat(data.cantidad), copy, conduce);
    setShowSubmitModal(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      dynamicSchema(parseFloat(bill.totalPrice).toFixed(2))
    ),
  });

  return (
    <div>
      <CustomModal
        showModalFormOutSide={showModalFormOutSide}
        primaryBtn={{
          title: "Guardar",
          onClick: handleSubmit(onSubmit),
        }}
        children={
          <div>
            <input
              {...register("cantidad", { min: bill.totalPrice + 1 })}
              className={`form-control  ${errors?.cantidad && " is-invalid"}`}
              type="number"
              defaultValue="0"
            />
            <div className="invalid-feedback">
              {errors?.cantidad && errors?.cantidad.message}
            </div>
            <div className="d-flex flex-wrap justify-content-around">
              <span>Total: {parseFloat(bill.totalPrice).toFixed(2)} </span>
              <span>Sub total: {parseFloat(bill.subTotal).toFixed(2)} </span>
              <span>ITBIS: {parseFloat(bill.tax).toFixed(2)}</span>
            </div>

            <div className="d-flex flex-wrap justify-content-around">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={conduce}
                    onChange={(event) => setConduce(event.target.checked)}
                    name="conduce"
                  />
                }
                label="Conduce"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={copy}
                    onChange={(event) => setCopy(event.target.checked)}
                    name="Copia"
                  />
                }
                label="Copia"
              />
            </div>
          </div>
        }
        size={"sm"}
        title={"Finalizar"}
        onClose={() => setShowSubmitModal(false)}
        closeOnSubmit={false}
      />
    </div>
  );
};

export default SubmitModal;
