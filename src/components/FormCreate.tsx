// MPM packages
import { FormEvent, useState } from "react";

// Project files
import ListInput from "components/ListInput";
import { useModal } from "state/ModalContext";
import fakeFetch from "scripts/fakeFetch";

interface iProps {
  endPoint: string;
  fields: Array<any>;
}

export default function FormUpdate({ endPoint, fields }: iProps) {
  // Global state
  const { setModal } = useModal();

  // Local state
  // Debug - remove foo bar
  const [form, setForm] = useState({});

  // Methods
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    fakeFetch(endPoint + "create/", form)
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

  return (
    <form className="form" onSubmit={onSubmit}>
      <h2>Add information</h2>
      <ListInput fields={fields} state={[form, setForm]} />
      <hr />
      <button className="button-gray">Create</button>
      <button className="button-gray" onClick={() => setModal(null)}>
        Cancel
      </button>
    </form>
  );
}
