import { useFormik } from "formik"
import * as Yup from "yup"

const schema = Yup.object({
  fullname: Yup.string().min(1).required(),
  email: Yup.string().email().required(),
  phone: Yup.string()
    .matches(/^(40|87|89)([0-9]{6})$/)
    .required(),
})

const Form = () => {
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      phone: "",
    },
    validationSchema: schema,
    onSubmit: (values) => console.log("formik values", values),
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <input type="text" id="fullname" {...formik.getFieldProps("fullname")} />
        <input type="email" id="email" {...formik.getFieldProps("email")} />
        <input type="tel" id="phone" {...formik.getFieldProps("phone")} />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Form
