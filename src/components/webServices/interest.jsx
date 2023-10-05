import { gql, useMutation, useQuery } from "@apollo/client";
import DataVerifier from "./tools"

const query_getInterest = gql`query QueryInterests {
    interests {
      _id
      area
      concept
      description
    }
  }`

export function useGetInterests(){
    const {data,loading,error} = useQuery(query_getInterest)
    let interests
    if(data){
        if(data.hasOwnProperty('interests')){
            if (DataVerifier.isValidArray(data.interests)) {
                interests = data.interests
            }else{
                interests = null
            }
        }
    }
    return {interests,loading,error}
}