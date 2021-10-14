import React, { useState } from "react";
import CustomModal from "../../partials/content/custom-components/CustomModal";
import NoteIcon from "@material-ui/icons/Note";
import { Form } from "react-bootstrap";

const NoteModal = ({onSave, notes}) => {
    const [note, setNote] = useState(notes.notes)
  return (
    <div>
      <CustomModal
        primaryBtn={{
          title: "Guardar",
          onClick: () => onSave(note),
        }}
        children={
          <Form.Control
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows="4"
            as="textarea"
          />
        }
        openModalBtn={<NoteIcon />}
        size={"sm"}
        title={"Notas"}
      />
    </div>
  );
};

export default NoteModal;
