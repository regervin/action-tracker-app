import React from 'react';
    import { ActionItem } from '../types';
    import ActionRow from './ActionRow';

    interface ActionTableProps {
      actions: ActionItem[];
      onActionChange: (id: string, field: keyof ActionItem, value: string | boolean) => void;
      onRemoveAction: (id: string) => void;
    }

    const ActionTable: React.FC<ActionTableProps> = ({ actions, onActionChange, onRemoveAction }) => {
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">How It Will Be Accomplished</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Who Will Accomplish This</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">When</th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Done</th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Remove</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {actions.map((action, index) => (
                <ActionRow
                  key={action.id}
                  actionItem={action}
                  onActionChange={onActionChange}
                  onRemoveAction={onRemoveAction}
                  isEven={index % 2 === 0}
                />
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    export default ActionTable;
