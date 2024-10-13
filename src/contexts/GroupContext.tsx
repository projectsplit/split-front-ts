import React, { createContext, useContext, useState } from 'react';
import { GroupContextType } from '../interfaces';
import { useSignal } from '@preact/signals-react';

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const GroupProvider = ({ children }: any) => {
  const selectedGroupId = useSignal<string >("");

  return (
    <GroupContext.Provider value={{ selectedGroupId }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = () => {
    const context = useContext(GroupContext);
    if (!context) {
      throw new Error('useGroup must be used within a GroupProvider');
    }
    return context; // Now this is guaranteed to be defined
  };