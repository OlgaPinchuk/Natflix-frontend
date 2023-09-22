// MPM packages
import { FormEvent, useState } from "react";

// Project files
import ListInput from "components/ListInput";
import { generateFields } from "scripts/formUtilities";
import { useModal } from "state/ModalContext";
import ApiMethod from "types/eApiMethods";

interface iProps {
  endPoint: string;
  fields: Array<any>;
  data: any;
}

export default function FormUpdate({ endPoint, fields, data }: iProps) {
  // Global state
  const { setModal } = useModal();

  // Local state
  const [form, setForm] = useState<Record<string, any>>(
    generateFields(fields, data)
  );

  const updateEndpoint = `${endPoint}/${data.id}/update`;

  // Methods
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    const editedItem = { ...form, id: data.id };
    event.preventDefault();

    const formData = new FormData();

    for (const key in form) {
      if (form.hasOwnProperty(key)) {
        if (key === "banner_url" || key === "thumbnail_url") {
          const fileData = form[key];
          const initialImage = "picture.png";
          const imageFile = new File([fileData], initialImage, {
            type: "image/png",
          });

          formData.append(key, imageFile);
        } else {
          const formDataValue = form[key];
          formData.append(key, formDataValue);
        }
      }
    }

    fetch(updateEndpoint, {
      method: ApiMethod.PUT,
      body: formData,
    })
      .then(onSuccess)
      .catch((error) => onFailure(error));
  }

  function onSuccess() {
    alert("Item edited!");
    setModal(null);
  }

  function onFailure(error: string) {
    console.error(error);
    alert("Could not edit item");
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <h2>Edit information</h2>
      <ListInput fields={fields} state={[form, setForm]} />
      <hr />
      <button>Update</button>
      <button onClick={() => setModal(null)}>Cancel</button>
    </form>
  );
}
