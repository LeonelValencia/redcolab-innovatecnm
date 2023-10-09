import { gql, useMutation, useLazyQuery } from "@apollo/client";
import DataVerifier from "./tools";

const mutation_InsertOneSchool = gql`
  mutation InsertOneSchool($data: SchoolInsertInput!) {
    insertOneSchool(data: $data) {
      _id
    }
  }
`;

export const schoolSchema = {
  name: "",
  code: "",
  degreeKey: "",
};

export function useNewSchool() {
  const [setMutation, { loading, data, error }] = useMutation(
    mutation_InsertOneSchool
  );
  const insertNewUser = ({
    school,
    onCompleted = () => {},
    onError = () => {},
  }) => {
    setMutation({
      variables: {
        data: school,
      },
      onCompleted: onCompleted,
      onError: onError,
    });
  };
  return [insertNewUser, { loading, data, error }];
}

const query_searchSchoolByDegreeKey = gql`
  query SchoolsByDegreeKey($query: SchoolQueryInput) {
    schools(query: $query) {
      _id
      name
      code
      courses{
        code
        name
        specialties{
            code
            name
        }
      }
    }
  }
`;
/*
{
  query": {
    "degreeKey": "superior"
  }
}
*/

export const useGetSchoolsByDegree = () => {
  const [getData, { data, loading, error }] = useLazyQuery(
    query_searchSchoolByDegreeKey
  );
  const getSchoolsByDegree = ({
    degreeKey,
    onCompleted = () => {},
    onError = () => {},
  }) => {
    getData({
      variables: {
        query: {
          degreeKey: degreeKey,
        },
      },
      onCompleted: onCompleted,
      onError: onError,
    });
  };
  let schools;
  if (data) {
    try {
      if (DataVerifier.isValidArray(data.schools)) {
        schools = data.schools;
      } else {
        schools = [];
      }
    } catch (error) {
      error("set school data: ", error);
    }
  }
  //getSchoolsByDegree({onCompleted:()=>{},onError:()=>{}})
  return [getSchoolsByDegree, { schools, data, loading, error }];
};

export const DEGREES = {
  básica: {
    name: "Básica",
    description:
      "Está compuesta por los niveles Preescolar, Primaria y Secundaria.",
  },
  medioSuperior: {
    name: "Medio Superior",
    description:
      "Comprende el nivel de bachillerato, así como los demás niveles equivalentes a éste, y la educación profesional que no requiere bachillerato o sus equivalentes.",
  },
  superior: {
    name: "Superior",
    description:
      "Está compuesto por la licenciatura, la especialidad, la maestría y el doctorado, así como por opciones terminales previas a la conclusión de la licenciatura, como los estudios de Técnico Superior Universitario",
  },
  especial: {
    name: "Educación Especial, Inclusiva o de Adultos",
    description:
      "Comprende los estudios dirigidos a personas con capacidades diferentes y a quienes abandonaron o no tuvieron la oportunidad de una educación formal",
  },
};
