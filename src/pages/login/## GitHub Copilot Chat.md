## GitHub Copilot Chat

- Extension: 0.37.4 (prod)
- VS Code: 1.109.2 (591199df409fbf59b4b52d5ad4ee0470152a9b31)
- OS: win32 10.0.26200 x64
- GitHub Account: javadkrm

## Network

User Settings:
```json
  "http.systemCertificatesNode": false,
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: 140.82.114.6 (250 ms)
- DNS ipv6 Lookup: Error (557 ms): getaddrinfo ENOTFOUND api.github.com
- Proxy URL: None (2 ms)
- Electron fetch (configured): HTTP 200 (3048 ms)
- Node.js https: HTTP 200 (1892 ms)
- Node.js fetch: HTTP 200 (959 ms)

Connecting to https://api.githubcopilot.com/_ping:
- DNS ipv4 Lookup: 140.82.113.22 (909 ms)
- DNS ipv6 Lookup: timed out after 10 seconds
- Proxy URL: None (4 ms)
- Electron fetch (configured): 