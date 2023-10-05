import { gql, useMutation, useLazyQuery } from "@apollo/client";

const mutation_InsertOneUser = gql`
  mutation InsertOneUser($data: UserInsertInput!) {
    insertOneUser(data: $data) {
      _id
    }
  }
`;

const query_searchUserByEmail = gql`
  query User($query: UserQueryInput) {
    user(query: $query) {
      _id
      contact {
        email
      }
    }
  }
`;

export const useValidateEmail = (email) => {
  const [getData, { data, loading, error }] = useLazyQuery(
    query_searchUserByEmail
  );
  const validateEmail = ({
    email,
    onCompleted = () => {},
    onError = () => {},
  }) => {
    getData({
      variables: {
        query: {
          contact: {
            email: email,
          },
        },
      },
      onCompleted: onCompleted,
      onError: onError,
    });
  };
  //validateEmail({onCompleted:()=>{},onError:()=>{}})
  return [validateEmail, { data, loading, error }];
};

export function useNewUserService() {
  const [setMutation, {loading,data,error}] = useMutation(mutation_InsertOneUser);
  const insertNewUser = ({
    user,
    onCompleted = () => {},
    onError = () => {},
  })=>{
    setMutation({
      variables:{
        data: user
      },
      onCompleted: onCompleted,
      onError: onError
    })
  }
  return [insertNewUser,{loading,data,error}]
}

export const userSchema = {
  academic: [],
  contact: {
    email: "",
    socialNetworks: [],
  },
  image: "",
  password: "",
  personal: {
    address: "",
    age: -1,
    dateBirth: null,
    gender: "",
    lastName: "",
    mobile: "",
    name: "",
  },
  publicToken: "",
  skills:{
    collaboration: [],
    soft: [],
    technical: [],
  },
  interest: [],
};

export const userSchemaComplete = {
  data: {
    academic: [
      {
        dateEnd: null,
        dateStart: null,
        degree: {
          description: "",
          name: "",
        },
        description: "",
        schoolName: "",
        studyStatus: {
          course: {
            description: "",
            name: "",
            specialty: "",
          },
          currentSemester: -1,
        },
      },
    ],
    contact: {
      email: "",
      socialNetworks: [
        {
          socialID: "",
          url: "",
        },
      ],
    },
    image: "",
    personal: {
      address: "",
      age: -1,
      dateBirth: null,
      gender: "",
      lastName: "",
      mobile: "",
      name: "",
    },
    publicToken: "",
    skills: {
      collaboration: {
        description: "",
        name: "",
        score: "",
      },
      soft: {
        description: "",
        name: "",
        score: "",
      },
      technical: {
        description: "",
        name: "",
        score: "",
      },
    },
  },
};
