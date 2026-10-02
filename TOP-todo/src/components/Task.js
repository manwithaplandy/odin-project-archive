import React from "react";

export default function Task(props) {
  const [editing, setEditing] = React.useState(false);
  const [currVal, setCurrVal] = React.useState(props.text);

  function editTask(event) {
    if (!editing) {
      setEditing(true);
    } else {
      props.editTask(event);
      setEditing(false);
    }
  }

  function handleChange(event) {
    const target = event.target;
    setCurrVal(target.value);
  }

  const input = (
    <input
      type="text"
      name="editBox"
      className="hidden"
      value={currVal}
      onChange={handleChange}
    />
  );

  return (
    <div className="task" key={props.id} id={props.id}>
      <div>
        {props.id}: {editing ? input : currVal}
      </div>
      <div>
        <button onClick={editTask}>{editing ? "Submit" : "Edit"}</button>
        <button onClick={props.deleteTask}>x</button>
      </div>
    </div>
  );
}
