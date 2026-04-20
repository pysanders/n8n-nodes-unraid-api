# n8n-nodes-unraid-api

An n8n community node for interacting with the Unraid API via GraphQL. Manage Docker containers, VMs, monitor array and disk status, handle notifications, and query system information directly from your n8n workflows.

Development assisted by [Claude Code](https://claude.ai/code).

## Installation

In your n8n instance:

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-unraid-api`
4. Agree to the risks and click **Install**

## Credentials

Create a new **Unraid API** credential with:

| Field | Description | Example |
|-------|-------------|---------|
| Server URL | Your Unraid server URL including port | `http://x.x.x.x:port` |
| API Key | API key for authentication (sent as `x-api-key` header) | |

## Resources and Operations

### Array

| Operation | Description |
|-----------|-------------|
| Get Status | Get array state and capacity |
| Get Disks | List all array disks |
| Get Shares | List all shares |
| Get Parity History | Get parity check history |
| Start | Start the array |
| Stop | Stop the array |

### Disk

| Operation | Description |
|-----------|-------------|
| Get Many | List all physical disks |

### Docker

| Operation | Description |
|-----------|-------------|
| Get Many | List all containers |
| Get | Get a single container |
| Start | Start a container |
| Stop | Stop a container |
| Pause | Pause a container |
| Unpause | Unpause a container |
| Restart | Restart a container |

### Notification

| Operation | Description |
|-----------|-------------|
| Get Many | List all notifications |
| Get Overview | Get notification counts (unread/archived) |
| Get Warnings & Alerts | Get warnings and alerts |
| Create | Create a notification |
| Archive | Archive a notification |
| Archive All | Archive all notifications |
| Delete | Delete a notification |

### System

| Operation | Description |
|-----------|-------------|
| Get Info | System info (OS, CPU, RAM) |
| Get Config | System configuration |
| Get Metrics | CPU and memory metrics (with per-core breakdown) |
| Get Online Status | Check if the server is online |
| Get Registration | Get license registration info |
| Get Server Status | Server status and URLs |
| Get Flash Info | Flash drive info |
| Get UPS Status | UPS device status |

### VM

| Operation | Description |
|-----------|-------------|
| Get Many | List all VMs |
| Start | Start a VM |
| Stop | Stop a VM |
| Pause | Pause a VM |
| Resume | Resume a paused VM |
| Restart | Restart a VM |
| Reboot | Reboot a VM |
| Force Stop | Force stop a VM |

## Compatibility

- n8n version 1.0 or later
- Node.js 22 or later

## License

[MIT](LICENSE)
