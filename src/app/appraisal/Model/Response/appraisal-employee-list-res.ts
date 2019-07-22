export interface AppraisalEmployeeListRes {

}
export interface AppraisalEmpRes{
    id: number;
    emp_Id: string;
    emp_Code: string;
    fName: string;
    fullName: string;
    officialEmail: string;
    mobile: string;
    dob: string;
    department: string;
    permanentAddress: string;
    designation: string;
    bloodGroup: string;
    grade: string;
    doj: string;
    lName: string;
    confirmationStatus: string;
    appraisalStatus: string;
    HrAssesmentStatus: string;
    GoalsettingByLeadStatus: string;
    HrinitiateFormStatus: string;
    SelfAssesmentStatus: string;
    LeadAssesmentStatus: string;
    managerName: string;
    departmentHead:string;
}

export interface EmpDetailRes{
    id: number;
    emp_Id: string;
    emp_Code: string;
    fullName: string;
    officialEmail: string;
    mobile: string;
    dob: string;
    department: string;
    permanentAddress: string;
    designation: string;
    bloodGroup: string;
    grade: string;
    doj: string;
    reportingTo:string;  
    evaluationStartDate:string;
    evaluationEndDate:string;
}

export interface AppraisalEmpGoalRes{
    id: number;
    description: string;
    isActive: boolean;
}