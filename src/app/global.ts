import { HttpHeaders } from '@angular/common/http';

export class Global {
  public API_BASE_URL = 'http://182.75.88.147:8888/';
  public API_APPRAISAL_CONTROLLER_URL = `${this.API_BASE_URL}api/APIAppraisal/`;
  public API_FULL_URL = `${this.API_APPRAISAL_CONTROLLER_URL}`;

  public ROLE_ADMIN = 'Admin';

  /** TOASTER MESSAGE AND TITLES START */
  public TOAST_TITLE_Success = 'Success';
  public TOAST_Appraisal_Process_Initiated = 'Process initiated successfully';
  public TOAST_Appraisal_Process_reInitiated = 'Process reinitiated successfully';
  public TOAST_Appraisal_goal_set = 'goal set successfully';
  /** TOASTER MESSAGE AND TITLES END */

  /** ROLES FOR MANAGER LEVEL START */
  public ROLES_MANAGER = [
    'Lead',
    'Architect',
    'Manager'
  ];
  public ROLES_HR = [
    'HR'
  ];
  /** ROLES FOR MANAGER LEVEL END */

  /** SESSION STORAGE KEYS START */
  public SESSION_LOGGED_IN_USER_INFO = 'user-logged-in';
  public SESSION_USER_INFO = 'user-info';
  public SESSION_USER_details = 'user-details';
  public login_by = 'user-details';
  /** SESSION STORAGE KEYS END */

  /** ROUTES START */
  public ROUTE_APPRAISAL_LISTING = 'Appraisal/Listing';
  public ROUTE_APPRAISAL_FORM = 'Appraisal/Form';
  public ROUTE_APPRAISAL_MANAGER_PAGE = 'Appraisal/Goal';
  /** ROUTES END */

  public HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  /** COLUMN NAMES */
  public COL_DEPARTMENT = 'department';
  public COL_FULL_NAME = 'fullName';
}
