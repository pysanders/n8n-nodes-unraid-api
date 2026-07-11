export const dockerQueries = {
	getMany: `query {
		docker {
			containers {
				id
				names
				image
				imageId
				command
				created
				state
				status
				autoStart
				isUpdateAvailable
				ports {
					ip
					privatePort
					publicPort
					type
				}
			}
		}
	}`,

	getNetworks: `query {
		docker {
			networks {
				id
				name
				created
				scope
				driver
				enableIPv6
				internal
				attachable
				containers
			}
		}
	}`,

	getOne: `query GetContainer($id: PrefixedID!) {
		docker {
			container(id: $id) {
				id
				names
				image
				imageId
				command
				created
				state
				status
				autoStart
				isUpdateAvailable
				ports {
					ip
					privatePort
					publicPort
					type
				}
				mounts
				networkSettings
			}
		}
	}`,

	getUpdateStatuses: `query {
		docker {
			containerUpdateStatuses {
				name
				updateStatus
			}
		}
	}`,

	getLogs: `query GetContainerLogs($id: PrefixedID!, $tail: Int, $since: DateTime) {
		docker {
			logs(id: $id, tail: $tail, since: $since) {
				containerId
				lines {
					timestamp
					message
				}
				cursor
			}
		}
	}`,
};

export const dockerMutations = {
	start: `mutation StartContainer($id: PrefixedID!) {
		docker {
			start(id: $id) {
				id
				names
				state
				status
			}
		}
	}`,

	stop: `mutation StopContainer($id: PrefixedID!) {
		docker {
			stop(id: $id) {
				id
				names
				state
				status
			}
		}
	}`,

	pause: `mutation PauseContainer($id: PrefixedID!) {
		docker {
			pause(id: $id) {
				id
				names
				state
				status
			}
		}
	}`,

	unpause: `mutation UnpauseContainer($id: PrefixedID!) {
		docker {
			unpause(id: $id) {
				id
				names
				state
				status
			}
		}
	}`,

	restart: {
		stop: `mutation StopContainer($id: PrefixedID!) {
			docker {
				stop(id: $id) {
					id
					names
					state
					status
				}
			}
		}`,
		start: `mutation StartContainer($id: PrefixedID!) {
			docker {
				start(id: $id) {
					id
					names
					state
					status
				}
			}
		}`,
	},

	updateContainer: `mutation UpdateContainer($id: PrefixedID!) {
		docker {
			updateContainer(id: $id) {
				id
				names
				image
				state
				status
			}
		}
	}`,

	updateAllContainers: `mutation UpdateAllContainers {
		docker {
			updateAllContainers {
				id
				names
				image
				state
				status
			}
		}
	}`,

	removeContainer: `mutation RemoveContainer($id: PrefixedID!, $withImage: Boolean) {
		docker {
			removeContainer(id: $id, withImage: $withImage)
		}
	}`,
};
