const getTasksInDateRange = (startDate, endDate, tasks) => {
  const thisWeekTasks = tasks
    .filter(
      (task) =>
        (task.start >= startDate && task.start >= endDate) ||
        (task.end >= startDate && task.end >= endDate) ||
        (task.start <= startDate && task.end >= endDate)
    )
    .map((task) => {
      if (task.start < startDate) {
        task.start = startDate;
      }
      if (task.end > endDate) {
        task.start = endDate;
      }

      return task;
    });

  console.log(thisWeekTasks);
};
