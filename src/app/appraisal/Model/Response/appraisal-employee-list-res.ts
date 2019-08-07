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
    hrAssesmentStatus: string;
    goalsettingByLeadStatus: string;
    hrinitiateFormStatus: string;
    selfAssesmentStatus: string;
    leadAssesmentStatus: string;
    managerName: string;
    departmentHead:string;
    year:number;
    cycle:string;
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
export interface EmpDetail{
    id: number;
    emp_Id: string;
    emp_Code: string;
    fullName: string;
    officialEmail: string;
   
}
export interface AppraisalEmpGoalRes{
    id: number;
    description: string;
    isActive: boolean;
}

export interface AppraisalEmpformdetailRes{
    id: number;
    description: string;
    ratings: string;
    comments: string;
    ambitions:string;
    summarize: string,
    areaImproveSelf:string,
    actionPlanImproveSelf:string,
    isActive: boolean;
   
}

export interface AppraisalEmpGoalRatingComments{
    id: number;
    ratings: string;
    comments :string;
    isActive: boolean;
}

export interface AppraisalmanagerGoalRatingComments{
    id: number;
    ratings: string;
    comments :string;
    commentManager:string;
    ratingManager:string;
    isActive: boolean;
}