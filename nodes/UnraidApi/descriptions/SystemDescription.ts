import type { INodeProperties } from 'n8n-workflow';

export const systemOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['system'],
			},
		},
		options: [
			{
				name: 'Get Config',
				value: 'getConfig',
				description: 'Get system configuration',
				action: 'Get system config',
			},
			{
				name: 'Get Flash Info',
				value: 'getFlashInfo',
				description: 'Get flash drive information',
				action: 'Get flash info',
			},
			{
				name: 'Get Info',
				value: 'getInfo',
				description: 'Get general system info (OS, CPU, memory, versions)',
				action: 'Get system info',
			},
			{
				name: 'Get Metrics',
				value: 'getMetrics',
				description: 'Get current CPU and memory metrics',
				action: 'Get system metrics',
			},
			{
				name: 'Get Online Status',
				value: 'getOnlineStatus',
				description: 'Check if the server is online',
				action: 'Get online status',
			},
			{
				name: 'Get Registration',
				value: 'getRegistration',
				description: 'Get license registration info',
				action: 'Get registration info',
			},
			{
				name: 'Get Server Status',
				value: 'getServerStatus',
				description: 'Get server online status, IPs, and URLs',
				action: 'Get server status',
			},
			{
				name: 'Get UPS Status',
				value: 'getUpsStatus',
				description: 'Get UPS device status',
				action: 'Get UPS status',
			},
		],
		default: 'getInfo',
	},
];

export const systemFields: INodeProperties[] = [];
