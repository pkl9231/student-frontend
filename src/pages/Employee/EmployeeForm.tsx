import { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { UseForm, Form } from '../../components/UseForm';
import * as employeeService from "../../service/employeeService";


const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

const initialFValues = {
    id: 0,
    name: '',
    email: '',
    mobile: '',
    rollNumber: '',
    gender: 'male',
    className: '',
    // date: new Date(),
    fathersName:"",
    password: ""
}

export default function EmployeeForm(props: any) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues: any = values) => {
        console.log("getting fieldValues", fieldValues);
        let temp: any = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues?.name ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues?.mobile?.length > 9 ? "" : "Minimum 10 numbers required."
        if ('className' in fieldValues)
            temp.className = fieldValues?.className?.length !== 0 ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = fieldValues?.email ? "" : "This field is required."
        if ('fathersName' in fieldValues)
            temp.fathersName = fieldValues?.fathersName ? "" : "This field is required."
        if ('password' in fieldValues)
            temp.password = fieldValues?.password ? "" : "This field is required."
        if ('rollNumber' in fieldValues)
            temp.rollNumber = fieldValues?.rollNumber ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = UseForm(initialFValues, true, validate);

    console.log("getting values", values);

    const handleSubmit = (e:any) => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit, setValues])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="name"
                        label="Full Name"
                        value={values?.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values?.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        label="Mobile"
                        name="mobile"
                        value={values?.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />
                    <Controls.Input
                        label="Roll Number"
                        name="rollNumber"
                        value={values?.rollNumber}
                        onChange={handleInputChange}
                        error={errors.rollNumber}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        name="gender"
                        label="Gender"
                        value={values?.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                    <Controls.Select
                        name="className"
                        label="Department"
                        value={values?.className}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                        error={errors.className}
                    />
                    {/* <Controls.DatePicker
                        name="hireDate"
                        label="Hire Date"
                        value={values?.hireDate}
                        onChange={handleInputChange}
                    /> */}
                    <Controls.Input
                        label="Father Name"
                        name="fathersName"
                        value={values?.fathersName}
                        onChange={handleInputChange}
                        error={errors.fathersName}
                    />
                    <Controls.Input
                        label="Password"
                        name="password"
                        type="password"
                        value={values?.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                    {/* <Controls.Checkbox
                        name="isPermanent"
                        label="Permanent Student"
                        value={values?.isPermanent}
                        onChange={handleInputChange}
                    /> */}

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
