interface CredentialResponse {
  credential?: string;
  select_by?: string;
  clientId?: string;
}

interface IdConfiguration {
  client_id: string;
  callback: (response: CredentialResponse) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
}

interface PromptMomentNotification {
  isDisplayMoment: () => boolean;
  isDisplayed: () => boolean;
  isNotDisplayed: () => boolean;
  getNotDisplayedReason: () => string;
  isSkippedMoment: () => boolean;
  getSkippedReason: () => string;
  isDismissedMoment: () => boolean;
  getDismissedReason: () => string;
  getMomentType: () => string;
}

interface Window {
  google?: {
    accounts: {
      id: {
        initialize: (config: IdConfiguration) => void;
        prompt: (
          momentListener?: (notification: PromptMomentNotification) => void
        ) => void;
        renderButton: (parent: HTMLElement, options: any) => void;
        disableAutoSelect: () => void;
        cancel: () => void;
      };
    };
  };
}
