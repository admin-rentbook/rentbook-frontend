import { useNavigate, useSearch } from '@tanstack/react-router';
import { useState } from 'react';
import type { AgentDTO } from '../columns';
import { PropertyDetailsLinks } from '../constants';

export const useAgentDetails = (agent: AgentDTO) => {
  const navigate = useNavigate();
  const { propertyId } = useSearch({
    from: PropertyDetailsLinks.PROPERTY_DETAILS,
  });

  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);
  const [isActivateDialogOpen, setIsActivateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeactivate = async () => {
    // TODO: Implement deactivate agent API call
    console.log('Deactivating agent:', agent.id);
    setIsDeactivateDialogOpen(false);
  };

  const handleActivate = async () => {
    // TODO: Implement activate agent API call
    console.log('Activating agent:', agent.id);
    setIsActivateDialogOpen(false);
  };

  const handleDelete = async () => {
    // TODO: Implement delete agent API call
    console.log('Deleting agent:', agent.id);
    setIsDeleteDialogOpen(false);
  };

  const handleResendInvite = async () => {
    // TODO: Implement resend invite API call
    console.log('Resending invite to agent:', agent.id);
  };

  const handleViewAgentListedUnits = () => {
    navigate({
      to: PropertyDetailsLinks.AGENT_LISTINGS,
      search: {
        propertyId: propertyId,
        agentId: agent.id,
      },
    });
  };

  return {
    isActivateDialogOpen,
    isDeactivateDialogOpen,
    isDeleteDialogOpen,
    setIsActivateDialogOpen,
    setIsDeactivateDialogOpen,
    setIsDeleteDialogOpen,

    handleActivate,
    handleDelete,
    handleResendInvite,
    handleDeactivate,
    handleViewAgentListedUnits,
  };
};
