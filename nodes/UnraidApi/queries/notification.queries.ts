export const notificationQueries = {
	getMany: `query GetNotifications($filter: NotificationFilter!) {
		notifications {
			list(filter: $filter) {
				id
				title
				subject
				description
				importance
				link
				type
				timestamp
				formattedTimestamp
			}
		}
	}`,

	getOverview: `query {
		notifications {
			overview {
				unread {
					info
					warning
					alert
					total
				}
				archive {
					info
					warning
					alert
					total
				}
			}
		}
	}`,

	getWarningsAndAlerts: `query GetWarningsAndAlerts($filter: NotificationFilter!) {
		notifications {
			list(filter: $filter) {
				id
				title
				subject
				description
				importance
				link
				type
				timestamp
				formattedTimestamp
			}
		}
	}`,
};

export const notificationMutations = {
	create: `mutation CreateNotification($input: NotificationData!) {
		createNotification(input: $input) {
			id
			title
			subject
			description
			importance
			type
			timestamp
		}
	}`,

	archive: `mutation ArchiveNotification($id: PrefixedID!) {
		archiveNotification(id: $id) {
			id
			title
			type
		}
	}`,

	archiveAll: `mutation ArchiveAll {
		archiveAll {
			unread {
				info
				warning
				alert
				total
			}
			archive {
				info
				warning
				alert
				total
			}
		}
	}`,

	delete: `mutation DeleteNotification($id: PrefixedID!, $type: NotificationType!) {
		deleteNotification(id: $id, type: $type) {
			unread {
				info
				warning
				alert
				total
			}
			archive {
				info
				warning
				alert
				total
			}
		}
	}`,
};
