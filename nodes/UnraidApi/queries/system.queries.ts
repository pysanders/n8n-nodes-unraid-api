export const systemQueries = {
	getInfo: `query {
		info {
			id
			time
			os {
				platform
				distro
				release
				kernel
				arch
				hostname
			}
			cpu {
				manufacturer
				brand
				cores
				threads
				speed
			}
			memory {
				layout {
					size
					bank
					type
					clockSpeed
					manufacturer
					formFactor
				}
			}
			system {
				manufacturer
				model
				version
				serial
			}
			versions {
				core {
					unraid
					api
					kernel
				}
				packages {
					openssl
					node
				}
			}
		}
	}`,

	getConfig: `query {
		config {
			id
			valid
			error
		}
	}`,

	getMetrics: `query {
		metrics {
			id
			cpu {
				percentTotal
				cpus {
					percentTotal
					percentUser
					percentSystem
					percentIdle
				}
			}
			memory {
				total
				used
				free
				available
				active
				buffcache
				percentTotal
			}
		}
	}`,

	getServerStatus: `query {
		servers {
			id
			name
			guid
			status
			wanip
			lanip
			localurl
			remoteurl
		}
	}`,

	getFlashInfo: `query {
		flash {
			id
			vendor
			product
		}
	}`,

	getUpsStatus: `query {
		upsDevices {
			id
			name
			status
			model
			battery {
				chargeLevel
				estimatedRuntime
				health
			}
			power {
				inputVoltage
				outputVoltage
				loadPercentage
			}
		}
	}`,

	getRegistration: `query {
		registration {
			id
			state
			type
			expiration
		}
	}`,

	getOnlineStatus: `query {
		online
	}`,
};
