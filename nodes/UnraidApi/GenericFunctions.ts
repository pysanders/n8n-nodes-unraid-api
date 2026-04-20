import type {
	IExecuteFunctions,
	IHttpRequestOptions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

export async function unraidApiRequest(
	this: IExecuteFunctions,
	query: string,
	variables: Record<string, unknown> = {},
): Promise<JsonObject> {
	const credentials = await this.getCredentials('unraidApi');
	const serverUrl = credentials.serverUrl as string;

	const options: IHttpRequestOptions = {
		method: 'POST',
		url: `${serverUrl.replace(/\/$/, '')}/graphql`,
		headers: {
			'Content-Type': 'application/json',
		},
		body: {
			query,
			variables,
		},
		json: true,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(
		this,
		'unraidApi',
		options,
	);

	if (response.errors) {
		// If we got partial data back, return it instead of failing entirely
		if (response.data) {
			return response.data as JsonObject;
		}
		const errors = response.errors as Array<{ message: string }>;
		throw new NodeApiError(this.getNode(), response as JsonObject, {
			message: errors[0]?.message ?? 'Unknown GraphQL error',
		});
	}

	return response.data as JsonObject;
}
