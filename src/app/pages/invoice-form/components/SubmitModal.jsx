import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomModal from "../../../partials/content/custom-components/CustomModal";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { setLocale } from "yup";

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
  const onSubmit = (data) => {
    onSave(parseFloat(data.cantidad));
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
              type="number" defaultValue="0"
            />
            <div className="invalid-feedback">
              {errors?.cantidad && errors?.cantidad.message}
            </div>
            <div className="d-flex flex-wrap justify-content-around">
              <span>Total: {parseFloat(bill.totalPrice).toFixed(2)} </span>
              <span>Sub total: {parseFloat(bill.subTotal).toFixed(2)} </span>
              <span>ITBIS: {parseFloat(bill.tax).toFixed(2)}</span>
            </div>
          </div>
        }
        size={"sm"}
        title={"Notas"}
        onClose={() => setShowSubmitModal(false)}
        closeOnSubmit={false}
      />
    </div>
  );
};

export default SubmitModal;
