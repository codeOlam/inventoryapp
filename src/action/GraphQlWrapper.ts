import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';

export interface GraphQLOptions {
    input?: object;
    variable?: object;
    authMode?: GRAPHQL_AUTH_MODE;
}

export interface SubscriptionValue<X>{
    value: {data: X}
}

async function actionGraphQL<X>(
    action: any, 
    options?: GraphQLOptions): Promise<GraphQLResult<X>>{
        return (
            await API.graphql(graphqlOperation(action, options))
            ) as GraphQLResult<X>
    }

export function subGraphQL<X>(subscription: any, callback: (value: X) => void){
    //@ts-ignore
    return API.graphql(graphqlOperation(subscription)).subscribe({
        next: (response: SubscriptionValue<X>) => callback(response.value.data)
    });
}


export default actionGraphQL