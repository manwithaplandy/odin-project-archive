import Task from "./Task";

export default function Overview(props) {
  function editTask(event, value) {
    props.editTask(event);
  }

  function deleteTask(event) {
    props.deleteTask(event);
  }
  const allTasks = props.tasks.map((e) => (
    <Task
      id={e.id}
      key={e.id}
      text={e.text}
      editTask={editTask}
      deleteTask={deleteTask}
    />
  ));

  return <div className="Overview">{allTasks}</div>;
}
