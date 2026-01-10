import { useAgentListings } from '../../hooks/useAgentListings';
import { AgentListingsHeader } from './AgentListingsHeader';
import { AgentListingTable } from './AgentListingTable';

export const AgentListings = () => {
  const agentListingsData = useAgentListings();

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-heading-3 text-black-500">Agent Listings</h2>
        <p className="text-body-small text-black-400">
          View all listings managed by this agent
        </p>
      </div>

      <AgentListingsHeader
        {...agentListingsData}
        isLoading={agentListingsData.isLoading}
        isFetching={agentListingsData.isFetching}
      />

      <AgentListingTable
        {...agentListingsData}
        listingDescription={agentListingsData.listingData?.data || []}
        isLoading={agentListingsData.isLoading}
        isFetching={agentListingsData.isFetching}
        isError={agentListingsData.isError}
        error={agentListingsData.error}
      />
    </div>
  );
};
