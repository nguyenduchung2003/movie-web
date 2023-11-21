import * as yup from "yup"
import { userType } from "../types/User"
const emailRegExp =
     /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const emailExistsInLocalStorage = (value: string) => {
     const existingEmails: userType[] = JSON.parse(
          localStorage.getItem("users") || "[]"
     )
     return existingEmails.some((user) => user.userName === value)
}
const checkUserEmail = (value: string) => {
     const existingEmails: userType[] = JSON.parse(
          localStorage.getItem("users") || "[]"
     )
     return existingEmails.some((user) => user.userName === value)
}
const checkUserPassword = (value: string) => {
     const existingEmails: userType[] = JSON.parse(
          localStorage.getItem("users") || "[]"
     )
     return existingEmails.some((user) => user.passWord === value)
}

export const useSchemasRegister = yup.object().shape({
     // checkEmail: yup.boolean(),
     email: yup
          .string()
          .matches(emailRegExp, "Email is not in correct format")
          .required("Please enter Email")
          .test("unique-email", "Email already exists", function (value) {
               return !emailExistsInLocalStorage(value)
          }),
     password: yup
          .string()
          .min(6, "Password must have at least 6 characters")
          .required("Please enter a password"),

     passwordConfirm: yup
          .string()
          .oneOf([yup.ref("password")], "Password does not match")
          .required("Please enter a password confirm"),
})
export const useSchemasLogin = yup.object().shape({
     // checkEmail: yup.boolean(),
     email: yup
          .string()
          .matches(emailRegExp, "Email is not in correct format")
          .required("Please enter Email")
          .test("checkEmail", "Emaill faild", function (value) {
               return !checkUserEmail(value)
          }),
     password: yup
          .string()
          .min(6, "Password must have at least 6 characters")
          .required("Please enter a password")
          .test("checkPassword", "Password faild", function (value) {
               return !checkUserPassword(value)
          }),
})
