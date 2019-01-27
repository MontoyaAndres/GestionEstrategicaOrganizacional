import React from "react";
import { Formik, Form } from "formik";
import { withRouter } from "next/router";
import Error from "next/error";
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import Loading from "../../components/shared/loading";
import checkLoggedIn from "../../lib/checkLoggedIn";
import redirect from "../../lib/redirect";
import { informationQuery } from "../../graphql/queries/account";
import { TextField } from "../../components/shared/globalField";
import UploadRoutePhoto from "../../components/profile/edit/uploadRoutePhoto";
import UploadRouteCover from "../../components/profile/edit/uploadRouteCover";
import EditGeneralInformation from "../../components/profile/edit/editGeneralInformation";
import EditSocialNetwork from "../../components/profile/edit/editSocialNetwork";
import EditLanguage from "../../components/profile/edit/editLanguage";
import EditUniversity from "../../components/profile/edit/editUniversity";

const updategeneralInformation = gql`
  mutation generalInformation($id: ID!, $information: GeneralInformationInput) {
    generalInformation(id: $id, information: $information) {
      path
      message
    }
  }
`;

const edit = ({
  router: {
    query: { id }
  }
}) => (
  <Query query={informationQuery} variables={{ id }}>
    {({ loading, data }) => {
      if (loading) {
        return <Loading />;
      }

      if (!data.information) {
        return <Error statusCode={404} />;
      }

      return (
        <Mutation mutation={updategeneralInformation}>
          {mutate => (
            <Formik
              initialValues={{
                routePhoto: "",
                routeCover: "",
                name: data.information.name,
                lastname: data.information.lastname,
                description: data.information.description || "",
                identificationDocumentType:
                  data.information.identificationDocumentType,
                identificationDocument: data.information.identificationDocument,
                address: data.information.address || "",
                telephone: data.information.telephone,
                departament: data.information.departament || "Bogotá, D.C.",
                city: data.information.city || "",
                nationality: data.information.nationality || "Colombia",
                civilStatus: data.information.civilStatus || "SOLTERO(A)",
                linkedin: data.information.linkedin || "",
                skype: data.information.skype || "",
                website: data.information.website || "",
                gender: data.information.gender || "HOMBRE",
                skills: data.information.skills || [],
                language: data.information.language || [],
                study: [
                  {
                    id: 1,
                    place: "Universidad minuto de Dios",
                    level: "UNIVERSIDAD / CARRERA TECNOLÓGICA",
                    area: "Tecnología en Informática",
                    startedOn: "2015-07-22",
                    finishIn: "2019-01-15",
                    finished: false
                  },
                  {
                    id: 2,
                    place: "SENA",
                    level: "UNIVERSIDAD / CARRERA TÉCNICA",
                    area: "Gastronomia",
                    startedOn: "2013-07-22",
                    finishIn: "2015-01-15",
                    finished: true
                  }
                ]
              }}
              onSubmit={async values => {
                console.log(values);
                /* const response = await mutate({
                  variables: {
                    id,
                    information: values
                  }
                });
                console.log(response); */
              }}
              render={({ values, isSubmitting, setFieldValue }) => (
                <Form method="POST">
                  <UploadRouteCover data={data} setFieldValue={setFieldValue} />

                  <UploadRoutePhoto data={data} setFieldValue={setFieldValue} />

                  <div className="container">
                    <div className="columns">
                      <div className="column" style={{ padding: "0 .75rem" }}>
                        <label className="label">Nombre de usuario</label>
                        <TextField
                          type="text"
                          name="name"
                          placeholder="Nombre de usuario"
                          isRequired
                        />
                      </div>
                      <div className="column" style={{ padding: "0 .75rem" }}>
                        <label className="label">Apellido de usuario</label>
                        <TextField
                          type="text"
                          name="lastname"
                          placeholder="Apellido de usuario"
                          isRequired
                        />
                      </div>
                    </div>

                    <EditGeneralInformation values={values} />

                    <EditSocialNetwork values={values} />

                    <EditLanguage values={values} />

                    <EditUniversity
                      values={values}
                      setFieldValue={setFieldValue}
                    />

                    <div
                      className="buttons has-addons is-centered"
                      style={{ padding: "30px 0" }}
                    >
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`button is-primary is-large ${
                          isSubmitting ? "is-loading" : ""
                        }`}
                        style={{ width: 200 }}
                      >
                        Enviar
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            />
          )}
        </Mutation>
      );
    }}
  </Query>
);

edit.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (!loggedInUser.me) {
    redirect(context, "/login");
  }

  return {};
};

export default withRouter(edit);
