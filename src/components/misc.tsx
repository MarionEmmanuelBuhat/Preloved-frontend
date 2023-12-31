export interface User {
  email: string;
  type: UserType;
  user_id: number;
  shop_owner_id: number | undefined;
  verified: number | undefined;
}

export enum UserType {
  User,
  Seller,
  Admin,
  UnverifiedSeller,
  CompletedSeller,
}

const domain = "https://prelovedbackend.azurewebsites.net/";
const storeApi = "store/";

export const LINK_LOGIN = "https://prelovedbackend.azurewebsites.net/auth/login";
export const LINK_LOGOUT = "https://prelovedbackend.azurewebsites.net/auth/logout";
export const LINK_SIGNUP_USER =
  "https://prelovedbackend.azurewebsites.net/auth/new_shop_user";
export const LINK_SIGNUP_SELLER =
  "https://prelovedbackend.azurewebsites.net/auth/new_shop_owner";
export const LINK_IS_AUTH =
  "https://prelovedbackend.azurewebsites.net/auth/is_authenticated";
export const LINK_GET_CURRENT_USER =
  "https://prelovedbackend.azurewebsites.net/auth/get_current_user";
export const LINK_GET_PENDING_LIST =
  "https://prelovedbackend.azurewebsites.net/auth/verification/get_list_pending";
export const LINK_GET_SELLER_STATUS =
  "https://prelovedbackend.azurewebsites.net/auth/verification/document_status";
export const LINK_SHOP_ID1 = "https://prelovedbackend.azurewebsites.net/auth/shop_id_one";
export const LINK_SHOP_ID2 = "https://prelovedbackend.azurewebsites.net/auth/shop_id_two";
export const LINK_SHOP_IDSELFIE =
  "https://prelovedbackend.azurewebsites.net/auth/shop_id_selfie";
export const LINK_GET_SELLER_DETAILS =
  "https://prelovedbackend.azurewebsites.net/auth/verification/get_shop_owner_details";
export const LINK_GET_SHOPVERIFICATION_IMAGE =
  "https://prelovedbackend.azurewebsites.net/auth/verification/get_image";
export const LINK_APPROVE_OR_REJECT =
  "https://prelovedbackend.azurewebsites.net/auth/verification/approve_or_reject";
export const LINK_CREATE_SHOP = domain + storeApi + "create_new_shop";
export const LINK_GET_ALL_TAGS = domain + storeApi + "get_all_tags";
export const LINK_ADD_ITEM = domain + storeApi + "add_item";
export const LINK_ATTACH_PHOTO_ITEM = domain + storeApi + "add_img_item";
export const LINK_GET_STORES = domain + storeApi + "stores";
