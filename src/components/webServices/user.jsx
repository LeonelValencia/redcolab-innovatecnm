import { gql, useMutation, useLazyQuery, useQuery } from "@apollo/client";
import DataVerifier from "./tools";

const mutation_InsertOneUser = gql`
  mutation InsertOneUser($data: UserInsertInput!) {
    insertOneUser(data: $data) {
      _id
    }
  }
`;

const query_getUserById = gql`query ExampleQuery($query: UserQueryInput) {
  user(query: $query) {
    academic {
      dateEnd
      dateStart
      degree {
        name
        key
        description
      }
      description
      schoolId
      schoolName
      studyStatus {
        course {
          description
          code
          name
          specialty
        }
        currentSemester
        studentId
      }
    }
    contact {
      email
      socialNetworks {
        socialID
        url
      }
    }
    image
    interest
    password
    personal {
      address
      age
      dateBirth
      gender
      lastName
      mobile
      name
    }
    skills {
      collaboration {
        description
        name
        score
      }
      soft {
        description
        name
        score
      }
      technical {
        description
        name
        score
      }
      trendInterest {
        formal
        nature
        social
      }
    }
    uiConf {
      color
    }
  }
}
`

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

const query_getAllUsers = gql`query Query($limit: Int) {
  users(limit: $limit) {
    _id
    uiConf {
      color
    }
    personal {
      name
    }
  }
}
`

export const useGetNetworkInUser=()=>{

}

export const useGetUserById = (id="") => {
  const { data, loading, error } = useQuery(
    query_getUserById,{
      variables: {
        query: {
          _id: id
        }
      }
    }
  );
  let user
  if (data) {
    if(DataVerifier.isValidObject(data.user)){
      user = data.user
    }else{
      user = null
    }
  }
  if (error) {
    console.error("query getAllUser: ",error);
  }
  //validateEmail({onCompleted:()=>{},onError:()=>{}})
  return { user, loading, error }
};

export const useGetAllUsers = (limit = 100) => {
  const { data, loading, error } = useQuery(
    query_getAllUsers,{
      variables: {
        "limit": limit
      }
    }
  );
  let users
  if (data) {
    if(DataVerifier.isValidArray(data.users)){
      users = data.users
    }else{
      users = []
    }
  }
  if (error) {
    console.error("query getAllUser: ",error);
  }
  //validateEmail({onCompleted:()=>{},onError:()=>{}})
  return { users, loading, error }
};

export const useValidateEmail = () => {
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
  const [setMutation, { loading, data, error }] = useMutation(
    mutation_InsertOneUser
  );
  const insertNewUser = ({
    user,
    onCompleted = () => {},
    onError = () => {},
  }) => {
    setMutation({
      variables: {
        data: user,
      },
      onCompleted: onCompleted,
      onError: onError,
    });
  };
  return [insertNewUser, { loading, data, error }];
}

export const academicSchema = {
  dateEnd: null,
  dateStart: null,
  degree: {
    key: "",
    description: "",
    name: "",
  },
  description: "",
  schoolName: "",
  schoolId: "",
  studyStatus: {
    course: {
      code: "",
      description: "",
      name: "",
      specialty: "",
    },
    currentSemester: 0,
    studentId: "",
  },
};

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
    age: null,
    dateBirth: null,
    gender: "",
    lastName: "",
    mobile: "",
    name: "",
  },
  publicToken: "",
  skills: {
    collaboration: [],
    soft: [],
    technical: [],
    trendInterest: [],
  },
  interest: [],
  uiConf:{
    color: "#999999"
  }
};

export const trendInterestVectorSchema = {
  formal: 0,
  nature: 0,
  social: 0
}

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
        schoolId: "",
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
