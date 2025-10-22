import { AxiosResponse } from "axios";

export const sharedState = {
    name: undefined as string | undefined,
    country: undefined as string | undefined,
    responseData: undefined as AxiosResponse | undefined,
    names: [] as string[],    
};
