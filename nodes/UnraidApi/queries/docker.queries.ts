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
				ports {
					ip
					privatePort
					publicPort
					type
				}
			}
		}
	}`,

	get: `query {
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

	getStats: `query {
		docker {
			containers {
				id
				names
				state
				status
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
};
