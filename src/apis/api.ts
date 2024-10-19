import axios, { AxiosError } from "axios";
import { authApi } from "./authApi";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { getAccessToken, setAccessToken } from "../util/accessToken";
import {
  GetGroupResponse,
  GroupsTotalAmountsResponse,
  CreateBudgetRequest,
  Frequency,
  BudgetInfoResponse,
  SpendingInfoResponse,
  GetTotalLentTotalBorrowedResponse,
  CreateFiltersRequest,
  FilterResponse,
} from "../types";
import { signOut } from "../util/signOut";

const apiHttpClient = axios.create({
  baseURL: `${process.env.REACT_APP_APIURL}`,
});

const isAccessTokenDecodableAndNotExpired = (
  accessToken: string | null | undefined
): boolean => {
  if (accessToken) {
    try {
      const decodedToken = jwt_decode<JwtPayload>(accessToken);
      if (decodedToken && decodedToken.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp > currentTime) {
          return true;
        }
      }
    } catch (e) {
      return false;
    }
  }
  return false;
};

apiHttpClient.interceptors.request.use(
  async (request: any) => {
    const accessToken = getAccessToken();
    if (isAccessTokenDecodableAndNotExpired(accessToken)) {
      request.headers.Authorization = `Bearer ${accessToken}`;
      return request;
    }
    try {
      const { accessToken } = await authApi.refreshAccessToken();
      setAccessToken(accessToken);
      request.headers.Authorization = `Bearer ${accessToken}`;
      return request;
    } catch (e) {
      signOut();
    }
  },
  (error: AxiosError) => Promise.reject(error)
);

const getGroupById = async (groupId: string) => {
  const response = await apiHttpClient.get<GetGroupResponse>(`/group/get`, {
    params: { id: groupId },
  });
  return response.data;
};

const getUserGroups = async (
  limit: number,
  { pageParam = new Date().toISOString() }
) => {
  const response = await apiHttpClient.get<any>( //create type for this Fn
    `/group/getusergroups?last=${pageParam}&limit=${limit}`
  );
  return response.data;
};

const getGroupTransactions = async (
  limit: number,
  groupId: string,
  { pageParam = new Date().toISOString() }
) => {
  const response = await apiHttpClient.get<any>( //create type for this Fn
    `/group/getgrouptransactions?last=${pageParam}&limit=${limit}&groupId=${groupId}`
  );
  return response.data;
};

const getBudgetInfo = async (): Promise<BudgetInfoResponse> => {
  const response = await apiHttpClient.get<BudgetInfoResponse>(
    `/budget/budgetinfo`
  );
  return response.data;
};

const getSpendingInfo = async (
  budgetType: Frequency,
  currency: string
): Promise<SpendingInfoResponse> => {
  const response = await apiHttpClient.get<SpendingInfoResponse>(
    `/budget/spendinginfo?budgettype=${budgetType}&currency=${currency}`
  );
  return response.data;
};

const getCumulativeSpendingArray = async (
  startDate: string,
  endDate: string,
  currency: string
): Promise<number[]> => {
  const response = await apiHttpClient.get<number[]>(
    `/analytics/cumulativespending?startDate=${startDate}&endDate=${endDate}&currency=${currency}`
  );
  return response.data;
};

const getGroupFilters = async (groupId: string): Promise<FilterResponse> => {
  const response = await apiHttpClient.get<FilterResponse>(
    `/filters/getfilters?groupId=${groupId}`
  );
  return response.data;
};

const getTotalLentBorrowedArrays = async (
  startDate: string,
  endDate: string,
  currency: string
): Promise<GetTotalLentTotalBorrowedResponse> => {
  const response = await apiHttpClient.get<GetTotalLentTotalBorrowedResponse>(
    `/analytics/totallentborrowed?startDate=${startDate}&endDate=${endDate}&currency=${currency}`
  );
  return response.data;
};

const getGroupsTotalAmounts = async () => {
  const response = await apiHttpClient.get<GroupsTotalAmountsResponse>(
    `/group/total-amounts`
  );
  return response.data;
};

const createBudget = async (request: CreateBudgetRequest) => {
  const response = await apiHttpClient.post<CreateBudgetRequest>(
    `/budget/create`,
    request
  );
  return response.data;
};

const submitFilters = async (request: CreateFiltersRequest) => {
  const response = await apiHttpClient.post<CreateFiltersRequest>(
    `/filters/create`,
    request
  );
 
  return response.data;
};

const deleteBudget = async () => {
  const response = await apiHttpClient.post(`/budget/delete`);
  return response.data;
};

export const api = {
  getGroupById,
  getUserGroups,
  getGroupsTotalAmounts,
  getBudgetInfo,
  getSpendingInfo,
  createBudget,
  deleteBudget,
  getCumulativeSpendingArray,
  getTotalLentBorrowedArrays,
  getGroupTransactions,
  submitFilters,
  getGroupFilters
};
