import { useState } from 'react';
import { agentColumns } from '../../columns';
import type { AgentDTO } from '../../columns/agentColumns';
import { useAddAgent, useAgents } from '../../hooks';
import { AgentDetails } from './AgentDetails';
import { AgentsHeader } from './AgentsHeader';
import { AgentTable } from './AgentTable';

export const Agents = () => {
  const agentsData = useAgents();
  const { setOpenAddAgent } = useAddAgent();
  const [selectedAgent, setSelectedAgent] = useState<AgentDTO | null>(null);
  const [isAgentDetailsOpen, setIsAgentDetailsOpen] = useState(false);

  const handleRowClick = (agent: AgentDTO) => {
    setSelectedAgent(agent);
    setIsAgentDetailsOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <AgentsHeader
        searchTerm={agentsData.searchTerm}
        setSearchTerm={agentsData.setSearchTerm}
        filters={agentsData.filters}
        setFilters={agentsData.setFilters}
        isLoading={agentsData.isLoading}
        isFetching={agentsData.isFetching}
        onAddAgent={() => setOpenAddAgent(true)}
      />

      <AgentTable
        agents={agentsData.agents}
        columns={agentColumns}
        isLoading={agentsData.isLoading}
        isFetching={agentsData.isFetching}
        searchTerm={agentsData.searchTerm}
        reset={agentsData.reset}
        onRowAction={handleRowClick}
      />

      {selectedAgent && (
        <AgentDetails
          agent={selectedAgent}
          isOpen={isAgentDetailsOpen}
          setIsOpen={setIsAgentDetailsOpen}
        />
      )}
    </div>
  );
};
