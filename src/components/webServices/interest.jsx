import { gql, useMutation, useQuery } from "@apollo/client";
import DataVerifier from "./tools";

const query_getInterest = gql`
  query QueryInterests {
    interests {
      _id
      area
      concept
      keywords
      vector{
        nature
        social
        formal
      }
      color
    }
  }
`;

const mutation_insertOneInterest = gql`
  mutation Mutation($data: InterestInsertInput!) {
    insertOneInterest(data: $data) {
      _id
    }
  }
`;

export function useGetInterests() {
  const { data, loading, error } = useQuery(query_getInterest);
  console.log(error);
  let interests;
  if (data) {
    if (data.hasOwnProperty("interests")) {
      if (DataVerifier.isValidArray(data.interests)) {
        interests = data.interests;
      } else {
        interests = null;
      }
    }
  }
  return { interests, loading, error };
}

export function useInsertInterests() {
  const [setMutation, { loading, data, error }] = useMutation(
    mutation_insertOneInterest
  );
  const insertNewInterest = ({
    interest,
    onCompleted = () => {},
    onError = () => {},
  }) => {
    setMutation({
      variables: {
        data: interest,
      },
      onCompleted: onCompleted,
      onError: onError,
    });
  };
  return [insertNewInterest, { loading, data, error }];
}

export const INTEREST_SCHEMA = {
  area: "",
  concept: "",
  color: "",
  keywords: [],
  vector: {},
};

export const VECTOR_SCHEMA = {
  formal: 0,
  nature: 0,
  social: 0,
};
