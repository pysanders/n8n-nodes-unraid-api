import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { unraidApiRequest } from './GenericFunctions';

import { dockerOperations, dockerFields } from './descriptions/DockerDescription';
import { arrayOperations, arrayFields } from './descriptions/ArrayDescription';
import { notificationOperations, notificationFields } from './descriptions/NotificationDescription';
import { systemOperations, systemFields } from './descriptions/SystemDescription';
import { vmOperations, vmFields } from './descriptions/VmDescription';
import { diskOperations, diskFields } from './descriptions/DiskDescription';

import { dockerQueries, dockerMutations } from './queries/docker.queries';
import { arrayQueries, arrayMutations } from './queries/array.queries';
import { notificationQueries, notificationMutations } from './queries/notification.queries';
import { systemQueries } from './queries/system.queries';
import { vmQueries, vmMutations } from './queries/vm.queries';
import { diskQueries } from './queries/disk.queries';

export class UnraidApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Unraid API',
		name: 'unraidApi',
		icon: 'file:unraid.svg',
		group: ['transform'],
		usableAsTool: true,
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Unraid API',
		defaults: {
			name: 'Unraid API',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'unraidApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Array', value: 'array' },
					{ name: 'Disk', value: 'disk' },
					{ name: 'Docker', value: 'docker' },
					{ name: 'Notification', value: 'notification' },
					{ name: 'System', value: 'system' },
					{ name: 'VM', value: 'vm' },
				],
				default: 'docker',
			},
			...arrayOperations,
			...arrayFields,
			...diskOperations,
			...diskFields,
			...dockerOperations,
			...dockerFields,
			...notificationOperations,
			...notificationFields,
			...systemOperations,
			...systemFields,
			...vmOperations,
			...vmFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				let responseData: IDataObject;

				if (resource === 'docker') {
					if (operation === 'getMany') {
						responseData = await unraidApiRequest.call(this, dockerQueries.getMany) as IDataObject;
						const containers = ((responseData.docker as IDataObject)?.containers as IDataObject[]) ?? [];
						for (const container of containers) {
							returnData.push({ json: container });
						}
						continue;
					}

					if (operation === 'get') {
						const containerId = this.getNodeParameter('containerId', i) as string;
						responseData = await unraidApiRequest.call(this, dockerQueries.get) as IDataObject;
						const containers = ((responseData.docker as IDataObject)?.containers as IDataObject[]) ?? [];
						const container = containers.find((c) => c.id === containerId);
						returnData.push({ json: container ?? {} });
						continue;
					}

					if (operation === 'getStats') {
						responseData = await unraidApiRequest.call(this, dockerQueries.getStats) as IDataObject;
						const containers = ((responseData.docker as IDataObject)?.containers as IDataObject[]) ?? [];
						for (const container of containers) {
							returnData.push({ json: container });
						}
						continue;
					}

					if (operation === 'restart') {
						const containerId = this.getNodeParameter('containerId', i) as string;
						await unraidApiRequest.call(this, dockerMutations.restart.stop, { id: containerId });
						responseData = await unraidApiRequest.call(this, dockerMutations.restart.start, { id: containerId }) as IDataObject;
						const result = (responseData.docker as IDataObject)?.start as IDataObject;
						returnData.push({ json: result ?? {} });
						continue;
					}

					// start, stop, pause, unpause
					const containerId = this.getNodeParameter('containerId', i) as string;
					const mutation = dockerMutations[operation as keyof typeof dockerMutations] as string;
					responseData = await unraidApiRequest.call(this, mutation, { id: containerId }) as IDataObject;
					const result = (responseData.docker as IDataObject)?.[operation] as IDataObject;
					returnData.push({ json: result ?? {} });
					continue;
				}

				if (resource === 'array') {
					if (operation === 'getStatus') {
						responseData = await unraidApiRequest.call(this, arrayQueries.getStatus) as IDataObject;
						returnData.push({ json: (responseData.array as IDataObject) ?? {} });
						continue;
					}

					if (operation === 'getDisks') {
						responseData = await unraidApiRequest.call(this, arrayQueries.getDisks) as IDataObject;
						const arrayData = (responseData.array as IDataObject) ?? {};
						const allDisks = [
							...((arrayData.parities as IDataObject[]) ?? []),
							...((arrayData.disks as IDataObject[]) ?? []),
							...((arrayData.caches as IDataObject[]) ?? []),
						];
						for (const disk of allDisks) {
							returnData.push({ json: disk });
						}
						continue;
					}

					if (operation === 'getShares') {
						responseData = await unraidApiRequest.call(this, arrayQueries.getShares) as IDataObject;
						const shares = (responseData.shares as IDataObject[]) ?? [];
						for (const share of shares) {
							returnData.push({ json: share });
						}
						continue;
					}

					if (operation === 'getParityHistory') {
						responseData = await unraidApiRequest.call(this, arrayQueries.getParityHistory) as IDataObject;
						const history = (responseData.parityHistory as IDataObject[]) ?? [];
						for (const entry of history) {
							returnData.push({ json: entry });
						}
						continue;
					}

					// start, stop
					const mutation = arrayMutations[operation as keyof typeof arrayMutations];
					responseData = await unraidApiRequest.call(this, mutation) as IDataObject;
					const result = (responseData.array as IDataObject)?.setState as IDataObject;
					returnData.push({ json: result ?? {} });
					continue;
				}

				if (resource === 'notification') {
					if (operation === 'getMany') {
						responseData = await unraidApiRequest.call(this, notificationQueries.getMany, {
							filter: { type: 'UNREAD', offset: 0, limit: 100 },
						}) as IDataObject;
						const notifications = ((responseData.notifications as IDataObject)?.list as IDataObject[]) ?? [];
						for (const notification of notifications) {
							returnData.push({ json: notification });
						}
						continue;
					}

					if (operation === 'getOverview') {
						responseData = await unraidApiRequest.call(this, notificationQueries.getOverview) as IDataObject;
						const overview = (responseData.notifications as IDataObject)?.overview as IDataObject;
						returnData.push({ json: overview ?? {} });
						continue;
					}

					if (operation === 'getWarningsAndAlerts') {
						responseData = await unraidApiRequest.call(this, notificationQueries.getWarningsAndAlerts, {
							filter: { type: 'UNREAD', offset: 0, limit: 100, importance: 'WARNING' },
						}) as IDataObject;
						const notifications = ((responseData.notifications as IDataObject)?.list as IDataObject[]) ?? [];
						for (const notification of notifications) {
							returnData.push({ json: notification });
						}
						continue;
					}

					if (operation === 'create') {
						const input = {
							title: this.getNodeParameter('title', i) as string,
							subject: this.getNodeParameter('subject', i) as string,
							description: this.getNodeParameter('description', i) as string,
							importance: this.getNodeParameter('importance', i) as string,
							link: this.getNodeParameter('link', i) as string || undefined,
						};
						responseData = await unraidApiRequest.call(this, notificationMutations.create, { input }) as IDataObject;
						returnData.push({ json: (responseData.createNotification as IDataObject) ?? {} });
						continue;
					}

					if (operation === 'archive') {
						const notificationId = this.getNodeParameter('notificationId', i) as string;
						responseData = await unraidApiRequest.call(this, notificationMutations.archive, { id: notificationId }) as IDataObject;
						returnData.push({ json: (responseData.archiveNotification as IDataObject) ?? {} });
						continue;
					}

					if (operation === 'archiveAll') {
						responseData = await unraidApiRequest.call(this, notificationMutations.archiveAll) as IDataObject;
						returnData.push({ json: (responseData.archiveAll as IDataObject) ?? {} });
						continue;
					}

					if (operation === 'delete') {
						const notificationId = this.getNodeParameter('notificationId', i) as string;
						const notificationType = this.getNodeParameter('notificationType', i) as string;
						responseData = await unraidApiRequest.call(this, notificationMutations.delete, {
							id: notificationId,
							type: notificationType,
						}) as IDataObject;
						returnData.push({ json: (responseData.deleteNotification as IDataObject) ?? {} });
						continue;
					}
				}

				if (resource === 'vm') {
					if (operation === 'getMany') {
						responseData = await unraidApiRequest.call(this, vmQueries.getMany) as IDataObject;
						const domains = ((responseData.vms as IDataObject)?.domain as IDataObject[]) ?? [];
						for (const domain of domains) {
							returnData.push({ json: domain });
						}
						continue;
					}

					if (operation === 'restart') {
						const vmId = this.getNodeParameter('vmId', i) as string;
						await unraidApiRequest.call(this, vmMutations.restart.stop, { id: vmId });
						const startResult = await unraidApiRequest.call(this, vmMutations.restart.start, { id: vmId }) as IDataObject;
						const success = (startResult.vm as IDataObject)?.start as boolean;
						returnData.push({ json: { id: vmId, operation: 'restart', success: success ?? false } });
						continue;
					}

					// start, stop, pause, resume, forceStop, reboot
					const vmId = this.getNodeParameter('vmId', i) as string;
					const mutation = vmMutations[operation as keyof typeof vmMutations] as string;
					responseData = await unraidApiRequest.call(this, mutation, { id: vmId }) as IDataObject;
					const success = (responseData.vm as IDataObject)?.[operation] as boolean;
					returnData.push({ json: { id: vmId, operation, success: success ?? false } });
					continue;
				}

				if (resource === 'disk') {
					if (operation === 'getMany') {
						responseData = await unraidApiRequest.call(this, diskQueries.getMany) as IDataObject;
						const disks = (responseData.disks as IDataObject[]) ?? [];
						for (const disk of disks) {
							returnData.push({ json: disk });
						}
						continue;
					}
				}

				if (resource === 'system') {
					const query = systemQueries[operation as keyof typeof systemQueries];
					responseData = await unraidApiRequest.call(this, query) as IDataObject;

					if (operation === 'getOnlineStatus') {
						returnData.push({ json: { online: responseData.online ?? false } });
						continue;
					}

					if (operation === 'getRegistration') {
						returnData.push({ json: (responseData.registration as IDataObject) ?? {} });
						continue;
					}

					if (operation === 'getServerStatus') {
						const servers = (responseData.servers as IDataObject[]) ?? [];
						for (const server of servers) {
							returnData.push({ json: server });
						}
						continue;
					}

					const key = operation === 'getInfo' ? 'info'
						: operation === 'getConfig' ? 'config'
						: operation === 'getMetrics' ? 'metrics'
						: operation === 'getFlashInfo' ? 'flash'
						: 'upsDevices';

					if (key === 'upsDevices') {
						const devices = (responseData[key] as IDataObject[]) ?? [];
						for (const device of devices) {
							returnData.push({ json: device });
						}
					} else {
						returnData.push({ json: (responseData[key] as IDataObject) ?? {} });
					}
					continue;
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
