class DataVerifier {
    static isValidObject(obj = {}) {
      if (!obj) {
        return false;
      }
      if (obj === null) {
        return false;
      }
      if (Object.keys(obj).length === 0) {
        return false;
      }
      return true;
    }
  
    static isValidArray(array) {
      if (!array) {
        return false;
      }
      if (array === null) {
        return false;
      }
      if (!Array.isArray(array)) {
        return false;
      }
      if (array.length <= 0) {
        return false;
      }
      return true;
    }
  
    static isValidNumber(num) {
      if (!num) {
        return false;
      }
      if (num === null) {
        return false;
      }
      if (isNaN(num)) {
        return false;
      }
      if (Number.isInteger) {
        if (!Number.isSafeInteger) {
          console.error("no safe Integer", num);
          return false;
        }
      }
      return true;
    }
  
    static toValidString(str) {
      if(this.isValidString(str+"")){
          return str+""
      }
      return ""
    }
  
    static isValidString(str) {
      if (!str) {
        return false;
      }
      if (str === null) {
        return false;
      }
      if (str === "null") {
        return false;
      }
      if (str === "") {
        return false;
      }
      return true;
    }
  }
  
  export default DataVerifier;
  