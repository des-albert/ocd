import { gql } from 'apollo-boost';

export const GET_ELEMENTS = gql`
  query($product: String!) {
    getElements(product: $product) {
      _id
      selector
      options
      icon
      label
      value
    }
  }
`;

/* Mutations */

export const ADD_CONFIG = gql`
  mutation($jsonConfig: String!) {
    addConfig(jsonConfig: $jsonConfig) {
      jsonConfig
    }
  }
`;
