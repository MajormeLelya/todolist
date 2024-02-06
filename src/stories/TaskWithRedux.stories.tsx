import type { Meta, StoryObj } from "@storybook/react";
import { useSelector } from "react-redux";
import { v1 } from "uuid";
import { TaskWithRedux } from "../TaskWithRedux";
import { TaskType } from "../Todolist";
import { AppRootStateType } from "../state/store";
import { ReduxStoreProviderDecorator } from "./decorators/ReduxStoreProviderDecorator";

const meta: Meta<typeof TaskWithRedux> = {
  title: "TODOLISTS/TaskWithRedux",
  component: TaskWithRedux,

  tags: ["autodocs"],

  decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof TaskWithRedux>;

const Task = () => {
  let task = useSelector<AppRootStateType, TaskType>(
    (state) => state.tasks["todolistId1"][0]
  );

  if (!task) task = { id: v1(), title: "DEFAULT TASK", isDone: false };

  return <TaskWithRedux task={task} todolistId="todolistId1" />;
};

export const TaskWithReduxStory: Story = {
  render: () => <Task />,
};
