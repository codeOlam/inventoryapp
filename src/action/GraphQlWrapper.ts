import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';

export interface GraphQLOptions {
    input?: object;
    variable?: object;
    authMode?: GRAPHQL_AUTH_MODE;
}

async function actionGraphQL<X>(
    action: any, 
    options?: GraphQLOptions): Promise<GraphQLResult<X>>{
        return (
            await API.graphql(graphqlOperation(action, options))
            ) as GraphQLResult<X>
    }


export default actionGraphQL