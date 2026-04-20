import type { INodeProperties } from 'n8n-workflow';

export const vmOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['vm'],
			},
		},
		options: [
			{
				name: 'Force Stop',
				value: 'forceStop',
				description: 'Force stop a VM',
				action: 'Force stop a VM',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'List all VMs',
				action: 'List all VMs',
			},
			{
				name: 'Pause',
				value: 'pause',
				description: 'Pause a VM',
				action: 'Pause a VM',
			},
			{
				name: 'Reboot',
				value: 'reboot',
				description: 'Reboot a VM',
				action: 'Reboot a VM',
			},
			{
				name: 'Restart',
				value: 'restart',
				description: 'Restart a VM (stop then start)',
				action: 'Restart a VM',
			},
			{
				name: 'Resume',
				value: 'resume',
				description: 'Resume a paused VM',
				action: 'Resume a VM',
			},
			{
				name: 'Start',
				value: 'start',
				description: 'Start a VM',
				action: 'Start a VM',
			},
			{
				name: 'Stop',
				value: 'stop',
				description: 'Stop a VM',
				action: 'Stop a VM',
			},
		],
		default: 'getMany',
	},
];

export const vmFields: INodeProperties[] = [
	{
		displayName: 'VM ID',
		name: 'vmId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the VM',
		displayOptions: {
			show: {
				resource: ['vm'],
				operation: ['start', 'stop', 'pause', 'resume', 'forceStop', 'reboot', 'restart'],
			},
		},
	},
];
