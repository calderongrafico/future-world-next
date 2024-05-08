"use server";
import { GraphQLClientSingleton } from "app/graphql";
import { createCartMutation } from "app/graphql/mutations/createCartMutation";
import { createUserMutation } from "app/graphql/mutations/createUserMutation";
import { createAccessToken } from "app/utils/auth/createAccessToken";
import { validateAccessToken } from "app/utils/auth/validateAccessToken";
import { cookies } from "next/headers";
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

  const data: any = await graphqlClient.request(createUserMutation, variables);
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

export const handleLogin = async (formData: FormData) => {
  // console.log("Logging in with data: ", formData);

  const formDataObject = Object.fromEntries(formData);

  const accessToken = await createAccessToken(
    formDataObject.email as string,
    formDataObject.password as string
  );

  if (accessToken) {
    redirect("/store");
  }
};

export const handleCreateCart = async (items: CartItem[]) => {
  const cookiesStore = cookies();
  const accesToken = cookiesStore.get("accessToken")?.value as string;

  if (!accesToken) redirect("/login");

  const graphqlClient = GraphQLClientSingleton.getInstance().getClient();
  const customer = await validateAccessToken();
  const variables = {
    input: {
      buyerIdentity: {
        customerAccessToken: accesToken,
        email: customer?.email,
      },
      lines: items.map((item) => ({
        merchandiseId: item.merchandiseId,
        quantity: item.quantity,
      })),
    },
  };

  const {
    cartCreate,
  }: {
    cartCreate?: {
      cart?: {
        checkoutUrl: string;
      };
    };
  } = await graphqlClient.request(createCartMutation, variables);

  return cartCreate?.cart?.checkoutUrl;
};
