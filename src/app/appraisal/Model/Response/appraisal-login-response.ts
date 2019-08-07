export interface AppraisalLoginResponse {
  deptID: number;
  deptName: string;
  designationID: number;
  description: string;
  id: number;
  fullName:string;
  goalSettingByLeadStatus:string;
  hrAssesmentStatus: string;
  hrInitiateFormStatus: string;
  leadAssesmentStatus:  string;
  selfAssesmentStatus:  string;
  year:number;
  cycle:string;
  isLogin:number
}

export interface Roles{
  id: number;
  role: string;
}
