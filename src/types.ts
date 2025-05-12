export interface ActionItem {
      id: string;
      action: string;
      how: string;
      who: string;
      when: string;
      done: boolean;
    }

    export interface AppData {
      department: string;
      responsiblePerson: string;
      date: string;
      actions: ActionItem[];
    }
