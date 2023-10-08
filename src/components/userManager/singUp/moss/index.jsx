import React from "react";
import TestForm from "../testForm";
import Test from "./test.json"
import TestInfo from "./info.json"

export default function MossTest({
  formState,
  dispatch,
  handleNext,
}) {

  const handleResultTest = (testValues,isSkip=false)=>{
    if (isSkip) {
      handleNext()
    }
    if(testValues){
      let soft = []
      TestInfo.skills.forEach(skill=>{
        const value = testValues[skill.code]
        soft.push({
          description: skill.description,
          name: skill.name,
          score: value
        })
      })
      dispatch({type: "setSoftSkills", soft:soft})
      handleNext()
    }
  }

  return (
    <div>
      <div id="SkipTest" style={{display: 'none'}} >
        Continuar
      </div>
      <TestForm name="Evaluación Psicométrica" agents={Test.agents} info={TestInfo} setValues={handleResultTest} />
    </div>
  );
}
