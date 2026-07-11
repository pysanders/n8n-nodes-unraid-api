import type { INodeProperties } from 'n8n-workflow';

export const dockerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['docker'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a single container',
				action: 'Get a container',
			},
			{
				name: 'Get by Name',
				value: 'getByName',
				description: 'Find containers by name (partial match)',
				action: 'Find containers by name',
			},
			{
				name: 'Get Logs',
				value: 'getLogs',
				description: 'Get logs from a container',
				action: 'Get container logs',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'List all containers',
				action: 'List all containers',
			},
			{
				name: 'Get Networks',
				value: 'getNetworks',
				description: 'List all Docker networks',
				action: 'List all docker networks',
			},
			{
				name: 'Get Update Statuses',
				value: 'getUpdateStatuses',
				description: 'Check which containers have updates available',
				action: 'Get container update statuses',
			},
			{
				name: 'Pause',
				value: 'pause',
				description: 'Pause a container',
				action: 'Pause a container',
			},
			{
				name: 'Remove',
				value: 'removeContainer',
				description: 'Remove a container',
				action: 'Remove a container',
			},
			{
				name: 'Restart',
				value: 'restart',
				description: 'Restart a container (stop then start)',
				action: 'Restart a container',
			},
			{
				name: 'Start',
				value: 'start',
				description: 'Start a container',
				action: 'Start a container',
			},
			{
				name: 'Stop',
				value: 'stop',
				description: 'Stop a container',
				action: 'Stop a container',
			},
			{
				name: 'Unpause',
				value: 'unpause',
				description: 'Unpause a container',
				action: 'Unpause a container',
			},
			{
				name: 'Update',
				value: 'updateContainer',
				description: 'Update a container to the latest image version',
				action: 'Update a container',
			},
			{
				name: 'Update All',
				value: 'updateAllContainers',
				description: 'Update all containers to their latest image versions',
				action: 'Update all containers',
			},
		],
		default: 'getMany',
	},
];

export const dockerFields: INodeProperties[] = [
	{
		displayName: 'Container ID',
		name: 'containerId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the Docker container',
		displayOptions: {
			show: {
				resource: ['docker'],
				operation: ['get', 'start', 'stop', 'pause', 'unpause', 'restart', 'updateContainer', 'removeContainer', 'getLogs'],
			},
		},
	},
	{
		displayName: 'Container Name',
		name: 'containerName',
		type: 'string',
		required: true,
		default: '',
		description: 'Name or partial name to match against container names (case-insensitive)',
		displayOptions: {
			show: {
				resource: ['docker'],
				operation: ['getByName'],
			},
		},
	},
	{
		displayName: 'Remove Image',
		name: 'withImage',
		type: 'boolean',
		default: false,
		description: 'Whether to also remove the container\'s image when removing the container',
		displayOptions: {
			show: {
				resource: ['docker'],
				operation: ['removeContainer'],
			},
		},
	},
	{
		displayName: 'Tail Lines',
		name: 'tailLines',
		type: 'number',
		default: 100,
		description: 'Number of log lines to retrieve from the end',
		displayOptions: {
			show: {
				resource: ['docker'],
				operation: ['getLogs'],
			},
		},
	},
	{
		displayName: 'Since',
		name: 'since',
		type: 'dateTime',
		default: '',
		description: 'Only return logs after this timestamp (ISO 8601)',
		displayOptions: {
			show: {
				resource: ['docker'],
				operation: ['getLogs'],
			},
		},
	},
];
