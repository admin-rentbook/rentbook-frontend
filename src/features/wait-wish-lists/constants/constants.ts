export const MyInterestLinks = {
  MY_INTERESTS: '/my-interests',
} as const;
export type MyInterestsLinkType =
  (typeof MyInterestLinks)[keyof typeof MyInterestLinks];
