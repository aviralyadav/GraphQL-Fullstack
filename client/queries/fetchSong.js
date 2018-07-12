import gql from 'graphql-tag';

export default gql`
    query findOne($id: ID!){
        song(id: $id){
        id
        title
        }
    }
`;