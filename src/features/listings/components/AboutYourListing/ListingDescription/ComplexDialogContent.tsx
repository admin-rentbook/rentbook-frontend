import { ArrowLeft01Icon, Cancel01Icon } from 'hugeicons-react';
import type { UseFormReturn } from 'react-hook-form';
import type { ComplexDTO } from '../../../types';
import type { ComplexState } from '../../../hooks/useComplex';
import { AddToComplexContent } from './AddToComplexContent';
import { CreateComplexContent } from './CreateComplexContent';

type ComplexDialogContentProps = {
  complexState: ComplexState;
  setComplexState: (state: ComplexState) => void;
  onClose: () => void;
  complexItems?: ComplexDTO[];
  onComplexClick: (complexId: number, complexName: string) => void;
  formComplex: UseFormReturn<{ complexName: string }>;
  onComplexSubmit: (data: { complexName: string }) => void;
  isComplexBtnDisabled: boolean;
  isLoading: boolean;
  isLoadingComplexes?: boolean;
};

export const ComplexDialogContent = ({
  complexState,
  setComplexState,
  onClose,
  complexItems,
  onComplexClick,
  formComplex,
  onComplexSubmit,
  isComplexBtnDisabled,
  isLoading,
  isLoadingComplexes = false,
}: ComplexDialogContentProps) => {
  return (
    <div className="flex flex-col p-6 gap-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {complexState === 'CREATE_COMPLEX' && (
            <button
              onClick={() => setComplexState('ADD_TO_COMPLEX')}
              className="hover:opacity-70 transition-opacity"
            >
              <ArrowLeft01Icon className="size-5" />
            </button>
          )}
          <h1 className="text-heading-5 text-black-500">
            {complexState === 'ADD_TO_COMPLEX'
              ? 'Add to Complex'
              : 'Create Complex'}
          </h1>
        </div>

        <button
          onClick={onClose}
          className="hover:opacity-70 transition-opacity"
        >
          <Cancel01Icon className="size-6 text-black-400" />
        </button>
      </div>

      {complexState === 'ADD_TO_COMPLEX' ? (
        <AddToComplexContent
          complexItems={complexItems}
          onComplexClick={onComplexClick}
          onCreateNew={() => setComplexState('CREATE_COMPLEX')}
          onClose={onClose}
          isLoading={isLoadingComplexes}
        />
      ) : (
        <CreateComplexContent
          form={formComplex}
          onSubmit={onComplexSubmit}
          onClose={onClose}
          isDisabled={isComplexBtnDisabled}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
