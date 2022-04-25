export  function validate(values) {
    if (!values) {
      return false
    }
  }
  
  export function validateEmail(values) {
    if((/\w+@\w+\.\w{2,10}/.test(values))){
      return true
    }
  }
  
  export function sixDigitNo(values){
    const exp =/^[0-9]*$/
    if(exp.test(values)){
      return true
    }
  }