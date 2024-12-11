export interface IStep {
  id: number,
  title: string,
  description: string
}

export type TStepStatus = 'in progress' | 'pending' | 'completed';

export interface IPaymentData {
  method: string,
  step_1: TStepStatus,
  step_2: TStepStatus,
  step_3: TStepStatus,
  step_4: TStepStatus,
  step_5: TStepStatus,
}