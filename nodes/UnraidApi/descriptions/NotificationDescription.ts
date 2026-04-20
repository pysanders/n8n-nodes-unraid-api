import type { INodeProperties } from 'n8n-workflow';

export const notificationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['notification'],
			},
		},
		options: [
			{
				name: 'Archive',
				value: 'archive',
				description: 'Archive a notification',
				action: 'Archive a notification',
			},
			{
				name: 'Archive All',
				value: 'archiveAll',
				description: 'Archive all notifications',
				action: 'Archive all notifications',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new notification',
				action: 'Create a notification',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a notification',
				action: 'Delete a notification',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'List all notifications',
				action: 'List all notifications',
			},
			{
				name: 'Get Overview',
				value: 'getOverview',
				description: 'Get notification counts (unread and archived)',
				action: 'Get notification overview',
			},
			{
				name: 'Get Warnings and Alerts',
				value: 'getWarningsAndAlerts',
				description: 'Get only warnings and alerts',
				action: 'Get warnings and alerts',
			},
		],
		default: 'getMany',
	},
];

export const notificationFields: INodeProperties[] = [
	{
		displayName: 'Notification ID',
		name: 'notificationId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the notification',
		displayOptions: {
			show: {
				resource: ['notification'],
				operation: ['archive', 'delete'],
			},
		},
	},
	{
		displayName: 'Notification Type',
		name: 'notificationType',
		type: 'options',
		required: true,
		default: 'UNREAD',
		description: 'The type of the notification to delete',
		options: [
			{ name: 'Unread', value: 'UNREAD' },
			{ name: 'Archive', value: 'ARCHIVE' },
		],
		displayOptions: {
			show: {
				resource: ['notification'],
				operation: ['delete'],
			},
		},
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		description: 'The title of the notification',
		displayOptions: {
			show: {
				resource: ['notification'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		required: true,
		default: '',
		description: 'The subject of the notification',
		displayOptions: {
			show: {
				resource: ['notification'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		required: true,
		default: '',
		description: 'The description of the notification',
		displayOptions: {
			show: {
				resource: ['notification'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Importance',
		name: 'importance',
		type: 'options',
		required: true,
		default: 'INFO',
		description: 'The importance level of the notification',
		options: [
			{ name: 'Info', value: 'INFO' },
			{ name: 'Warning', value: 'WARNING' },
			{ name: 'Alert', value: 'ALERT' },
		],
		displayOptions: {
			show: {
				resource: ['notification'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Link',
		name: 'link',
		type: 'string',
		default: '',
		description: 'Optional link to attach to the notification',
		displayOptions: {
			show: {
				resource: ['notification'],
				operation: ['create'],
			},
		},
	},
];
