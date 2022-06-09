
export interface Application {
    applicationNumber: number;
    applicationType : string;
    amount : number;
    status: string;
    applicants: Applicant[];
  }
export interface Applicant {
    name: string;
    identificationTypes: string[];
    gender: string;
  
  }