import React, { useCallback, useState, useEffect } from "react";
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from "react-hook-form";
import * as yup from "yup";

const useYupValidationResolver = validationSchema =>
  useCallback(
    async data => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        });

        return {
          values,
          errors: {}
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message
              }
            }),
            {}
          )
        };
      }
    },
    [validationSchema]
  );
  
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  // const   adharRegExp = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/;
  // const   PanRegExp = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const validationSchema = yup.object({
  name: yup.string().required("Required"),
  age: yup.string().required("Required"),
  sex: yup.string().required("Required"),
  mobileNumber: yup.string().required("required").matches(phoneRegExp, 'Phone number is not valid').min(10,"Can nOt less then 10 degit!").max(10, "Can nOt greater then 10 degit!"),
  emerContactNumber: yup.string().required("required").matches(phoneRegExp, 'Phone number is not valid').min(10,"Can nOt less then 10 degit!").max(10, "Can nOt greater then 10 degit!"),
  // govtIssueId: yup.string().required("required").matches(adharRegExp, 'Adhar Number is not valid'),
  // emerContactNumber: yup.string().required("required").matches(phoneRegExp, 'Phone number is not valid').min(10,"Can nOt less then 10 degit!").max(10, "Can nOt greater then 10 degit!"),
});

function FormData() {
  

    const resolver = useYupValidationResolver(validationSchema);
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver });
    const [data, setData] = useState("");

    useEffect(() => {
      localStorage.setItem('items', JSON.stringify(data));
    }, [data]);

  return (
    <Container>
        <Row>
            <h1>{data}</h1>
    <Form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
    <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
        <Form.Label column sm={2}>
          Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" {...register("name")} placeholder="Name" />
        {errors.name && (
          <Form.Text className="text-error">
          We'll never share your email with anyone else.
        </Form.Text>
        )}
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalAge">
        <Form.Label column sm={2}>
          Date Of Birth or Age
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" {...register("age")} placeholder="DD/MM/YYYY or Age in Years" />
        {errors.age && (
          <Form.Text className="text-error">
          We'll never share your email with anyone else.
        </Form.Text>
        )}
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalsex">
        <Form.Label column sm={2}>
          Sex
        </Form.Label>
        <Col sm={10}>
        <Form.Select aria-label="Default select example" {...register("sex")} >
            <option>Open this select menu</option>
            <option value="1">Male</option>
            <option value="2">Female</option>
            <option value="3">Others</option>
        </Form.Select>
        {errors.sex && (
          <Form.Text className="text-error">
          We'll never share your email with anyone else.
        </Form.Text>
        )}
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalMobile">
        <Form.Label column sm={2}>
          Mobile
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" {...register("mobileNumber")} placeholder="Mobile" />
        
        {errors.mobileNumber && (
          <Form.Text className="text-error">
         {errors.mobileNumber.message}
        </Form.Text>
        )}
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalissueId">
        <Form.Label column sm={2}>
          Govt Issue Id
        </Form.Label>
        <Col sm={5}>
        <Form.Select aria-label="Default select example" {...register("govtIssueType")}>
      <option>Id Type</option>
      <option value="1">Aadhar</option>
      <option value="2">Pan Card</option>
      <option value="3">Others</option>
    </Form.Select>
        </Col>
        <Col sm={5}>
          <Form.Control type="text" {...register("govtIssueId")} placeholder="Enter Govt Id" />
        </Col>
      </Form.Group>
      
      <Form.Group as={Row} className="mb-3" controlId="formHorizontaldetails">
        <Form.Label column sm={2}>
          Guardian Details
        </Form.Label>
        <Col sm={5}>
        <Form.Select aria-label="Default select example" {...register("guarLable")}>
      <option>Enter Label</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
        </Col>
        <Col sm={5}>
          <Form.Control type="email" {...register("guarName")} placeholder="Enter Gaurdian Name" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Email
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="email" {...register("email")} placeholder="Email" />
        </Col>
      </Form.Group>
      
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmargencyContact">
        <Form.Label column sm={2}>
          Emergency Contact Number
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" {...register("emerContactNumber")} placeholder="Emergency Contact Number" />
        {errors.mobileNumber && (
          <Form.Text className="text-error">
         {errors.mobileNumber.message}
        </Form.Text>
        )}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalAddress">
      <Form.Label column sm={2}>
          Address
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" {...register("address")} placeholder="Address" />
        </Col>
      </Form.Group>
      
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalState">
      <Form.Label column sm={2}>
          State
        </Form.Label>
        <Col sm={10}>
          
        <Form.Select aria-label="Default select example">
      <option>Enter State</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
        </Col>
      </Form.Group>
      
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalCity">
      <Form.Label column sm={2}>
          City
        </Form.Label>
        <Col sm={10}>
        <Form.Select aria-label="Default select example" {...register("state")}>
      <option>Enter State</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
        </Col>
      </Form.Group>
      
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalCountry">
      <Form.Label column sm={2}>
          Country
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" {...register("country")} placeholder="Country" />
        </Col>
      </Form.Group>
      
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPinCode">
      <Form.Label column sm={2}>
          Pin Code
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" {...register("pinCode")} placeholder="Pin Code" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalOccupation">
        <Form.Label column sm={2}>
          Occupation
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" {...register("occupation")} placeholder="Occupation" />
        </Col>
      </Form.Group>

<Form.Group as={Row} className="mb-3" controlId="formHorizontalReligion">
  <Form.Label column sm={2}>
    Religion
  </Form.Label>
  <Col sm={10}>
    
  <Form.Select aria-label="Default select example" {...register("religion")}>
      <option>Enter Religion</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
  </Col>
</Form.Group>

<Form.Group as={Row} className="mb-3" controlId="formHorizontalMariied">
  <Form.Label column sm={2}>
    Marital Status
  </Form.Label>
  <Col sm={10}>
    
  <Form.Select aria-label="Default select example" {...register("maritalStatus")}>
      <option> Select Marital Status</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
  </Col>
</Form.Group>

<Form.Group as={Row} className="mb-3" controlId="formHorizontalGroup">
  <Form.Label column sm={2}>
    Blood Group
  </Form.Label>
  <Col sm={10}>
    
  <Form.Select aria-label="Default select example" {...register("bloodGroup")}>
      <option> Select Blood Group</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
  </Col>
</Form.Group>

<Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
  <Form.Label column sm={2}>
    Nationality
  </Form.Label>
  <Col sm={10}>
    <Form.Control type="tex" {...register("nationality")} placeholder="Nationality" />
  </Col>
</Form.Group>

      <Form.Group as={Row} className="mb-3">
          <Form.Control type="submit"  />
        {/* <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Sign in</Button>
        </Col> */}
      </Form.Group>
    </Form>
        </Row>
    </Container>
  );
}

export default FormData;