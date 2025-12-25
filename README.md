# xdispay

Canonical analytics layer for Xandeum's decentralized storage network.

## Features

- **Real-time Dashboard**: Overview of network health, capacity, and uptime.
- **pNodes Explorer**: Detailed list of all active pNodes with filtering and sorting.
- **Leaderboard**: Top performing nodes by credits, uptime, and storage.
- **Earnings Simulator**: Estimate ROI for running a pNode.
- **Dark Mode UI**: Professional Web3 aesthetic with glassmorphism.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser.

## Configuration

### Live Data vs Simulation

By default, the application runs in **Simulation Mode** using mock data. This is because a connection to a live Xandeum pNode is required to fetch real-time gossip data.

To enable **Live Data**:

1.  Obtain the IP address of a running Xandeum pNode (Seed Node).
2.  Create a `.env.local` file in the root directory.
3.  Add the IP address:
    ```env
    SEED_NODE_IP=123.45.67.89
    ```
4.  Restart the server.

The application will now attempt to poll the configured node via pRPC (port 6000) to discover other nodes in the network.

## Architecture

- **Frontend**: Next.js 14 (App Router), React, Lucide Icons.
- **Styling**: Vanilla CSS with CSS Variables for theming.
- **Data Layer**: Next.js API Routes act as a proxy to the pNode RPC, handling CORS and data transformation.
- **Polling**: The frontend uses a custom hook `useNodes` to poll the API every 30 seconds.

## Project Structure

- `src/app`: Next.js App Router pages and API routes.
- `src/components`: Reusable UI components (Navbar, StatsCard, NodeTable).
- `src/lib`: Utilities, types, and mock data.
- `src/styles`: Global CSS.
