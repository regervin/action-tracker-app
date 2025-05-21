import React, { useState } from 'react';
import ActionList from './components/ActionList';
import HeaderForm from './components/HeaderForm';
import { ActionItem, FormHeader } from './types';

const App: React.FC = () => {
  const [actions, setActions] = useState<ActionItem[]>([]);
  const [header, setHeader] = useState<FormHeader>({
    department: '',
    responsiblePerson: '',
    date: ''
  });

  const addAction = (action: ActionItem) => {
    setActions([...actions, action]);
  };

  const deleteAction = (id: string) => {
    setActions(actions.filter(action => action.id !== id));
  };

  const updateAction = (updatedAction: ActionItem) => {
    setActions(actions.map(action => 
      action.id === updatedAction.id ? updatedAction : action
    ));
  };

  const toggleComplete = (id: string) => {
    setActions(actions.map(action => 
      action.id === id 
        ? { ...action, completed: !action.completed }
        : action
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Action Item Tracker</h1>
        <HeaderForm header={header} setHeader={setHeader} />
        <ActionList 
          actions={actions} 
          onAdd={addAction}
          onDelete={deleteAction}
          onUpdate={updateAction}
          onToggleComplete={toggleComplete}
        />
      </div>
    </div>
  );
}

export default App;
