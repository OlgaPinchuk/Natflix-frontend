// MPM packages
import { FormEvent, useState } from "react";

// Project files
import ListInput from "components/ListInput";
import { useModal } from "state/ModalContext";
import ApiMethod from "types/eApiMethods";
import { HEADERS } from "constants/api";

interface iProps {
  endPoint: string;
  fields: Array<any>;
}

export default function FormCreate({ endPoint, fields }: iProps) {
  // Global state
  const { setModal } = useModal();

  // Local state
  const [form, setForm] = useState({});

  // Derived state
  const createEndpoint = endPoint + "/create";

  // Methods
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch(createEndpoint, {
      method: ApiMethod.POST,
      headers: HEADERS,
      body: JSON.stringify(form),
    })
      .then(onSuccess)
      .catch((error) => onFailure(error));
  }

  function onSuccess() {
    alert("Item created!");
    setModal(null);
  }

  function onFailure(error: string) {
    console.error(error);
    alert("Could not create item");
  }

  console.log({ form });

  return (
    <form className="form" onSubmit={onSubmit}>
      <h2>Add information</h2>
      <ListInput fields={fields} state={[form, setForm]} />
      <hr />
      <button>Create</button>
      <button onClick={() => setModal(null)}>Cancel</button>
    </form>
  );
}
