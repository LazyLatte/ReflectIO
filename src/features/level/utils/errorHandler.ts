import { RefObject } from "react";
import { isAxiosError } from "axios";
import { ReLoginModalHandle } from "@features/authentication";
export const requestErrorHandler = (error: unknown, reLoginModalRef: RefObject<ReLoginModalHandle>) => {
    if(isAxiosError(error)){
      switch(error.response?.status){
        case 401:
            reLoginModalRef.current?.open();
          break;
        default:
          console.error(error);
          break;
      }
    }
}