import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
    import { PlusCircle, Trash2, Edit3, Save, CalendarDays, User, Building } from 'lucide-react';
    import { ActionItem, AppData } from './types';
    import ActionTable from './components/ActionTable';

    const LOCAL_STORAGE_KEY = 'actionListAppData';

    function App() {
      const [isMounted, setIsMounted] = useState(false);
      const [department, setDepartment] = useState('');
      const [responsiblePerson, setResponsiblePerson] = useState('');
      const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
      const [actions, setActions] = useState<ActionItem[]>([]);

      // Load data from local storage on mount
      useEffect(() => {
        setIsMounted(true);
        const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedData) {
          const parsedData: AppData = JSON.parse(storedData);
          setDepartment(parsedData.department || '');
          setResponsiblePerson(parsedData.responsiblePerson || '');
          setDate(parsedData.date || new Date().toISOString().split('T')[0]);
          setActions(parsedData.actions || []);
        }
      }, []);

      // Save data to local storage whenever it changes
      useEffect(() => {
        if (!isMounted) return; // Don't save on initial hydration before loading from localStorage
        const appData: AppData = {
          department,
          responsiblePerson,
          date,
          actions,
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appData));
      }, [department, responsiblePerson, date, actions, isMounted]);

      const handleAddAction = () => {
        setActions([
          ...actions,
          {
            id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
            action: '',
            how: '',
            who: '',
            when: new Date().toISOString().split('T')[0],
            done: false,
          },
        ]);
      };

      const handleRemoveAction = (id: string) => {
        setActions(actions.filter((action) => action.id !== id));
      };

      const handleActionChange = (id: string, field: keyof ActionItem, value: string | boolean) => {
        setActions(
          actions.map((action) =>
            action.id === id ? { ...action, [field]: value } : action
          )
        );
      };
      
      const handleClearAll = () => {
        if (window.confirm("Are you sure you want to clear all data? This cannot be undone.")) {
          setDepartment('');
          setResponsiblePerson('');
          setDate(new Date().toISOString().split('T')[0]);
          setActions([]);
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      };

      return (
        <div className="min-h-screen bg-slate-100 text-slate-800 p-4 sm:p-6 lg:p-8 font-sans">
          <div className="max-w-5xl mx-auto">
            <header className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-sky-700 mb-2">Action List Manager</h1>
              <p className="text-slate-600">Track your team's tasks efficiently and effectively.</p>
            </header>

            <section className="bg-white shadow-xl rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-sky-600 mb-6 border-b pb-3">Project Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-slate-700 mb-1">
                    <Building size={16} className="inline mr-2 text-sky-600" />Department Name
                  </label>
                  <input
                    type="text"
                    id="department"
                    value={department}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDepartment(e.target.value)}
                    placeholder="e.g., Marketing"
                    className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                  />
                </div>
                <div>
                  <label htmlFor="responsiblePerson" className="block text-sm font-medium text-slate-700 mb-1">
                    <User size={16} className="inline mr-2 text-sky-600" />Responsible Person
                  </label>
                  <input
                    type="text"
                    id="responsiblePerson"
                    value={responsiblePerson}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setResponsiblePerson(e.target.value)}
                    placeholder="e.g., Jane Doe"
                    className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">
                    <CalendarDays size={16} className="inline mr-2 text-sky-600" />Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                  />
                </div>
              </div>
            </section>

            <section className="bg-white shadow-xl rounded-lg p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-3 border-b">
                <h2 className="text-2xl font-semibold text-sky-600 mb-4 sm:mb-0">Action Items</h2>
                <button
                  onClick={handleAddAction}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-150 flex items-center"
                >
                  <PlusCircle size={20} className="mr-2" /> Add Action
                </button>
              </div>
              
              {actions.length === 0 ? (
                <p className="text-center text-slate-500 py-8">
                  No actions added yet. Click "Add Action" to get started.
                </p>
              ) : (
                <ActionTable
                  actions={actions}
                  onActionChange={handleActionChange}
                  onRemoveAction={handleRemoveAction}
                />
              )}
            </section>
            
            {isMounted && (department || responsiblePerson || actions.length > 0) && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleClearAll}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-150 flex items-center mx-auto"
                >
                  <Trash2 size={20} className="mr-2" /> Clear All Data
                </button>
              </div>
            )}
            
            <footer className="mt-12 text-center text-sm text-slate-500">
              <p>&copy; {new Date().getFullYear()} Action List Manager. Built with React & Tailwind CSS.</p>
              <p>Powered by xBesh Labs, LLC.</p>
            </footer>
          </div>
        </div>
      );
    }

    export default App;
