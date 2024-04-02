"use server";

import { GraphQLClientSingleton } from "app/graphql";
import { createUserMutation } from "app/graphql/mutations/createUserMutation";
import { createAccessToken } from "app/utils/auth/createAccessToken";
import { redirect } from "next/navigation";

export const handleCreateUser = async (formData: FormData) => {
  // console.log("Creating user with data: ", formData);

  // Convert FormData to object
  const formDataObject = Object.fromEntries(formData);
  // Remove password_confirmation from the object
  delete formDataObject["password_confirmation"];

  const graphqlClient = GraphQLClientSingleton.getInstance().getClient();

  const variables = {
    input: {
      ...formDataObject,
      phone: "+57" + formDataObject.phone,
    },
  };

  const data = await graphqlClient.request(createUserMutation, variables);
  // console.log({ data });
  const { customerUserErrors, customer } = data.customerCreate;

  if (customer.firstName) {
    await createAccessToken(
      formDataObject.email as string,
      formDataObject.password as string
    );

    redirect("/store");
  }
};
