import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Task } from "../Task";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof Task> = {
  title: "TODOLISTS/Task",
  component: Task,

  tags: ["autodocs"],

  argTypes: {
    changeTaskStatus: {
      description: "change Task Status",
      action: "clicked",
    },
    changeTaskTitle: {
      description: "change Task Title",
      action: "clicked",
    },
    removeTask: {
      description: "remove Task",
      action: "clicked",
    },
  },
  // на уровне компоненты: если мы создаем и описываем на уровне компоненты наши аргументы, они будут принадлежать всем историям
  args: {
    todolistId: "hjg90409h",
  },
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDoneStory: Story = {
  args: {
    task: { id: "hhuh88", title: "JS", isDone: true },
  },
};

export const TaskIsNotDoneStory: Story = {
  args: {
    task: { id: "849ihb", title: "CSS", isDone: false },
  },
};

const TaskToggle = () => {
  const [task, setTask] = useState({
    id: "hhuh88",
    title: "JS",
    isDone: false,
  });

  function changeTaskStatus() {
    setTask({ ...task, isDone: !task.isDone });
  }

  function changeTaskTitle(taskId: string, title: string) {
    setTask({ ...task, title: title });
  }

  return (
    <Task
      changeTaskStatus={changeTaskStatus}
      changeTaskTitle={changeTaskTitle}
      removeTask={action("Remove task")}
      task={task}
      todolistId={"hjg90409h"}
    />
  );
};

export const TaskToggleStory: Story = {
  render: () => <TaskToggle />,
};
