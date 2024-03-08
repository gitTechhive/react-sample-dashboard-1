
import Login from '../pages/auth/Login/Login';

export const ENUMFORSTATUS = {
  PENDING: "Pending",
  INPROGRESS: "Inprogress",
  COMPLETED: "Completed",
  INCOMPLETE: "Incomplete",
} as const;


export const ENUMFORSTONEMASTERTAB = {
  LOTSIZE: "LOTSIZE",
  ARTICLE: "ARTICLE",
  SIEVES: "SIEVES",

}



export const ENUMFORROUTES = {
 
  DASHBOARD: "/dashboard",
  REPORTS: "/reports",
  LOGIN:"/login",
ACCESS_DENIED:"/access-denied",
USER_MANGEMNET:"/user-mangemnet",

}




export const ENUMFORACCOUNTTAB = {
  PERSONAL_DETAILS: "Personal Details",
  UPDATE_PASSWORD:"Update Password"

} as const;
export interface ResponseWrapperDTO {
  status: string;
  message: string;
  data: any;
  path?: string;
  error: boolean;
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  account?: string;
}

export interface PageRequest {
  pageNo: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: string;
  searchText?: string;
  ids?: any;
}

export interface CommonProps {
  className: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  searchTxt: string | undefined;
  value: string | number | readonly string[] | undefined;
}

export interface ModalContextProps {
  modal: boolean;
  handleModal: (content?: any, value?: any, dismissModal?: boolean) => void;
  modalContent: any;
  modalValue: any;
}

export interface RoutesList {
  path: string; // the url
  icon: JSX.Element;
  name: string; // name that appear in Sidebar
  exact: boolean;
}

export interface PaginationProps {
  onPageChange: any;
  totalCount: number;
  siblingCount?: 1 | undefined;
  currentPage: number;
  pageSize: number;
  className: string;
  onPageSizeChange: any;
  otherHtml?: any;
}

export interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  text?: any;
  disabled?: any;
  icon?: JSX.Element;
  children?: any;
}


export interface RouterProps {
  component?: any;
  path: string;
  caseSensitive?: boolean;
  accessType?: any;
  url?: any;
}


export interface DropdownListFormat {
  label: string;
  value: any;
  sub?: Array<DropdownListFormat>;
  other?: any;
}

export interface Page {
  pageUrl: string;
  id: number;
  pageCode: string;
  status: number;
  accessType: string;
}
export interface Notification {
  id: any;
  notificationType: string;
  isNotification: boolean;
}

export interface LoginData {
  userEmail: string;
  password: string;

}
