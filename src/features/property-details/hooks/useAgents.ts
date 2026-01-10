import { useMemo, useState } from 'react';
import type { AgentDTO } from '../columns/agentColumns';
import type { AgentFilters } from '../types';

// Sample agent data - TODO: Replace with actual API call
const sampleAgents: AgentDTO[] = [
  {
    id: 1,
    agentName: 'Rewaldo Sam',
    agentEmail: 'rewaldo.sam@example.com',
    agentAvatar: undefined,
    listedUnits: 4,
    amountEarned: 2500,
    dateCreated: '2024-01-15T10:30:00Z',
    status: 'active',
  },
  {
    id: 2,
    agentName: 'Jane Cooper',
    agentEmail: 'jane.cooper@example.com',
    agentAvatar: undefined,
    listedUnits: 7,
    amountEarned: 4800,
    dateCreated: '2024-02-20T14:15:00Z',
    status: 'active',
  },
  {
    id: 3,
    agentName: 'Michael Chen',
    agentEmail: 'michael.chen@example.com',
    agentAvatar: undefined,
    listedUnits: 2,
    amountEarned: 1200,
    dateCreated: '2024-03-10T09:45:00Z',
    status: 'pending',
  },
  {
    id: 4,
    agentName: 'Sarah Johnson',
    agentEmail: 'sarah.johnson@example.com',
    agentAvatar: undefined,
    listedUnits: 0,
    amountEarned: 0,
    dateCreated: '2024-03-25T16:20:00Z',
    status: 'inactive',
  },
  {
    id: 5,
    agentName: 'David Martinez',
    agentEmail: 'david.martinez@example.com',
    agentAvatar: undefined,
    listedUnits: 5,
    amountEarned: 3200,
    dateCreated: '2024-01-08T11:00:00Z',
    status: 'active',
  },
];


export const useAgents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<AgentFilters>({
    status: null,
  });

  // Filter and search logic
  const filteredAgents = useMemo(() => {
    let result = [...sampleAgents];

    // Apply status filter
    if (filters.status) {
      result = result.filter((agent) => agent.status === filters.status);
    }

    // Apply search filter
    if (searchTerm) {
      result = result.filter((agent) =>
        agent.agentName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return result;
  }, [searchTerm, filters]);

  const reset = () => {
    setSearchTerm('');
    setFilters({ status: null });
  };

  // Mock loading states - TODO: Replace with actual API loading states
  const isLoading = false;
  const isFetching = false;

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    agents: filteredAgents,
    reset,
    isLoading,
    isFetching,
  };
};
