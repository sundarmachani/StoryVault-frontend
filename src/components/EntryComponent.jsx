import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import moment from "moment";
import {
  getEntryByIdApi,
  createNewEntryApi,
  updateEntryApi,
} from "./api/DiaryApiService";
import { useAuth } from "./security/AuthContext";

export default function EntryComponent() {
  const { id } = useParams();
  const authContext = useAuth();
  const username = authContext.username;
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== "-1") {
      setLoading(true);
      getEntryByIdApi(id)
        .then((res) => {
          setDescription(res.data.description || "");
          setDate(res.data.entryDate || "");
        })
        .catch((err) => {
          console.error(err);
          alert("Error fetching the diary entry");
        })
        .finally(() => setLoading(false));
    }
  }, [id, username]);

  function onSubmit(values) {
    setLoading(true);
    const diary = {
      description: values.description,
      entryDate: values.date,
    };
    if (id === "-1") {
      createNewEntryApi(diary)
        .then(() => navigate("/entries"))
        .catch((err) => {
          console.error(err);
          alert("Error creating new diary entry");
        })
        .finally(() => setLoading(false));
    } else {
      const updatedDiary = { id, ...diary };
      updateEntryApi(updatedDiary)
        .then(() => navigate("/entries"))
        .catch((err) => {
          console.error(err);
          alert("Error updating diary entry");
        })
        .finally(() => setLoading(false));
    }
  }

  function validate(values) {
    const errors = {};
    if (!values.description || values.description.length < 5) {
      errors.description = "Minimum of 5 characters are needed for description";
    }
    if (!values.date || !moment(values.date).isValid()) {
      errors.date = "A valid date is required";
    }
    return errors;
  }

  if (loading) {
    return <div>Loading entry...</div>;
  }

  return (
    <div className="EntryComponent">
      <h1>Enter your story here 🙂</h1>
      <Formik
        initialValues={{ description, date }}
        enableReinitialize={true}
        onSubmit={onSubmit}
        validate={validate}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {() => (
          <Form>
            <ErrorMessage
              name="description"
              component="div"
              className="alert alert-warning"
            />
            <ErrorMessage
              name="date"
              component="div"
              className="alert alert-warning"
            />
            <fieldset className="form-group">
              <label>Description</label>
              <Field
                as="textarea"
                className="form-control descriptionBox"
                name="description"
              />
            </fieldset>
            <fieldset className="form-group">
              <label>Date</label>
              <Field type="date" className="form-control" name="date" />
            </fieldset>
            <div>
              <button
                className="btn btn-success"
                type="submit"
                disabled={loading}
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
