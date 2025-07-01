import { useCallback, useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { getTasks } from "../../../services/Stock";

function TaskList({ handleReload }) {
  const [taskComponents, setTaskComponents] = useState([<div key={1}></div>]);

  const renderTasks = useCallback(async () => {
    const tasks = await getTasks();

    if (tasks) {
      const processedTasks = tasks.map((task, index) => (
        <TaskItem
          Task={task}
          key={`task-${index}`}
          handleReload={handleReload}
        />
      ));
      setTaskComponents(processedTasks);
    }
  }, [setTaskComponents, handleReload]);

  useEffect(() => {
    renderTasks();
  }, [renderTasks]);

  return (
    <div className="mb-7 flex flex-col items-center gap-5">
      {taskComponents}
    </div>
  );
}

export default TaskList;
