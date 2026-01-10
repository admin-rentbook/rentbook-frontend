import z from 'zod';

export const addAgentSchema = z.object({
  agentEmail: z.email('Please enter a valid email address'),
});
