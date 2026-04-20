export const arrayQueries = {
	getStatus: `query {
		array {
			id
			state
			capacity {
				kilobytes {
					free
					used
					total
				}
				disks {
					free
					used
					total
				}
			}
			parityCheckStatus {
				status
				progress
				errors
				speed
				correcting
				paused
				running
			}
		}
	}`,

	getDisks: `query {
		array {
			parities {
				id
				idx
				name
				device
				size
				status
				temp
				numReads
				numWrites
				numErrors
				fsSize
				fsFree
				fsUsed
				color
				isSpinning
				type
			}
			disks {
				id
				idx
				name
				device
				size
				status
				temp
				numReads
				numWrites
				numErrors
				fsSize
				fsFree
				fsUsed
				color
				isSpinning
				type
			}
			caches {
				id
				idx
				name
				device
				size
				status
				temp
				numReads
				numWrites
				numErrors
				fsSize
				fsFree
				fsUsed
				color
				isSpinning
				type
			}
		}
	}`,

	getShares: `query {
		shares {
			id
			name
			free
			used
			size
			include
			exclude
			cache
			comment
			color
			luksStatus
		}
	}`,

	getParityHistory: `query {
		parityHistory {
			date
			duration
			speed
			status
			errors
			correcting
		}
	}`,
};

export const arrayMutations = {
	start: `mutation {
		array {
			setState(input: { desiredState: START }) {
				id
				state
			}
		}
	}`,

	stop: `mutation {
		array {
			setState(input: { desiredState: STOP }) {
				id
				state
			}
		}
	}`,
};
