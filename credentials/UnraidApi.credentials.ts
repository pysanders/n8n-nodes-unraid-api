import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class UnraidApi implements ICredentialType {
	name = 'unraidApi';
	displayName = 'Unraid API';
	documentationUrl = 'https://docs.unraid.net/API';
	icon = { light: 'file:../nodes/UnraidApi/unraid.svg', dark: 'file:../nodes/UnraidApi/unraid.svg' } as const;
	properties: INodeProperties[] = [
		{
			displayName: 'Server URL',
			name: 'serverUrl',
			type: 'string',
			default: '',
			placeholder: 'http://x.x.x.x:port',
			description: 'The URL of your Unraid server including port',
			required: true,
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};
	test: ICredentialTestRequest = {
		request: {
			method: 'POST',
			url: '={{$credentials.serverUrl.replace(/\\/$/, "")}}/graphql',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ query: '{ info { os { platform } } }' }),
		},
	};
}
