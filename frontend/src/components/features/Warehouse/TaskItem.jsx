import { taskComplete } from "../../../services/Stock";
import Button from "../../common/Button";

function TaskItem({ Task, handleReload }) {
  async function handleComplete() {
    await taskComplete(Task.productId, Task.amount);
    handleReload();
  }

  return (
    <div className="flex w-full flex-row justify-between rounded-md p-3 shadow-lg">
      <div className="flex items-center gap-5">
        <div className="font-semibold">{Task.productName}</div>
        <div className="rounded-md bg-orange-300 px-1">{Task.productId}</div>
        <img src="close.png" className="h-8 p-2" />
        <div className="text-xl font-semibold">{Task.amount}</div>
      </div>
      <div>
        <img src="longArrow.png" className="h-9" />
      </div>
      <div className="flex items-center gap-5">
        <div className="font-semibold">Regal {Task.shelfId}</div>
        <Button style={"accept"} text={"Erledigt"} onClick={handleComplete} />
      </div>
    </div>
  );
}

export default TaskItem;
