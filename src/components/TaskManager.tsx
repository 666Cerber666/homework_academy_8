import React, { useState } from 'react';

// Интерфейсы для задач и категорий
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface Category {
  id: number;
  name: string;
  tasks: Task[];
}

const TaskManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // Добавление новой категории
  const addCategory = () => {
    const newCategory: Category = {
      id: Date.now(),
      name: newCategoryName,
      tasks: [],
    };
    setCategories([...categories, newCategory]);
    setNewCategoryName('');
  };

  // Удаление категории
  const removeCategory = (id: number) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  // Добавление новой задачи в выбранную категорию
  const addTask = () => {
    if (selectedCategoryId !== null) {
      const updatedCategories = categories.map(category => {
        if (category.id === selectedCategoryId) {
          const newTask: Task = {
            id: Date.now(),
            title: newTaskTitle,
            completed: false,
          };
          return { ...category, tasks: [...category.tasks, newTask] };
        }
        return category;
      });
      setCategories(updatedCategories);
      setNewTaskTitle('');
    }
  };

  // Изменение статуса завершенности задачи
  const toggleTaskCompletion = (categoryId: number, taskId: number) => {
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        const updatedTasks = category.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        return { ...category, tasks: updatedTasks };
      }
      return category;
    }));
  };

  return (
    <div className="task-manager">
      <h2>Task Manager</h2>

      <input
        type="text"
        value={newCategoryName}
        placeholder="New category name"
        onChange={(e) => setNewCategoryName(e.target.value)}
      />
      <button onClick={addCategory}>Add Category</button>

      {categories.map(category => (
        <div key={category.id} className="category">
            <h3>
            {category.name} 
            <button className="delete-category" onClick={() => removeCategory(category.id)}>Delete</button>
            </h3>
            <ul className="tasks-list">
            {category.tasks.map(task => (
                <li key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
                <input
                    className="task-checkbox"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(category.id, task.id)}
                />
                <span>{task.title}</span> {/* Отображение названия задачи */}
                </li>
            ))}
            </ul>
        </div>
        ))}


      <select onChange={(e) => setSelectedCategoryId(Number(e.target.value))} defaultValue="">
        <option value="" disabled>Select Category</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>

      <input
        type="text"
        value={newTaskTitle}
        placeholder="New task title"
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default TaskManager;
