import userImg from '@/assets/images/avatar.jpg';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Sheet,
  StatusBox,
} from '@/shared/components';
import { useMobile } from '@/shared/hooks';
import { currencyFormatter } from '@/shared/utils';
import { returnStatus } from '@/shared/utils/helpers';
import {
  CheckmarkCircle02Icon,
  Delete02Icon,
  ReloadIcon,
  UnavailableIcon,
} from 'hugeicons-react';
import type { AgentDTO } from '../../columns/agentColumns';
import { useAgentDetails } from '../../hooks';
import {
  ActivateAgentDialog,
  DeactivateAgentDialog,
  DeleteAgentDialog,
} from './dialogs';

type AgentDetailsProps = {
  agent: AgentDTO;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AgentDetails = ({
  agent,
  isOpen,
  setIsOpen,
}: AgentDetailsProps) => {
  const { isMobile } = useMobile();

  const {
    isActivateDialogOpen,
    isDeactivateDialogOpen,
    isDeleteDialogOpen,
    handleActivate,
    handleDeactivate,
    handleDelete,
    handleResendInvite,
    handleViewAgentListedUnits,
    setIsActivateDialogOpen,
    setIsDeactivateDialogOpen,
    setIsDeleteDialogOpen,
  } = useAgentDetails(agent);

  const { bgColor, textColor, fillColor } = returnStatus(agent?.status);

  const Content = (
    <div className="space-y-6 lg:space-y-8 pt-10 px-6 pb-6">
      {/* Agent Details Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-heading-3-semibold text-neutral-600">
            Agent Details
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Avatar className="size-20">
            <AvatarImage className="object-cover" src={userImg} />
            <AvatarFallback className="text-heading-3">
              {agent.agentName.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex gap-1">
              <h3 className="text-heading-4 text-black-500">
                {agent.agentName}
              </h3>
              <StatusBox
                bgColor={bgColor}
                textColor={textColor}
                text={agent.status}
                fillColor={fillColor}
              />
            </div>
            <p className="text-body-small text-black-300">{agent.agentEmail}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {agent.status === 'active' && (
          <Button
            variant="outline"
            onClick={() => setIsDeactivateDialogOpen(true)}
            className={isMobile ? 'w-full' : ''}
          >
            <UnavailableIcon />
            Deactivate agent
          </Button>
        )}
        {agent.status === 'inactive' && (
          <Button
            variant="outline"
            onClick={() => setIsActivateDialogOpen(true)}
            className={isMobile ? 'w-full' : ''}
          >
            <CheckmarkCircle02Icon />
            Activate agent
          </Button>
        )}
        {agent.status === 'pending' && (
          <>
            <Button
              variant="outline"
              onClick={handleResendInvite}
              className={isMobile ? 'flex-1' : ''}
            >
              <ReloadIcon />
              Resend invite
            </Button>
            <Button
              variant="danger-ghost"
              onClick={() => setIsDeleteDialogOpen(true)}
              className={isMobile ? 'flex-1' : ''}
            >
              <Delete02Icon />
              Delete agent
            </Button>
          </>
        )}
      </div>

      {/* User Details Section */}
      <div className="border border-custom-gray-100 rounded-[8px] p-4 space-y-6">
        <h4 className="text-body text-black-500">User details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-body-xs text-black-400">First name</p>
            <p className="text-body text-black-500">
              {agent.agentName.split(' ')[0]}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-body-xs text-black-400">Last name</p>
            <p className="text-body text-black-500">
              {agent.agentName.split(' ')[1] || '-'}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-body-xs text-black-400">Email address</p>
            <p className="text-body text-black-500">{agent.agentEmail}</p>
          </div>
          <div className="space-y-1">
            <p className="text-body-xs text-black-400">Phone number</p>
            <p className="text-body text-black-500">-</p>
          </div>
        </div>
      </div>

      {/* Listing Details Section */}
      <div className="border border-custom-gray-100 rounded-[8px] p-4 space-y-6">
        <h4 className="text-body text-black-500">Listing details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-body-xs text-black-400">Listed units</p>
            <div className="flex items-center gap-2">
              <p className="text-body text-black-500">
                {agent.listedUnits}
                {'   '}
                {agent.listedUnits > 0 && (
                  <span
                    onClick={handleViewAgentListedUnits}
                    className="text-red-400 underline cursor-pointer"
                  >
                    view units
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-body-xs text-black-400">Total earned</p>
            <p className="text-body text-black-500">
              {currencyFormatter.format(agent.amountEarned, false)}
            </p>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <DeactivateAgentDialog
        isOpen={isDeactivateDialogOpen}
        setIsOpen={setIsDeactivateDialogOpen}
        handleDeactivate={handleDeactivate}
        isLoading={false}
      />
      <ActivateAgentDialog
        isOpen={isActivateDialogOpen}
        setIsOpen={setIsActivateDialogOpen}
        handleActivate={handleActivate}
        isLoading={false}
      />
      <DeleteAgentDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        handleDelete={handleDelete}
        isLoading={false}
      />
    </div>
  );

  return (
    <Sheet
      open={isOpen}
      onOpenChange={setIsOpen}
      children={Content}
      side={isMobile ? 'bottom' : 'right'}
      className="max-w-full lg:max-w-xl"
    />
  );
};
