// ! ADD userid to memoery table in SUPABASE
export type TMemory = {
  id: number;
  title: string;
  city: string;
  description: string;
  startDate: Date;
  endDate: Date;
  userId: string;
  stateId: string;
};
