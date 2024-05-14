import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button"; // Import Button component from PrimeReact

const Home = () => {
  const initialValues = {
    name: "",
    email: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div>
      <h2>Booking Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field name="name">
              {({ field }) => <InputText id="name" {...field} />}
            </Field>
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field name="email">
              {({ field }) => <InputText id="email" {...field} />}
            </Field>
            <ErrorMessage name="email" component="div" />
          </div>
          {/* Use PrimeReact Button for form submission */}
          <Button type="submit" label="Submit" className="p-button-danger" />
        </Form>
      </Formik>
    </div>
  );
};

export default Home;
