import React, { ChangeEvent } from 'react';
    import { ActionItem } from '../types';
    import { Trash2 } from 'lucide-react';

    interface ActionRowProps {
      actionItem: ActionItem;
      onActionChange: (id: string, field: keyof ActionItem, value: string | boolean) => void;
      onRemoveAction: (id: string) => void;
      isEven: boolean;
    }

    const ActionRow: React.FC<ActionRowProps> = ({ actionItem, onActionChange, onRemoveAction, isEven }) => {
      const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
          onActionChange(actionItem.id, name as keyof ActionItem, (e.target as HTMLInputElement).checked);
        } else {
          onActionChange(actionItem.id, name as keyof ActionItem, value);
        }
      };

      const rowClasses = `
        ${actionItem.done ? 'bg-green-50' : (isEven ? 'bg-white' : 'bg-slate-50')}
        transition-colors duration-150
      `;
      const textClasses = actionItem.done ? 'line-through text-slate-400' : 'text-slate-700';

      return (
        <tr className={rowClasses}>
          <td className="px-4 py-3 whitespace-nowrap">
            <input
              type="text"
              name="action"
              value={actionItem.action}
              onChange={handleChange}
              placeholder="Task description"
              className={`w-full p-2 border border-transparent rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500 bg-transparent ${textClasses} transition-all duration-150`}
              disabled={actionItem.done}
            />
          </td>
          <td className="px-4 py-3 whitespace-nowrap">
            <textarea
              name="how"
              value={actionItem.how}
              onChange={handleChange}
              placeholder="Steps to accomplish"
              rows={1}
              className={`w-full p-2 border border-transparent rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500 bg-transparent resize-none ${textClasses} transition-all duration-150`}
              disabled={actionItem.done}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = target.scrollHeight + 'px';
              }}
            />
          </td>
          <td className="px-4 py-3 whitespace-nowrap">
            <input
              type="text"
              name="who"
              value={actionItem.who}
              onChange={handleChange}
              placeholder="Person responsible"
              className={`w-full p-2 border border-transparent rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500 bg-transparent ${textClasses} transition-all duration-150`}
              disabled={actionItem.done}
            />
          </td>
          <td className="px-4 py-3 whitespace-nowrap">
            <input
              type="date"
              name="when"
              value={actionItem.when}
              onChange={handleChange}
              className={`w-full p-2 border border-transparent rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500 bg-transparent ${textClasses} transition-all duration-150`}
              disabled={actionItem.done}
            />
          </td>
          <td className="px-4 py-3 text-center">
            <input
              type="checkbox"
              name="done"
              checked={actionItem.done}
              onChange={handleChange}
              className="h-5 w-5 text-sky-600 border-slate-300 rounded focus:ring-sky-500 cursor-pointer"
            />
          </td>
          <td className="px-4 py-3 text-center">
            <button
              onClick={() => onRemoveAction(actionItem.id)}
              className="text-red-500 hover:text-red-700 transition-colors duration-150 p-1 rounded-full hover:bg-red-100"
              aria-label="Remove action"
            >
              <Trash2 size={18} />
            </button>
          </td>
        </tr>
      );
    };

    export default ActionRow;
