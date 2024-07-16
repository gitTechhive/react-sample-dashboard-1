
import Login from '../pages/auth/Login/Login';
/**
 * Enum for status values.
 */
export const ENUMFORSTATUS = {
  PENDING: "Pending",
  INPROGRESS: "Inprogress",
  COMPLETED: "Completed",
  INCOMPLETE: "Incomplete",
} as const;

/**
 * Enum for stone master tab names.
 */
export const ENUMFORSTONEMASTERTAB = {
  LOTSIZE: "LOTSIZE",
  ARTICLE: "ARTICLE",
  SIEVES: "SIEVES",

}


/**
 * Enum for route paths.
 */
export const ENUMFORROUTES = {

  DASHBOARD: "/dashboard",
  REPORTS: "/reports",
  LOGIN: "/login",
  ACCESS_DENIED: "/access-denied",
  USER_MANGEMNET: "/user-mangemnet",
  FORGOT_PASSWORD: "/forgot-password",
  SIGN_UP: "/sign-up",
  SETTINGS: "/settings",

}



/**
 * Enum for account tab names.
 */
export const ENUMFORACCOUNTTAB = {
  PERSONAL_DETAILS: "Personal Details",
  UPDATE_PASSWORD: "Update Password"

} as const;

/**
 * Enum for Login tab names.
 */
export const ENUMFORLOGINTAB = {
  EMAIL: "email",
  MOBILE_NO: "mobile no",
  VERIFY_OTP: "Verify Otp"

} as const;
/**
 * Enum for Login tab names.
 */
export const ENUMFORFORGOTPASSWORDSTEP = {
  EMAIL: "email",
  VERIFY_OTP: "verify otp",
  CHANGE_PASSWORD: "change Password",
  CHANGED_COMPLETED: "changed completed"

} as const;
/**
 * Enum for Sign up step names.
 */
export const ENUMFORSIGNUPSTEP = {
  USER_DETAILS: "User Details",
  VERIFY_OTP: "Verify Otp"

} as const;
/**
 * Enum for Sign/Login up Option names.
 */
export const ENUMFORSIGNUPORLOGINOPTION = {
  GOOGLE: "google",
  EMAIL: "email",
  MOBILE_NO: "mobile no"

} as const;
/**
 * Response wrapper data transfer object interface.
 */
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
/**
 * Page request interface.
 */
export interface PageRequest {
  pageNo: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: string;
  searchText?: string;
  ids?: any;
}
/**
 * Common props interface.
 */
export interface CommonProps {
  className: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  searchTxt: string | undefined;
  value: string | number | readonly string[] | undefined;
}
/**
 * Modal context props interface.
 */
export interface ModalContextProps {
  modal: boolean;
  handleModal: (content?: any, value?: any, dismissModal?: boolean) => void;
  modalContent: any;
  modalValue: any;
}
/**
 * Routes list interface.
 */
export interface RoutesList {
  path: string; // the url
  icon: JSX.Element;
  name: string; // name that appear in Sidebar
  exact: boolean;
}
/**
 * Pagination props interface.
 */
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
/**
 * Button props interface.
 */
export interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  text?: any;
  disabled?: any;
  icon?: JSX.Element;
  children?: any;
}

/**
 * Router props interface.
 */
export interface RouterProps {
  component?: any;
  path: string;
  caseSensitive?: boolean;
  accessType?: any;
  url?: any;
}

/**
 * Dropdown list format interface.
 */
export interface DropdownListFormat {
  label: string;
  value: any;
  sub?: Array<DropdownListFormat>;
  other?: any;
}
/**
 * Page interface.
 */
export interface Page {
  pageUrl: string;
  id: number;
  pageCode: string;
  status: number;
  accessType: string;
}
/**
 * Notification interface.
 */
export interface Notification {
  id: any;
  notificationType: string;
  isNotification: boolean;
}
/**
 * Login data interface.
 */
export interface LoginData {
  email?: string;
  password?: string;
  type?: string;
  googleId?: string;
  uuid?: string;
  phoneNo?: any;
  otp?: any;
  countryCode?: any;
  hiddenCaptcha?: any;
}
/**
 * SignUpData interface.
 */
export interface SignUpData {
  firstName: string;
  lastName: string;
  countryCode: string;
  email: string;
  mobileNo: string;
  uuid?: string;
  otp?: string;
  requestId?: string;
  hiddenCaptcha?: string;

}
/**
 * Forgot Password data interface.
 */
export interface ForgotPasswordData {
  email: string;
  otp?: string;
  password: string;
  confirmPassword?: string;

}

/**
 * Forgot Password data interface.
 */
export interface UserDataInterface {

  firstName: string,
  lastName: string,
  address: string,
  pinCode?: string,
  mobileNo: string,
  bio?: string,
  email: string,
  phonecode?: string,
  country_id?: string,
  state_id?: string,
  cities_id?: string,
  original_name?: string,
  profilePicUrl?: string,
  country?: string,
  state?: string,
  cities?: string,
  profilePic?: any

}


export const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
];
